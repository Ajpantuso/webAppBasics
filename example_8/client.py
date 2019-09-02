import http.client
import json
import models
import ssl

context = ssl.SSLContext()
context.verify_mode = ssl.CERT_REQUIRED
context.check_hostname = False
context.load_verify_locations('ex8cert.pem')

conn = http.client.HTTPSConnection(host="localhost", port=19730, context=context)
#Create list of users to add to the cache
users = [
    models.User("John", "Smith", "Reader"),
    models.User("Bob", "Baker", "Writer"),
    models.User("Sally", "White", "Editor")
    ]
for u in users:
    #For each user submit a POST request in json format
    conn.request("POST", "/User/", body=json.dumps(u, cls=models.UserEncoder))
    res = conn.getresponse()
    print(res.status)

conn.request("GET", "/User/")
res = conn.getresponse()
for u in json.loads(res.read(), object_hook=models.User.decode):
    print(u.encode())
