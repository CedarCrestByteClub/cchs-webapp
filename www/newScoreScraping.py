from bs4 import BeautifulSoup
import urllib
import json,httplib

#Variables and stuff
originalHTML = urllib.urlopen("http://highschoolsports.pennlive.com/school/lebanon-cedar-crest-high-school/football/schedule/")
sourceCode = originalHTML.read()
soup = BeautifulSoup(sourceCode)
weeksTable = []
content = []
dates = []
times = []
locations = []
opponents = []
results = []
teams = []

for x in range(0,2):
    #gets the calendar table columns
    if x == 0:
        weeksTable = soup.find('div', id="game-search-results").findAll("div")[0].findAll('table', recursive = False)
    if x == 1:
        weeksTable = soup.find('div', id="game-search-results").findAll("div", recursive=False)[1].findAll('table', recursive = False)
    # print(len(weeksTable));
    weeksTable = weeksTable[0].findAll("tr")
    # print(len(weeksTable))
    
    count = 0
    #adds all the text to an array
    for item in weeksTable:
        if count == 0:
            print("Stall")
        else:
            tds = weeksTable[count].findAll("td")
            tempDate = tds[0].text
            if len(tempDate) > 5:
                dates.append(tempDate[:5])
            else:
                dates.append(tempDate)
            times.append(tds[2].text)
            tempOpponent = tds[1].findAll("div")[0].text
            if tempOpponent[0] == "@":
                locations.append("Away")
                opponents.append(tempOpponent[1:])
            else:
                locations.append("Home")
                opponents.append(tempOpponent)
            if x == 0:
                results.append(tds[3].text)
            if x == 1:
                results.append("N/A")
            teams.append("Football")
        count = count + 1    

# print(len(names))
#gets parse ready and uploads
#HTTP Request to grab stuff from database using REST API
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
idNumbers = []
params = urllib.urlencode({"limit":1000})
#Sends request and returns results in a list
connection.request('GET', '/1/classes/Scores?%s' % params, '', {
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
    print '/1/classes/Scores/' + i
    connection.request('DELETE', '/1/classes/Scores/' + i, '', {
       "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
       "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C"
    })
    result = json.loads(connection.getresponse().read())
    #print result
    
#Posts updated info to Parse, starting with an empty database
count = 0
for x in range(0, len(opponents)):
    connection.request('POST', '/1/classes/Scores', json.dumps({
        "Date": dates[count],
        "Opponent": opponents[count],
        "Time": times[count],
        "Location": locations[count],
        "Result": results[count],
        "Team": teams[count]
    }), {
        "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
       "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C",
       "Content-Type": "application/json"
    })
    result = json.loads(connection.getresponse().read())
    print result
    count = count + 1