#Lauren Johnston
#scrapes for the lunch calendar and puts the info on parse

from bs4 import BeautifulSoup
import urllib
import json,httplib

#Variables and stuff
originalHTML = urllib.urlopen("http://www.clsd.k12.pa.us/lunch_menus.cfm?mycat=66")
sourceCode = originalHTML.read()
soup = BeautifulSoup(sourceCode)
weeksTable = []
content = []

#gets the calendar table columns
weeksTable = soup.find("div", id="sw-clientContent").table.find_next_sibling().findAll("tr")

#adds all the text to an array
for item in weeksTable:
    tds = item.findAll("td")
    innerContent = []
    for td in tds:
        innerContent.append(td.text)
    content.append(innerContent)

#gets parse ready and uploads
#HTTP Request to grab stuff from database using REST API
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
idNumbers = []
params = urllib.urlencode({"limit":1000})
#Sends request and returns results in a list
connection.request('GET', '/1/classes/Lunch?%s' % params, '', {
    "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
    "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C"
})
result = json.loads(connection.getresponse().read())
#Loops through and adds each object's ID to array
for i in range(0, len(result['results'])):
    print ((result['results'])[i])['objectId']
    idNumbers.append(((result['results'])[i])['objectId'])

print len(idNumbers)
connection.connect()
#Deletes every item one by one (Parse doesn't really do mass deletion)
for i in idNumbers:
    print '/1/classes/Lunch/' + i
    connection.request('DELETE', '/1/classes/Lunch/' + i, '', {
       "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
       "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C"
    })
    result = json.loads(connection.getresponse().read())
    #print result
    
#Posts updated info to Parse, starting with an empty database
for item in content:
    for td in item:
        connection.request('POST', '/1/classes/Lunch', json.dumps({
            "cell": td
        }), {
            "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
           "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C",
           "Content-Type": "application/json"
        })
        result = json.loads(connection.getresponse().read())
        print result 