from bs4 import BeautifulSoup
import urllib
import json,httplib

#Variables and stuff
originalHTML = urllib.urlopen("http://www.clsd.k12.pa.us/calendar_events.cfm?location=0")
sourceCode = originalHTML.read()
soup = BeautifulSoup(sourceCode)
weeksTable = []
content = []
dates = []
dayNames = []

#gets the calendar table columns
weeksTable = soup.find('table', id="MainCalendarTable").findAll('tr', recursive = False)
print(len(weeksTable));
print(weeksTable[5].findAll("td", recursive = False)[1].findAll("table")[1].findAll("tr", recursive = False)[1].findAll("td", recursive = False)[1].text)

#adds all the text to an array
for item in weeksTable:
    count = 0
    tds = item.findAll("td", recursive = False)
    if len(tds) > 0:
        innerContent = []
        for td in tds:
            count = count + 1
            table2 = td.findAll("table")
            if len(table2) > 1:
                tr2 = table2[1].findAll("tr", recursive = False)
                if len(tr2) > 1:
                    td2 = tr2[1].findAll("td", recursive = False)
                    if len(td2) > 1:
                        innerContent.append(td2[1].text)
                        date = table2[0].findAll("td")[0].text
                        dates.append(date)
                        #print(count)
                        name = weeksTable[1].findAll("td")[count-1].text
                        dayNames.append(name)
    content.append(innerContent)

#gets parse ready and uploads
#HTTP Request to grab stuff from database using REST API
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
idNumbers = []
params = urllib.urlencode({"limit":1000})
#Sends request and returns results in a list
connection.request('GET', '/1/classes/Calendar?%s' % params, '', {
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
    print '/1/classes/Calendar/' + i
    connection.request('DELETE', '/1/classes/Calendar/' + i, '', {
       "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
       "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C"
    })
    result = json.loads(connection.getresponse().read())
    #print result
    
#Posts updated info to Parse, starting with an empty database
count = 0
for item in content:
    for td in item:
        connection.request('POST', '/1/classes/Calendar', json.dumps({
            "cell": td,
            "date": dates[count],
            "name": dayNames[count]
        }), {
            "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
           "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C",
           "Content-Type": "application/json"
        })
        result = json.loads(connection.getresponse().read())
        print result
        count = count + 1