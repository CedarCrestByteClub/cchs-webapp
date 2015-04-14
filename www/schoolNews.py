#Lauren Johnston
#scrapes for school news and writes to a file

from bs4 import BeautifulSoup
import urllib
import json,httplib

#set up source code
originalHTML = urllib.urlopen("http://www.clsd.k12.pa.us/news.cfm?school=225")
sourceCode = originalHTML.read()
soup = BeautifulSoup(sourceCode)
listOfStrings = []
links = []
content = []

#finds all of the articles for the current month
listOfStrings = soup.find("table").tr.td.findAll('a', recursive=False)

#retrieves all of the popup urls
for link in listOfStrings:
    if("more info" not in link.text):
        links.append("http://www.clsd.k12.pa.us/" + link.get("href").replace("popup_info", "news"))

#gets all of the pertinent info from each link
for link in links:
    #make new soup from the news articles
    orig = urllib.urlopen(link)
    source = orig.read()
    soupTwo = BeautifulSoup(source)
        
    #takes the text out of the article and appends it to content
    table = soupTwo.find("div", id="sw-clientContent").find("table").text
    content.append(table)
for thing in content:
    print thing
 
#gets parse ready and uploads
#HTTP Request to grab stuff from database using REST API
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
idNumbers = []
params = urllib.urlencode({"limit":1000})
#Sends request and returns results in a list
connection.request('GET', '/1/classes/News?%s' % params, '', {
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
    print '/1/classes/News/' + i
    connection.request('DELETE', '/1/classes/News/' + i, '', {
       "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
       "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C"
    })
    result = json.loads(connection.getresponse().read())
    #print result
    
#Posts updated info to Parse, starting with an empty database
for i in range(0, len(content)):
    connection.request('POST', '/1/classes/News', json.dumps({
        "story": content[i]
    }), {
        "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
       "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C",
       "Content-Type": "application/json"
    })
    result = json.loads(connection.getresponse().read())
    print result 
    