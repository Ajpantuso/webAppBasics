import socket
import argparse

parser = argparse.ArgumentParser(description='Socker Server Example')
parser.add_argument('-f', '--forever', action="store_true", help='Loop forever')
args = parser.parse_args()

#Server address referenced in IPV4 Host:Port notation
server_address = ('127.0.0.1', 19730)

#Opens a socket
#AF_INET indicates the socket address is from the IPV4 address family
#SOCK_STREAM indicates a streaming socket which is useful for organized data
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind(server_address)
    s.listen(1)
    while True:
        conn, addr = s.accept()
        with conn:
            print('Received connection from: ', addr)
            BUF_SIZE = 1024
            buf = conn.recv(BUF_SIZE)
            while buf:
                msg = buf.decode('UTF-8').swapcase()
                conn.sendall(msg.encode('UTF-8'))
                buf = conn.recv(BUF_SIZE)
            print('Connection Closed')
        if not args.forever:
            break
