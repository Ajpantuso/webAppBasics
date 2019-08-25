from functools import partial
from http.server import BaseHTTPRequestHandler
import re

class Router(object):

    def __init__(self):
        self.routes = {
            'GET' : {},
            'PUT' : {},
            'POST' : {},
            'DELETE' : {}
        }
        self.middleware = []

    def __call__(self, request, client_address, server):
        return HandlerWithRoutes(self, request, client_address, server)

    def addRoute(self, method, path, handler):
        for p in self.routes[method]:
            if path == p:
                self.updateRoute(method, path, handler)
                return
        self.routes[method][path] = (re.compile(path), handler)

    def addMiddleware(self, mw):
        self.middleware.append(mw)

    def getRoutes(self):
        return self.routes

    def getMiddleware(self):
        return self.middleware

    def updateRoute(self, method, path, handler):
        try:
            self.routes[method][path] = (re.compile(path), handler)
        except KeyError:
            return

class HandlerWithRoutes(BaseHTTPRequestHandler):

    def __init__(self, router, request, client_address, server):
        self.routes = router.getRoutes()
        self.middleware = router.getMiddleware()
        super().__init__(request, client_address, server)

    def do_GET(self):
        for p, (m, h) in self.routes['GET'].items():
            if m.match(self.path):
                return self.applyMiddleware(h)
        return staticfile.notFoundHandler(self)

    def do_PUT(self):
        for p, (m, h) in self.routes['PUT'].items():
            if m.match(self.path):
                return self.applyMiddleware(h)
        return staticfile.notFoundHandler(self)

    def do_POST(self):
        for p, (m, h) in self.routes['POST']:
            if m.match(self.path):
                return self.applyMiddleware(h)
        return staticfile.notFoundHandler(self)

    def do_DELETE(self):
        for p, (m, h) in self.routes['DELETE']:
            if m.match(self.path):
                return self.applyMiddleware(h)
        return staticfile.notFoundHandler(self)

    def applyMiddleware(self, h):
        chain = h
        for mw in self.middleware:
            chain = partial(mw, next=chain)
        return chain(self)
