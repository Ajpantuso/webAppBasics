from http.server import SimpleHTTPRequestHandler
from socketserver import ThreadingTCPServer
import ssl
from templates import render_file

with open('./index.html', 'w') as f:
    data = {
        'title' : 'HomePage',
        'description' : 'The place to be',
        'author' : 'Andrew Pantuso'
    }
    f.write(render_file('./templates/index.tmp', data))

server_address = ('127.0.0.1', 19730)

ctx = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
ctx.load_cert_chain(certfile='ex6cert.pem',keyfile='ex6key.key')

with ThreadingTCPServer(server_address, SimpleHTTPRequestHandler) as server:
    with ctx.wrap_socket(server.socket, server_side=True) as sock:
        server.socket = sock
        server.serve_forever()
