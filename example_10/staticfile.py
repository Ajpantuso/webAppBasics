from mimetypes import MimeTypes
import os
from urllib.parse import urlsplit
from gzip import GzipFile
from http import HTTPStatus
import shutil

def staticHandler(caller):
    baseDir = os.getcwd()
    compressed_types = ["text/plain"
                       ,"text/html"
                       ,"text/css"
                       ,"text/xml"
                       ,"text/javascript"
                       ,"application/javascript"
                       ,"application/json"
                       ]
    path = urlsplit(caller.path)[2].lstrip('/')
    path = os.path.join(baseDir, path)
    if path.endswith('/'):
        filePath = ''
        for file in ['index.htm', 'index.html']:
            if os.path.exists(os.path.join(path, file)):
                filePath = os.path.join(path, file)
                break
        if not filePath:
            notFoundHandler(caller)
        else:
            caller.send_response(HTTPStatus.FOUND)
            type = MimeTypes().guess_type(filePath)
            caller.send_header("Content-Type", type)
            caller.end_headers()
            with open(filePath, 'rb') as f:
                shutil.copyfileobj(f, caller.wfile)
    else:
        if os.path.exists(path):
            caller.send_response(HTTPStatus.OK)
            type, encoding = MimeTypes().guess_type(path)
            caller.send_header("Content-Type", type)
            encoded = False
            if type in compressed_types:
                try:
                    if 'gzip' in caller.headers['Accept-Encoding']:
                        caller.send_header("Content-Encoding", "gzip")
                        encoded = True
                except (TypeError, KeyError):
                    pass
            caller.end_headers()
            with open(path, 'rb') as f:
                if encoded:
                    with GzipFile(mode='wb', fileobj=caller.wfile) as out:
                        shutil.copyfileobj(f, out)
                else:
                    shutil.copyfileobj(f, caller.wfile)
        else:
            notFoundHandler(caller)

def notFoundHandler(caller):
    caller.send_header("Content-Type", "text/html")
    caller.end_headers()
    caller.send_response(HTTPStatus.NOT_FOUND, "Page not found")
