import urllib
import time
import json,httplib

#gets parse ready and uploads
#HTTP Request to grab stuff from database using REST API
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
keys = ["Home", "Sport", "Lunch", "Store", "Club", "Calendar", "Planner", "Talon", "News", "Map", "Closing", "Flappy", "About"]
totals = [0,0,0,0,0,0,0,0,0,0,0,0,0]
count = 0
total = 0
idNumbers = []
params = urllib.urlencode({"limit":1000})
#Sends request and returns results in a list
connection.request('GET', '/1/classes/PageAnalytics?%s' % params, '', {
    "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
    "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C"
})
result = json.loads(connection.getresponse().read())
result = result['results']
total = len(result)
print(total)
for i in range(0, len(result)):
    #print ((result['results'])[i])['objectId']
    idNumbers.append(((result)[i])['objectId'])

print len(idNumbers)
connection.connect()
#Deletes every item one by one (Parse doesn't really do mass deletion)
for i in idNumbers:
    print '/1/classes/PageAnalytics/' + i
    connection.request('DELETE', '/1/classes/PageAnalytics/' + i, '', {
       "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
       "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C"
    })
    result1 = json.loads(connection.getresponse().read())

for i in range(0, len(result)):
    for j in range(0, len(keys)):
        try:
            totals[j] = totals[j] + (result[i])[keys[j]]
        except:
            totals[j] = totals[j]
        
print(totals[0])

connection.request('POST', '/1/classes/PageAnalytics', json.dumps({
    "Home": totals[0],
    "Sport": totals[1],
    "Lunch": totals[2],
    "Store": totals[3],
    "Club": totals[4],
    "Calendar": totals[5],
    "Planner": totals[6],
    "Talon": totals[7],
    "News": totals[8],
    "Map": totals[9],
    "Closing": totals[10],
    "Flappy": totals[11],
    "About": totals[12],
    "Final": 1
}), {
     "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
     "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C",
     "Content-Type": "application/json"
})
result = json.loads(connection.getresponse().read())
print result