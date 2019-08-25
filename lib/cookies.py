from http.cookies import SimpleCookie
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

def cookieHandler(caller, next):
    c = SimpleCookie()
    try:
        c.load(caller.headers['Cookie'])
    except KeyError:
        pass
    except Exception as e:
        print(e)
    print(c)
    next(caller)
