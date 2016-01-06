import urllib
import time
import json,httplib

date = str(time.strftime("%m") + "/" + time.strftime("%d") + "/20" + time.strftime("%y"))
print(date)

#gets parse ready and uploads
#HTTP Request to grab stuff from database using REST API
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
people = []
count = 0
total = 0
params = urllib.urlencode({"limit":1000})
#Sends request and returns results in a list
connection.request('GET', '/1/classes/UserIDs?%s' % params, '', {
    "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
    "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C"
})
result = json.loads(connection.getresponse().read())
result = result['results']
total = len(result)
print(total)
#print((result[0].values())[0])
#Loops through and adds each object's ID to array
for i in range(0, len(result)):
    value = (result[i].values())[0]
    #print(value)
    people.append(value)
    
for i in range(0, len(people)):
    if people[i] == date:
       count = count + 1
print(count)

connection.request('GET', '/1/classes/Analytics?%s' % params, '', {
    "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
    "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C"
})
result = json.loads(connection.getresponse().read())
result = result['results']
max = 0;
for x in range(0, len(result)):
    if (result[x])["dayNum"] > max:
        max = (result[x])["dayNum"]
dayNum = max + 1

connection.connect()  
#Posts updated info to Parse, starting with an empty database
connection.request('POST', '/1/classes/Analytics', json.dumps({
    "Date": date,
    "Active": count,
    "Total": total,
    "dayNum": dayNum
}), {
    "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
   "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C",
   "Content-Type": "application/json"
})
result = json.loads(connection.getresponse().read())
print result