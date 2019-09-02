from socketserver import TCPServer, StreamRequestHandler
import argparse

#Request Handler which abstracts the server from it's processing
class CustomTCPHandler(StreamRequestHandler):

    def handle(self):
        print("Serving request for {}".format(self.client_address[0]))
        #Reads data from a Buffered IO object instead of raw bytes
        buf = self.rfile.readline().strip()
        while buf:
            #Same Functions as example 1, but using a buffered IO stream
            msg = buf.decode('UTF-8').swapcase()
            self.wfile.write(msg.encode('UTF-8'))
            buf = self.rfile.readline().strip()
        print("Finished serving request for {}".format(self.client_address[0]))

parser = argparse.ArgumentParser(description='TCP Server Example')
parser.add_argument('-f', '--forever', action="store_true", help='Loop forever')
args = parser.parse_args()

server_address = ('127.0.0.1', 19730)

#Abstracted server class hides low-level details of server operations
with TCPServer(server_address, CustomTCPHandler) as server:
    if args.forever:
        server.serve_forever()
    else:
        server.handle_request()
