from bs4 import BeautifulSoup #BeautifulSoup allows for easy manipulation of website source code
import urllib #urllib connects to the website for us
import json,httplib

baseURL = "http://highschoolsports.pennlive.com/school/lebanon-cedar-crest-high-school/"
endURL = "/schedule/"
urls = ["football","wrestling","fieldhockey","boysbasketball","girlsbasketball","boyssoccer","girlssoccer","girlstennis","boysgolf","boysswimming","girlsswimming","girlsgolf","boyscrosscountry","girlscrosscountry","girlsvolleyball","boysicehockey"]
names = ["Football","Wrestling","Field Hockey","Boys Basketball","Girls Basketball","Boys Soccer","Girls Soccer","Girls Tennis","Boys Golf","Boys Swimming","Girls Swimming","Girls Golf","Boys Cross Country","Girls Cross Country","Girls Volleyball","Boys Ice Hockey"]
weeksTable = []
content = []
dates = []
times = []
locations = []
opponents = []
results = []
teams = []

for teamNum in range(0,len(urls)):
    print(baseURL + urls[teamNum] + endURL)
    originalHTML = urllib.urlopen(baseURL + urls[teamNum] + endURL)
    sourceCode = originalHTML.read()
    soup = BeautifulSoup(sourceCode)
    for x in range(0,2):
        #The tables with and without scores have to be handled differently because they're set up differently
        if x == 0: #If games have already been played, this sets the array to the table of the scores
            try:
                weeksTable = soup.find('div', id="game-search-results").findAll("div")[0].findAll('table', recursive = False)
            except: #These two try/except(catch) statements handle the error in case all games have been palyed or all games haven't been played
                continue
        if x == 1: #If games haven't been played, this sets the array to the table without scores yet
            try:
                weeksTable = soup.find('div', id="game-search-results").findAll("div", recursive=False)[1].findAll('table', recursive = False)
            except:
                continue
        #Changes the table to the rows instead of the whole table
        weeksTable = weeksTable[0].findAll("tr")
        print(len(weeksTable))
        
        count = 0
        #adds all the text to an array
        for item in weeksTable:
            if count == 0: #Skips the table column headers
                count = count + 1
                continue
                #print("Stall")
            else:
                tds = weeksTable[count].findAll("td") #Gets all the cells in the current row
                tempDate = tds[0].text #This if statement prevents the asterisks on PennLive from being recorded as part of the date
                if len(tempDate) > 5: 
                    dates.append(tempDate[:5])
                else:
                    dates.append(tempDate)
                times.append(tds[2].text) #Adds the time to the time array
                tempOpponent = tds[1].findAll("div")[0].text #This part figures out home/awau and trims the @ out of the opponent name if necessary
                if tempOpponent[0] == "@":
                    locations.append("Away")
                    opponents.append(tempOpponent[1:])
                else:
                    locations.append("Home")
                    opponents.append(tempOpponent)
                if x == 0: #Handles the scores
                    results.append(tds[3].text)
                if x == 1:
                    results.append("N/A")
                teams.append(names[teamNum])
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
print(len(opponents))
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