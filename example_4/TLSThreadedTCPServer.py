import argparse
from socketserver import ThreadingTCPServer, StreamRequestHandler
import ssl
import threading

class CustomThreadedTCPHandler(StreamRequestHandler):

    def handle(self):
        print(
            "{}: Serving request for {}".format(
                                            threading.current_thread().name,
                                            self.client_address[0]
                                            )
            )
        buf = self.rfile.readline().strip()
        while buf:
            msg = buf.decode('UTF-8').swapcase()
            self.wfile.write(msg.encode('UTF-8'))
            buf = self.rfile.readline().strip()
        print("Finished serving request for {}".format(self.client_address[0]))

parser = argparse.ArgumentParser(description='TCP Server Example')
parser.add_argument('-f', '--forever', action="store_true", help='Loop forever')
args = parser.parse_args()

server_address = ('127.0.0.1', 19730)

#Create a security context intended for authenticating incoming client connections
ctx = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
#req -newkey rsa:2048 \
#   -nodes -keyout ex3key.key
#   -x509 -days 365 -outform pem
#   -out ex3cert.pem
#https://www.digitalocean.com/community/tutorials/openssl-essentials-working-with-ssl-certificates-private-keys-and-csrs
#Load generated cert and key to be used during TLS sessions
ctx.load_cert_chain(certfile='ex4cert.pem',keyfile='ex4key.key')
#View contents of certificate
#openssl x509 -infrom pem -in ex4cert.pem -nout -text

with ThreadingTCPServer(server_address, CustomThreadedTCPHandler) as server:
    #Wrap the server socket with a TLS context
    with ctx.wrap_socket(server.socket, server_side=True) as sock:
        server.socket = sock
        if args.forever:
            server.serve_forever()
        else:
            server.handle_request()
