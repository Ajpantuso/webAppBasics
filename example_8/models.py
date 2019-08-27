from json import JSONEncoder
from uuid import uuid4

class CacheModel(object):

    def __init__(self, id):
        if id:
            self._id = int(id)
        else:
            self._id = uuid4().int

    @property
    def id(self):
        return self._id

    @classmethod
    def decode(cls, kwargs):
        return cls(**kwargs)

    def encode(self):
        d = self.__dict__
        d['id'] = d.pop('_id')
        return d

class CacheModelEncoder(JSONEncoder):

     def default(self, obj):
        d = obj.__dict__
        d['id'] = d.pop('_id')
        return d

class User(CacheModel):

    def __init__(self, firstName, lastName, role, id=None):
        self.firstName = firstName
        self.lastName = lastName
        self.role = role
        super().__init__(id)

class UserEncoder(CacheModelEncoder):
    pass

class Company(CacheModel):

    def __init__(self, name, industry, id=None):
        self.name = name
        self.industry = industry
        super().__init__(id)

class CompanyEncoder(CacheModelEncoder):
    pass
