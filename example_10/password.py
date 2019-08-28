from os import urandom
from getpass import getpass
from hashlib import blake2b
from http import HTTPStatus
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
import json
import re
import shelve
import ssl

class PasswordServer(object):

    def __init__(self, pwdb, keyfile):
        self.pwdb = pwdb
        self.keyfile = keyfile

    def __call__(self, request, client_address, server):
        return PasswordHandler(self, request, client_address, server)

class PasswordHandler(BaseHTTPRequestHandler):

    def __init__(self, passwordServer, request, client_address, server):
        self.pwdb = passwordServer.pwdb
        self.key = self.retrieveKey(passwordServer.keyfile)
        super().__init__(request, client_address, server)

    def do_POST(self):
        status = HTTPStatus.INTERNAL_SERVER_ERROR
        content_length = int(self.headers['Content-Length'])
        raw_json = self.rfile.read(content_length)
        try:
            data = json.loads(raw_json)
        except json.decoder.JSONDecodeError as e:
            return HTTPStatus.BAD_REQUEST
        if re.search(r'/new/', self.path):
            status = self.new(data)
        elif re.search(r'/authenticate/', self.path):
            status = self.authenticate(data)
        self.send_response(status)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def authenticate(self, data):
        h, s = self.retrieveHashSalt(data['id'])
        if self.testPassword(data['password'], h, s):
            return HTTPStatus.OK
        else:
            return HTTPStatus.UNAUTHORIZED

    def new(self, data):
        if not self.validatePassword(data['password']):
            return HTTPStatus.BAD_REQUEST
        if self.addUser(obj['id'], data['password']):
            return HTTPStatus.OK
        else:
            return HTTPStatus.BAD_REQUEST

    def retrieveKey(self, keyfile):
        with open(keyfile, 'rb') as kf:
            return kf.read()

    def retrieveHashSalt(self, id):
        try:
            h, s = self.pwdb[str(id)]
        except (TypeError, KeyError):
            return ()
        else:
            return (h, s)

    def hashPassword(self, pw):
        s = urandom(blake2b.SALT_SIZE)
        h = blake2b(salt=s, key=self.key)
        iterations = 1000000
        try:
            h.update(bytes(pw, 'UTF-8'))
        except TypeError:
            return ()
        else:
            hashedPW = h.digest()
            for i in range(iterations):
                h.update(hashedPW)
                hashedPW = h.digest()
            return (hashedPW, s)

    def testPassword(self, pw, hash, salt):
        s = salt
        h = blake2b(salt=s, key=self.key)
        iterations = 1000000
        try:
            h.update(bytes(pw, 'UTF-8'))
        except TypeError:
            return False
        else:
            hashedPW = h.digest()
            for i in range(iterations):
                h.update(hashedPW)
                hashedPW = h.digest()
            return hash == hashedPW

    def validatePassword(self, pw):
        return (len(pw) >= 8 and
                len(pw) <= 30 and
                [c for c in pw if c.isupper()] and
                [c for c in pw if c.islower()] and
                [c for c in pw if c.isdigit()] and
                [c for c in pw if not c.isalnum()] and
                True
                )

    def addUser(self, id, pw):
        h, s = self.hashPassword(pw)
        try:
            self.pwdb[str(id)] = (h, s)
        except (TypeError, KeyError):
            return False
        else:
            return True

with shelve.open('password') as db:
    ps = PasswordServer(db, 'notSuperSecretKey.key')
    server_address = ('127.0.0.1', 19730)
    ctx = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
    ctx.load_cert_chain(certfile='ex9cert.pem',keyfile='ex9key.key')
    with ThreadingHTTPServer(server_address, ps) as httpd:
        with ctx.wrap_socket(httpd.socket, server_side=True) as sock:
            httpd.socket = sock
            httpd.serve_forever()
