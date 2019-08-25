import http.client
import json
import models
import ssl

context = ssl.SSLContext()
context.verify_mode = ssl.CERT_REQUIRED
context.check_hostname = False
context.load_verify_locations('ex8cert.pem')

conn = http.client.HTTPSConnection(host="localhost", port=19730, context=context)
users = [
    models.User("Bob", "Bobman", "Bobber"),
    models.User("John", "Johnman", "Johnner"),
    models.User("Bill", "Billman", "Biller")
    ]
for u in users:
    conn.request("POST", "/User/", body=json.dumps(u.encode()))
    res = conn.getresponse()
    print(res.status)

conn.request("GET", "/User/")
res = conn.getresponse()
for u in json.loads(res.read(), object_hook=models.User.decode):
    print(u.encode())
