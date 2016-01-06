from bs4 import BeautifulSoup
import urllib
import json,httplib

#Variables and stuff
originalHTML = urllib.urlopen("http://www.clsd.k12.pa.us/CCHigh.cfm?subpage=41913")
sourceCode = originalHTML.read()
soup = BeautifulSoup(sourceCode)
clubTable = []
names = []
locations = []
advisors = []
weeks = []

#gets the calendar table columns
clubTable = soup.find('div', id="sw-clientContent").findAll('table')[1]
print(len(clubTable));

weekCount = 0
count = 0
trs = clubTable.findAll("tr")
print(len(trs))
#adds all the text to an array
for item in trs:
    tds = trs[count].findAll("td")
    if len(tds) == 3:
        font1 = tds[0].findAll("font")
        font2 = tds[1].findAll("font")
        font3 = tds[2].findAll("font")
        name = font1[len(font1)-1].contents[0]
        location = font2[len(font2)-1].contents[0]
        advisor = font3[len(font3)-1].contents[0]
        week = str(weekCount)
        try:
            name = font1[len(font1)-1].findAll("u")[0].contents[0]
        except:
            name = font1[len(font1)-1].contents[0]
        if count == 2:
            name = font1[0].contents[0]
            for i in range(0, len(advisor)):
                if advisor[i] == '/' and advisor[i+1] == '/':
                    advisor = advisor[:i+1] + " " + advisor[i+2:]
        if name != "CLUB":
            for i in range(0, len(advisor)):
                if advisor[i] == '/':
                    advisor = advisor[:i+1] + " " + advisor[i+1:]
            names.append(name)
            advisors.append(advisor)
            locations.append(location)
            weeks.append(week)
    if len(tds) == 1:
        weekCount = weekCount + 1
        if weekCount == 2:
            weekCount = 4
        elif weekCount == 5:
            weekCount = 3
        elif weekCount == 4:
            weekCount = 2 
    count = count + 1    

#gets parse ready and uploads
#HTTP Request to grab stuff from database using REST API
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
idNumbers = []
params = urllib.urlencode({"limit":1000})
#Sends request and returns results in a list
connection.request('GET', '/1/classes/Clubs?%s' % params, '', {
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
    print '/1/classes/Clubs/' + i
    connection.request('DELETE', '/1/classes/Clubs/' + i, '', {
       "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
       "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C"
    })
    result = json.loads(connection.getresponse().read())
    #print result
    
#Posts updated info to Parse, starting with an empty database
count = 0
for item in names:
    connection.request('POST', '/1/classes/Clubs', json.dumps({
        "name": names[count],
        "advisor": advisors[count],
        "location": locations[count],
        "week": weeks[count]
    }), {
        "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
       "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C",
       "Content-Type": "application/json"
    })
    result = json.loads(connection.getresponse().read())
    print result
    count = count + 1