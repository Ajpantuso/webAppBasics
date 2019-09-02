from http import HTTPStatus
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
import json
import models
import re
import shelve
import ssl

class PersistenceServer(object):

    def __init__(self, cache):
        self.cache = cache
        self.services = {}

    def __call__(self, request, client_address, server):
        return PersistenceHandler(self, request, client_address, server)

    def addService(self, cls):
        serviceName = cls.__name__
        servicePath = r'/' + serviceName + r'/.*'
        self.services[serviceName] = (cls, re.compile(servicePath))
        if serviceName not in self.cache:
            self.cache[serviceName] = {}

    def getCache(self):
        return self.cache

    def getServices(self):
        return self.services

class PersistenceHandler(BaseHTTPRequestHandler):

    def __init__(self, persistenceServer, request, client_address, server):
        self.cache = persistenceServer.getCache()
        self.services = persistenceServer.getServices()
        super().__init__(request, client_address, server)

    def do_GET(self):
        data = None
        for s, (c, p) in self.services.items():
            if p.match(self.path):
                if self.path.endswith('/'):
                    data = self.getAll(s)
                else:
                    id = self.path.split('/')[-1]
                    data = self.getByID(s, int(id))
        if data:
            self.send_response(HTTPStatus.OK)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            #Replace here with encoder
            self.wfile.write(bytes(json.dumps(data), 'UTF-8'))
        else:
            self.send_response(HTTPStatus.NOT_FOUND, 'Page Not Found')

    def getByID(self, service, id):
        result = None
        for objID in self.cache[service]:
            if objID == id:
                result = self.cache[service][objID]
                break
        if result:
            return result.encode()
        return result

    def getAll(self, service):
        objs = []
        for _, obj in self.cache[service].items():
            objs.append(obj.encode())
        return objs

    def do_POST(self):
        status = HTTPStatus.NOT_FOUND
        for s, (c, p) in self.services.items():
            if p.match(self.path):
                status = self.postNew(c, s)
        self.send_response(status)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def postNew(self, cls, service):
        content_length = int(self.headers['Content-Length'])
        data = self.rfile.read(content_length)
        try:
            obj = json.loads(data, object_hook=cls.decode)
        except json.decoder.JSONDecodeError as e:
            return HTTPStatus.BAD_REQUEST
        if self.getByID(service, obj.id):
            return HTTPStatus.BAD_REQUEST
        else:
            objs = self.cache[service]
            objs[str(obj.id)] = obj
            self.cache[service] = objs
            return HTTPStatus.OK

with shelve.open('cache') as cache:
    ps = PersistenceServer(cache)
    ps.addService(models.User)
    ps.addService(models.Company)
    server_address = ('127.0.0.1', 19730)
    ctx = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
    ctx.load_cert_chain(certfile='ex8cert.pem',keyfile='ex8key.key')
    with ThreadingHTTPServer(server_address, ps) as httpd:
        with ctx.wrap_socket(httpd.socket, server_side=True) as sock:
            httpd.socket = sock
            httpd.serve_forever()
