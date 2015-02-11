from bs4 import BeautifulSoup
import urllib

#Variables and stuff
originalHTML = urllib.urlopen("http://www.clsd.k12.pa.us/CCHigh.cfm?subpage=41913")
sourceCode = originalHTML.read()
soup = BeautifulSoup(sourceCode)
weeksTable = []
clubDescrip = []
clubLinks = []
index = 0

#Navigates through publications source code / "parse tree" to find where the links and table are being held hostage
weeksTable = soup.find("div", id="sw-clientContent").div.find_next_sibling().table
clubDescrip = soup.find("ul", id="qlItems").find("ul", {"class", "deeper"}).findAll("li", recursive=False)

tableFile = open("table", 'w')
tableFile.write(weeksTable)

#Grabs herefs and the year they correspond to
for index in range(0, len(clubDescrip)):
    clubDescrip[index] = clubDescrip[index].a["href"]
    print clubDescrip[index]

#index done equals cero
index = 0

#adds stuffs to the thinger that the website doesn't already have done included
while index < len(clubDescrip):
    clubLinks.append("http://www.clsd.k12.pa.us/" + clubDescrip[index])
    print clubLinks[index]
    index += 1
'''    
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
    '''