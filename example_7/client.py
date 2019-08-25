import http.client
import ssl

context = ssl.SSLContext()
context.verify_mode = ssl.CERT_REQUIRED
context.check_hostname = False
context.load_verify_locations('ex7cert.pem')

conn = http.client.HTTPSConnection(host="localhost", port=19730, context=context)
headers = {"Cookie" : "One=1; Two=2;"}
conn.request("GET", "/", headers=headers)
res = conn.getresponse()
print(res.status)
