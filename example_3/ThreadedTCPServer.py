from socketserver import ThreadingTCPServer, StreamRequestHandler
import argparse
import threading

# Now that we have the concept of a server we can also utilize the concept of
# handlers. Handlers can encapsulate processing logic seperate from the server
# logic
class CustomThreadedTCPHandler(StreamRequestHandler):

    def handle(self):
        print(
            "{}: Serving request for {}".format(
                                            #Prints Current Thread
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

#Handles requests on seperate threads in an asynchronous fashion
with ThreadingTCPServer(server_address, CustomThreadedTCPHandler) as server:
    if args.forever:
        server.serve_forever()
    else:
        server.handle_request()
