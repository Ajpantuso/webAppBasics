from http.server import BaseHTTPRequestHandler
import logging
import os
import sys
from time import time

logger = logging.getLogger(__name__)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
outStream = logging.StreamHandler(stream=sys.stdout)
outStream.setFormatter(formatter)
logger.addHandler(outStream)
try:
    logger.setLevel(os.getenv('LOG_LEVEL'))
except:
    logger.setLevel('INFO')

def logHandler(caller, next):
    logger.info("Started processing request for {}".format(caller.path))
    startTime = time()
    next(caller)
    endTime = time()
    logger.info("Completed processing request for {} in {}ms".format(
        caller.path, (endTime - startTime)*1000))
