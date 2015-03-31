#Lauren Johnston
#scrapes the dreaded schedulestar to get sports schedules

from bs4 import BeautifulSoup
import urllib
import json,httplib
import time

#set up source code based on date and declare other variables
originalHTML = urllib.urlopen("http://schedules.schedulestar.com/cfcs/schedule.cfc?ReturnFormat=json&method=getEventList&x=1426611373795_&sc_id=PA170423667&schedDate="+time.strftime("%m")+"%2F"+time.strftime("%d")+"%2F"+time.strftime("%y")+"&current_schedule_view=month&userid=0&genderid=0&levelid=0&sportid=0")
sourceCode = originalHTML.read()
soup = BeautifulSoup(sourceCode)

#var declaration
lines = []
entries = []
events = []
event = [None]*11 #creates empty array with 11 elements

#splits the scraped code by a square bracket and only keeps the code that has the event list in it
lines = sourceCode.partition("[")
line = lines[2]

#resets the lines array and then sets it to the list of events split by commas
lines = []
lines = line.split("{\"ME_SC_ID\"", 150)

#adds all of the different events into all of their componenets
for l in range(1, len(lines)):
    entries.append(lines[l].split(","))

#goes through every event and...
for l in range(len(entries)):
    #resets values
    i=0
    event = [None]*11
    
    #takes care of unfindable components by using their common index
    event[2] = entries[l][5].partition(":")[2]#sport
    event[5] = entries[l][21].partition(":")[2]#gender
    event[7] = entries[l][28].partition(":")[2]#level
    event[10] = entries[l][57].partition(":")[2]#Home/Away
    
    #cancellations based on the string
    if entries[l][9].partition(":")[2] is "0":
        event[3] = 0
    else:
        event[3] = 1
        
    #checks to see if each component is one we need, and if so, set the second half(actual info) to the appropriate
    #index of the temprorary event array
    while(i < len(entries[l])):
        if "FACILITY" in entries[l][i] and not "_" in entries[l][i]:
            event[0] = entries[l][i].partition(":")[2]
        elif "PPONEDTO" in entries[l][i]:
            print entries[l][i]
            event[1] = entries[l][i].partition(":")[2]
        elif "EVENTDATE" in entries[l][i]:
            try:
                event[4] = entries[l][i].partition(":")[2] + entries[l][i+1]
            except:
                event[4] = "NA"
        elif "OPPONENT" in entries[l][i]:
            event[6] = entries[l][i].partition(":")[2]
        elif "STARTTIME" in entries[l][i]:
            event[8] = entries[l][i].partition(":")[2]
        
        i+=2
    #add new event to events array
    events.append(event)

#HTTP Request to grab stuff from database using REST API
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
idNumbers = []
params = urllib.urlencode({"limit":1000})

#Sends request and returns results in a list
connection.request('GET', '/1/classes/Sport?%s' % params, '', {
    "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
    "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C"
})
result = json.loads(connection.getresponse().read())
        
#Loops through and adds each object's ID to array
for i in range(0, len(result['results'])):
    #print ((result['results'])[i])['objectId']
    idNumbers.append(((result['results'])[i])['objectId'])

#Deletes every item one by one (Parse doesn't really do mass deletion)
for i in idNumbers:
    #print '/1/classes/Sport/' + i
    connection.request('DELETE', '/1/classes/Sport/' + i, '', {
       "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
       "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C"
    })
    result = json.loads(connection.getresponse().read())
    #print result    
        
 #Posts updated info to Parse, starting with an empty database
for i in range(0, len(events)):
    connection.request('POST', '/1/classes/Sport', json.dumps(
    {
        "facility": events[i][0],
        "postponed": events[i][1],
        "sport": events[i][2],
        "cancelled": events[i][3],
        "date": events[i][4],
        "gender": events[i][5],
        "opponent": events[i][6],
        "level": events[i][7],
        "startTime": events[i][8],
        "home": events[i][10]
    }), 
    {
        "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
        "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C",
        "Content-Type": "application/json"
    })
    result = json.loads(connection.getresponse().read())
