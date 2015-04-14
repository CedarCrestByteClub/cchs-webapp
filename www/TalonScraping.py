from bs4 import BeautifulSoup
import urllib
import json,httplib

#Variables and stuff
originalHTML = urllib.urlopen("http://www.clsd.k12.pa.us/CCHigh.cfm?subpage=43147")
sourceCode = originalHTML.read()
soup = BeautifulSoup(sourceCode)
listOfStrings = []
years = []
yearLinks = []
index = 0

#Navigates through publications source code / "parse tree" to find where the links are being held hostage
listOfStrings =soup.find("ul", id="qlItems").find("ul", {"class": "deeper"}).find("ul", {"class": "deeper"}).find("ul", {"class": "deeper"}).findAll("li", recursive = False)

#Grabs herefs and the link they correspond too
for index in range(0, len(listOfStrings)):
    years.append(listOfStrings[index].a.string)
    listOfStrings[index] = listOfStrings[index].a["href"]
    print listOfStrings[index]
    print years[index]
  
currentLink = ""
for link in soup.find_all("a"):
    if "20" + str(len(years) + 2) + "-20" + str(len(years) + 3) in link.text:
        currentLink = link.get("href")

#index done equals cero
index = 0

#adds stuffs to the thinger that the website doesn't already have done included
while index < len(listOfStrings):
    yearLinks.append("http://www.clsd.k12.pa.us/" + listOfStrings[index])
    print yearLinks[index]
    index += 1
    
yearLinks.append("http://www.clsd.k12.pa.us/" + currentLink)
    
#finds each year's links and try to store them prettily like the souop we has that was beautiful like soup
numberOfLinks = 0
articleLinks = []     
for i in range(0,len(yearLinks)):
    print "\n\n\n\n\n" + str(2000 + i + 2) + "-" + str(2000 + i + 3)
    issueLinks = []
    currentLink = yearLinks[i]
    html = urllib.urlopen(currentLink)
    source = html.read()
    secondSoup = BeautifulSoup(source)
    moreLinks = ""
    for link in secondSoup.find_all("a"):
        if "Issue" in link.text:
            numberOfLinks += 1
            if "http" in link.get("href"):
                issueLinks.append(link.get("href"))
                print link.get("href")
            else:
                issueLinks.append("http://www.clsd.k12.pa.us/" + link.get("href"))
                print "http://www.clsd.k12.pa.us/" + link.get("href")
    articleLinks.append(issueLinks)
  
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
for i in range(0, len(articleLinks)):
    for j in range(0, len(articleLinks[i])):
        connection.request('POST', '/1/classes/TalonLinks', json.dumps({
            "Year": i + 2002,
            "Issue": j + 1,
            "Link": articleLinks[i][j]
        }), {
           "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
           "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C",
           "Content-Type": "application/json"
        })
        result = json.loads(connection.getresponse().read())
        print result