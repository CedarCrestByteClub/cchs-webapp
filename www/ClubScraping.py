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

#loads table into 2D array
clubTable = []
temp = [None]*len(weeksTable)
for i in range(len(weeksTable)):
    theText = str(weeksTable[i].text)
    temp[i]=(theText)
    '''if((i % 3) == 0):
        clubTable.append(temp)
        print temp
        temp = [None]'''



connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
idNumbers = []
params = urllib.urlencode({"limit":1000})
connection.request('GET', '/1/classes/Clubs?%s' % params, '', {
    "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
    "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C"
})
result = json.loads(connection.getresponse().read())
for i in range(0, len(result['results'])):
    print ((result['results'])[i])['objectId']
    idNumbers.append(((result['results'])[i])['objectId'])