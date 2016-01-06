#Lauren Johnston
#scrapes for the lunch calendar and puts the info on parse

from bs4 import BeautifulSoup
import urllib
import json,httplib
import unicodedata

#Variables and stuff
originalHTML = urllib.urlopen("http://www.clsd.k12.pa.us/lunch_menus.cfm?mycat=972")
sourceCode = originalHTML.read()
soup = BeautifulSoup(sourceCode)
weeksTable = []
content = []
numbers = []
days = []

#gets the calendar table columns
weeksTable = soup.find("div", id="sw-clientContent").table.find_next_sibling().findAll("tr")

dayCount = 1
tempCount = -1

#adds all the text to an array
for x in range(1,len(weeksTable)):
    tds = weeksTable[x].findAll("td")
    innerContent = []
    for td in tds:
        tempCount = tempCount + 1
        if tempCount % 5 == 0 and tempCount > 0:
            dayCount = dayCount + 2
            rightDate = str(dayCount)
        else:
            rightDate = str(dayCount)
            #rightDate = unicodedata.normalize('NFKD', td.text).encode('ascii','ignore')[5:7].strip()
        #print(rightDate)
        if len(td.text) > 10:
            innerContent.append(td.text)
        else:
            innerContent.append("No lunch served today")
            
            
        if len(td.text) > 10:
            #numbers.append(str(dayCount));
            numbers.append(rightDate)
            dayCount = dayCount + 1
        elif len(td.text) < 10 and tempCount < 10:
            numbers.append("0")
        else:
            #numbers.append(str(dayCount));
            numbers.append(rightDate)
            dayCount = dayCount + 1
        dNum = tempCount % 5
        if dNum == 0:
            days.append("Monday")
        elif dNum == 1:
            days.append("Tuesday")
        elif dNum == 2:
            days.append("Wednesday")
        elif dNum == 3:
            days.append("Thursday")
        else:
            days.append("Friday")
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

count = 0
#print(len(days))
#print(len(content))

#Posts updated info to Parse, starting with an empty database
for item in content:
    for td in item:
        #print(str(count) + "," + str(len(item)))
        connection.request('POST', '/1/classes/Lunch', json.dumps({
            "cell": td,
            "date": numbers[count],
            "name": days[count]
        }), {
            "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
           "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C",
           "Content-Type": "application/json"
        })
        result = json.loads(connection.getresponse().read())
        count = count + 1
        print result 