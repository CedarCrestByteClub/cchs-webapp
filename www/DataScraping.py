from bs4 import BeautifulSoup
import urllib

originalHTML = urllib.urlopen("http://www.clsd.k12.pa.us/CCHigh.cfm?subpage=43147")
sourceCode = originalHTML.read()
soup = BeautifulSoup(sourceCode)
listOfStrings = ""
numberOfLinks = 0

for link in soup.find_all("a"):
    listOfStrings = listOfStrings + link.text + link.get("href")
    
myList = listOfStrings.split("2002-2003")
finalList = myList[1].split("School Information")
yearLinks = []
index = 0
listString = finalList[0]

while len(listString) > 45:
    tempString = listString.split(str(2000 + index + 3) + "-" + str(2000 + index + 4))[0]
    if index != 0:
        yearLinks.extend([("http://www.clsd.k12.pa.us/" + tempString[9:])])
    else:
        yearLinks.extend([("http://www.clsd.k12.pa.us/" + tempString)])
    listString = listString.split(tempString)[1]
    print yearLinks[index]
    index = index + 1
    
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
            issueLinks.extend(link.get("href"))
            print(link.get("href"))
    articleLinks.extend(issueLinks)