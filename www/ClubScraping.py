#Lauren Johnston
#scrapes the club list and uploads to database

from bs4 import BeautifulSoup
import urllib
import json,httplib

#Variables and stuff
originalHTML = urllib.urlopen("http://www.clsd.k12.pa.us/CCHigh.cfm?subpage=41913")
sourceCode = originalHTML.read()
soup = BeautifulSoup(sourceCode)
clubDescrip = []
weeksTable = []
clubLinks = []
index = 0

#Navigates through publications source code / "parse tree" to find where the links and table are being held hostage
weeksTable = soup.find("div", id="sw-clientContent").div.find_next_sibling().table.tbody.findAll("tr")

#loads table into 2D array WHOEVER WORKS ON THIS NEXT, WE NEED ACCESS TO THE DISTRICT SITE SO THAT WE
#CAN GET REAL DATA INSTEAD OF FILLER DATA, CAUSE THEY DON'T HAVE A GOOD SYSTEM TO STORE THEIR DATA
clubTable = [["Clubs", "Location", "Advisor", "Week"], ["Fight Club", "800000", "Ms.", "1"], ["myClub", "LGI", "woop, there it is", "2"]]
'''temp = [None]*len(weeksTable)
for i in range(len(weeksTable)):
    theText = str(weeksTable[i].text)
    temp[i]=(theText)
    if((i % 3) == 0):    #keep this a comment, plz
        clubTable.append(temp)
        print temp
        temp = [None]'''


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
    print ((result['results'])[i])['objectId']
    idNumbers.append(((result['results'])[i])['objectId'])

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
for i in range(0, len(clubTable)):
    connection.request('POST', '/1/classes/Clubs', json.dumps(
    {
        "name": clubTable[i][0],
        "location": clubTable[i][1],
        "advisor": clubTable[i][2],
        "week": clubTable[i][3]
    }), 
    {
        "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
        "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C",
        "Content-Type": "application/json"
    })
    result = json.loads(connection.getresponse().read())
    print result