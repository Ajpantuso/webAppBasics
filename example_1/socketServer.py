import socket
import argparse

#Option to run the server continuously
parser = argparse.ArgumentParser(description='Socker Server Example')
parser.add_argument('-f', '--forever', action="store_true", help='Loop forever')
args = parser.parse_args()

#Server address referenced in IPV4 Host:Port notation
server_address = ('127.0.0.1', 19730)

#Opens a socket
#AF_INET indicates the socket address is from the IPV4 address family
#SOCK_STREAM indicates a streaming socket which is useful for organized data
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    #Attaches (binds) the socket to a network address
    s.bind(server_address)
    # Listens for new connections and stops accepting new connections after
    # n unaccepted ones
    s.listen(1)
    while True:
        # Accepts a new connection from addr
        conn, addr = s.accept()
        with conn:
            print('Received connection from: ', addr)
            # Sets a buffer size to read to avoid excessive memory use
            BUF_SIZE = 1024
            buf = conn.recv(BUF_SIZE)
            # Recieve into buffer until no more data
            while buf:
                msg = buf.decode('UTF-8').swapcase()
                #Send back data received with character case swapped
                conn.sendall(msg.encode('UTF-8'))
                buf = conn.recv(BUF_SIZE)
            print('Connection Closed')
        if not args.forever:
            break
