from os import urandom
from hashlib import blake2b
import shelve

pwdb = '../secrets'
keyFile = '../notSuperSecretKey.key'

def retrieveKey():
    with open(keyFile, 'rb') as kf:
        return kf.read()

def retrieveHashSalt(id):
    with shelve.open(pwdb) as db:
        try:
            h, s = db[str(id)]
        except (TypeError, KeyError):
            return ()
        else:
            return (h, s)

def hashPassword(pw):
    s = urandom(blake2b.SALT_SIZE)
    k = retrieveKey()
    h = blake2b(salt=s, key=k)
    iterations = 1000000
    try:
        h.update(bytes(pw, 'UTF-8'))
    except TypeError:
        return ()
    else:
        hashedPW = h.digest()
        for i in range(iterations):
            h.update(hashedPW)
            hashedPW = h.digest()
        return (hashedPW, s)

def testPassword(pw, hash, salt):
    k = retrieveKey()
    s = salt
    h = blake2b(salt=s, key=k)
    try:
        h.update(bytes(pw, 'UTF-8'))
    except TypeError:
        return False
    else:
        hashedPW = h.digest()
        return hash == hashedPW

def validatePassword(pw):
    return (len(pw) >= 8 and
            len(pw) <= 30 and
            [c for c in pw if c.isupper()] and
            [c for c in pw if c.islower()] and
            [c for c in pw if c.isdigit()] and
            [c for c in pw if not c.isalnum()] and
            True
            )

def addUser(id, pw):
    h, s = hashPassword(pw)
    with shelve.open(pwdb) as db:
        try:
            db[str(id)] = (h, s)
        except (TypeError, KeyError):
            return False
        else:
            return True

print(hashPassword("HolyFuckingShit!:# WARNING: "))
