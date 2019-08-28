import cookies
from http.server import ThreadingHTTPServer
import logger
import router
import ssl
import staticfile
import templates

data = {
    'title' : 'WebAppBasics',
    'description' : 'A demonstration of examples 1 - 9'
}

with open('index.html', 'w') as f:
    f.write(templates.render_file('./templates/index.tmp', data))

r = router.Router()
r.addRoute('GET', r'/index.html', staticfile.staticHandler)
r.addRoute('GET', r'/favicon.ico', staticfile.staticHandler)
r.addRoute('GET', r'/static/.*', staticfile.staticHandler)
r.addMiddleware(cookies.cookieHandler)
r.addMiddleware(logger.logHandler)


server_address = ('127.0.0.1', 19730)

ctx = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
ctx.load_cert_chain(certfile='ex10cert.pem',keyfile='ex10key.key')
with ThreadingHTTPServer(server_address, r) as httpd:
    with ctx.wrap_socket(httpd.socket, server_side=True) as sock:
        httpd.socket = sock
        httpd.serve_forever()
