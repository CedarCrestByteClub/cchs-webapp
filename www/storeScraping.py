from bs4 import BeautifulSoup
import urllib
import json,httplib

#Variables and stuff
originalHTML = urllib.urlopen("http://www.clsd.k12.pa.us/CCHigh.cfm?subpage=1306593")
sourceCode = originalHTML.read()
soup = BeautifulSoup(sourceCode)
weeksTable = []
content = []
names = []
urls = []

#gets the calendar table columns
weeksTable = soup.find('div', id="sw-clientContent").findAll('table', recursive = False)
# print(len(weeksTable));
weeksTable = weeksTable[1].findAll("td")
# print(len(weeksTable))

#adds all the text to an array
for item in weeksTable:
    count = 0
    name = item.findAll('font')[1].text
    picture = (item.findAll('img')[0])["src"]
    names.append(name)
    urls.append(picture)

# print(len(names))
#gets parse ready and uploads
#HTTP Request to grab stuff from database using REST API
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
idNumbers = []
params = urllib.urlencode({"limit":1000})
#Sends request and returns results in a list
connection.request('GET', '/1/classes/Store?%s' % params, '', {
    "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
    "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C"
})
result = json.loads(connection.getresponse().read())
#Loops through and adds each object's ID to array
for i in range(0, len(result['results'])):
    #print ((result['results'])[i])['objectId']
    idNumbers.append(((result['results'])[i])['objectId'])

print len(idNumbers)
connection.connect()
#Deletes every item one by one (Parse doesn't really do mass deletion)
for i in idNumbers:
    print '/1/classes/Store/' + i
    connection.request('DELETE', '/1/classes/Store/' + i, '', {
       "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
       "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C"
    })
    result = json.loads(connection.getresponse().read())
    #print result
    
#Posts updated info to Parse, starting with an empty database
count = 0
for x in range(0, len(names)):
    connection.request('POST', '/1/classes/Store', json.dumps({
        "name": names[x],
        "url": urls[x]
    }), {
        "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
       "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C",
       "Content-Type": "application/json"
    })
    result = json.loads(connection.getresponse().read())
    print result
    count = count + 1