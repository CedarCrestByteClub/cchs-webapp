#Erik
#scrapes for current talon articles and uploads their info to parse
from bs4 import BeautifulSoup
import urllib
import json,httplib

years = []
issues = []
urls = []
baseurl = "https://moodle.clsd.k12.pa.us/district_videos/Talons"
baseurl2 = baseurl
url = ""
#https://moodle.clsd.k12.pa.us/district_videos/Talons/2015-16/Talon01/Talon2015-01.html
#https://moodle.clsd.k12.pa.us/district_videos/Talons/2015-16/Talon01/Talon2015-01.html
#https://moodle.clsd.k12.pa.us/district_videos/Talons/Talon01/Talon2014-01.html
startYear = 2014
notDoneYear = True
notDoneIssue = True
issueCount = 0

while notDoneYear == True:
    if startYear == 2014:
        baseurl2 = baseurl + "/"
    else:
        baseurl2 = baseurl + "/" + str(startYear) + "-" + str(startYear - 2000 + 1)
    url = baseurl2
    notDoneIssue = True
    issueCount = 0
    while notDoneIssue == True:
        url = baseurl2
        issueCount = issueCount + 1
        if issueCount < 10:
            url = url + "/Talon0" + str(issueCount) + "/Talon" + str(startYear) + "-0" + str(issueCount) + ".html"
        else:
            url = url + "/Talon" + str(issueCount) + "/Talon" + str(startYear) + "-" + str(issueCount) + ".html"
        try:
            print(url)
            originalHTML = urllib.urlopen(url)
            sourceCode = originalHTML.read()
            soup = BeautifulSoup(sourceCode)
            #print(sourceCode)
            try:
                title = soup.title.string
                print("not null")
                if issueCount == 1:
                    notDoneIssue = False
                    notDoneYear = False
                else:
                    notDoneIssue = False
            except:
                print("null")
                urls.append(url)
                years.append(startYear)
                issues.append(issueCount)
        except:
            if issueCount == 1:
                notDoneIssue = False
                notDoneYear = False
            else:
                notDoneIssue = False
    startYear = startYear + 1








  
#HTTP Request to grab stuff from database using REST API
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
idNumbers = []
params = urllib.urlencode({"limit":1000})
#Sends request and returns results in a list
connection.request('GET', '/1/classes/TalonLinks?%s' % params, '', {
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
    print '/1/classes/TalonLinks/' + i
    connection.request('DELETE', '/1/classes/TalonLinks/' + i, '', {
       "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
       "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C"
    })
    result = json.loads(connection.getresponse().read())
    #print result
    
#Posts updated info to Parse, starting with an empty database
for i in range(0, len(urls)):
    connection.request('POST', '/1/classes/TalonLinks', json.dumps({
        "Year": years[i],
        "Issue": issues[i],
        "Link": urls[i]
    }), {
       "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
       "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C",
       "Content-Type": "application/json"
    })
    result = json.loads(connection.getresponse().read())
    print result