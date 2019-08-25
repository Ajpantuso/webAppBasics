from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import ssl
from templates import render_file

#Open a index file to write templated data
with open('./index.html', 'w') as f:
    #data represented in dictionary form (Simplified model in MVC)
    data = {
        'title' : 'HomePage',
        'description' : 'The place to be',
        'author' : 'Andrew Pantuso'
    }
    #Compiles the template and renders with input data in one step
    f.write(render_file('./templates/index.tmp', data))

server_address = ('127.0.0.1', 19730)

ctx = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
ctx.load_cert_chain(certfile='ex6cert.pem',keyfile='ex6key.key')

with ThreadingHTTPServer(server_address, SimpleHTTPRequestHandler) as httpd:
    with ctx.wrap_socket(httpd.socket, server_side=True) as sock:
        httpd.socket = sock
        httpd.serve_forever()
