from http import HTTPStatus
import json
import models
import re
import shelve
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler

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
        self.cache[serviceName] = []

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
        for obj in self.cache[service]:
            if obj.id == id:
                result = obj
                break
        if result:
            return result.encode()
        return result

    def getAll(self, service):
        objs = []
        for obj in self.cache[service]:
            objs.append(obj.encode())
        return objs

    def do_POST(self):
        status = HTTPStatus.NOT_FOUND
        for s, (c, p) in self.services.items():
            if p.match(self.path):
                status = self.postNew(c, s)
        self.send_response(status)

    def postNew(self, cls, service):
        content_length = int(self.headers['Content-Length'])
        data = self.rfile.read(content_length)
        obj = json.loads(data, object_hook=cls.decode)
        if self.getByID(service, obj.id):
            return HTTPStatus.BAD_REQUEST
        else:
            objs = self.cache[service]
            objs.append(obj)
            self.cache[service] = objs
            return HTTPStatus.OK

with shelve.open('cache') as cache:
    ps = PersistenceServer(cache)
    ps.addService(models.User)
    ps.addService(models.Company)
    server_address = ('127.0.0.1', 8080)
    httpd = ThreadingHTTPServer(server_address, ps)
    httpd.serve_forever()
