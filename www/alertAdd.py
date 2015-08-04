#Lauren Johnston
#test file to add alerts

import urllib
import json,httplib

#HTTP Request to grab stuff from database using REST API
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
idNumbers = []
params = urllib.urlencode({"limit":1000})

#Posts updated info to Parse, starting with an empty database

connection.request('POST', '/1/classes/SchoolAlert', json.dumps(
{
    "Event": "2hr delay",
    "willOccurOn": "June 2 2015"
}), 
{
    "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
    "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C",
    "Content-Type": "application/json"
})
result = json.loads(connection.getresponse().read())
print result