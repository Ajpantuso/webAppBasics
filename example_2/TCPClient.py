import socket
import argparse

parser = argparse.ArgumentParser(description='Socker Client Example')
parser.add_argument('-f', '--forever', action="store_true", help='Loop forever')
args = parser.parse_args()

server_address = ('127.0.0.1', 19730)

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect(server_address)
    print("Connected to {}:{}".format(server_address[0], server_address[1]))
    while True:
        message = input('>>> ')
        if not message:
            break
        # New lines usually require special handling as they are used to
        # signal the end of a message or when to flush the buffer
        if not message.endswith('\n'):
            message += '\n'
        s.sendall(message.encode('UTF-8'))
        BUF_SIZE = 1024
        buf = s.recv(BUF_SIZE)
        print('<<< ', buf.decode('UTF-8'))
        if not args.forever:
            break
    print("Closing connection")
