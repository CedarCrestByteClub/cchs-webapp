from bs4 import BeautifulSoup
import urllib

#Variables and stuff
originalHTML = urllib.urlopen("http://www.clsd.k12.pa.us/CCHigh.cfm?subpage=41913")
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

#index done equals cero
index = 0

#adds stuffs to the thinger that the website doesn't already have done included
while index < len(listOfStrings):
    yearLinks.append("http://www.clsd.k12.pa.us/" + listOfStrings[index])
    print yearLinks[index]
    index += 1
    
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
            issueLinks.append("http://www.clsd.k12.pa.us" + link.get("href"))
            print(link.get("href"))
    articleLinks.append(issueLinks)