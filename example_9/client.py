import http.client
import json
import ssl

context = ssl.SSLContext()
context.verify_mode = ssl.CERT_REQUIRED
context.check_hostname = False
context.load_verify_locations('ex9cert.pem')

data = {
    'id':'2342',
    'password':'Sup3r_pw'
}
conn = http.client.HTTPSConnection(host="localhost", port=19730, context=context)
conn.request("POST", "/new/", body=json.dumps(data))
res = conn.getresponse()
print(res.status)

conn.request("POST", "/authenticate/", body=json.dumps(data))
res = conn.getresponse()
print(res.status)

bad_data = {
    'id':'2342',
    'password':'Sup4r_pw'
}

conn.request("POST", "/authenticate/", body=json.dumps(bad_data))
res = conn.getresponse()
print(res.status)
