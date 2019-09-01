import cookies
from http import HTTPStatus
from http.server import ThreadingHTTPServer
import logger
from router import Router
import ssl

# Custom handler to test that middleware works as expected
def myHandler(caller):
    print(caller.cookies)
    print(caller.request)
    caller.send_response(HTTPStatus.OK)
    caller.send_header("Content-Type", "text/html")
    caller.end_headers()
    caller.wfile.write(bytes("<html>This is all you get</html>", 'UTF-8'))

server_address = ('127.0.0.1', 19730)

ctx = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
ctx.load_cert_chain(certfile='ex7cert.pem',keyfile='ex7key.key')

#Custom class used for request routing and applying middleware
r = Router()
r.addMiddleware(logger.logHandler)
r.addMiddleware(cookies.cookieHandler)
r.addRoute('GET', '/*', myHandler)

with ThreadingHTTPServer(server_address, r) as httpd:
    with ctx.wrap_socket(httpd.socket, server_side=True) as sock:
        httpd.socket = sock
        httpd.serve_forever()
