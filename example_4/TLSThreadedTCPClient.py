import argparse
import socket
import ssl

parser = argparse.ArgumentParser(description='Socker Client Example')
parser.add_argument('-f', '--forever', action="store_true", help='Loop forever')
args = parser.parse_args()

server_address = ('127.0.0.1', 19730)

#Create a TLS context with recommended secuirty settings
context = ssl.SSLContext()
context.verify_mode = ssl.CERT_REQUIRED
context.check_hostname = True
#Specify the certificate location since it is self-signed and cannot be verified
context.load_verify_locations('ex4cert.pem')
#Hostname contained within the certificate to verify
hostname = 'FANNIEMAE'
# hostname = 'NOTFANNIEMAE'

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
    with context.wrap_socket(sock, server_hostname=hostname) as s:
        s.connect(server_address)
        print("Connected to {}:{}".format(server_address[0], server_address[1]))
        while True:
            message = input('>>> ')
            if not message:
                break
            if not message.endswith('\n'):
                message += '\n'
            s.sendall(message.encode('UTF-8'))
            BUF_SIZE = 1024
            buf = s.recv(BUF_SIZE)
            print('<<< ', buf.decode('UTF-8'))
            if not args.forever:
                break
        print("Closing connection")
