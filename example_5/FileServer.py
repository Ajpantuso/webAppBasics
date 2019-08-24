from http.server import SimpleHTTPRequestHandler
from socketserver import ThreadingTCPServer
import ssl

server_address = ('127.0.0.1', 19730)

ctx = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
ctx.load_cert_chain(certfile='ex5cert.pem',keyfile='ex5key.key')

with ThreadingTCPServer(server_address, SimpleHTTPRequestHandler) as server:
    with ctx.wrap_socket(server.socket, server_side=True) as sock:
        server.socket = sock
        server.serve_forever()
