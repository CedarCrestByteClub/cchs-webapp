from bs4 import BeautifulSoup
import urllib
import execjs

originalHTML = urllib.urlopen("http://www.clsd.k12.pa.us/CCHigh.cfm?subpage=43147")
sourceCode = originalHTML.read()
soup = BeautifulSoup(sourceCode)
listOfStrings = []
years = []
yearLinks = []
index = 0

listOfStrings =soup.find("ul", id="qlItems").find("ul", {"class": "deeper"}).find("ul", {"class": "deeper"}).find("ul", {"class": "deeper"}).findAll("li", recursive = False)

for index in range(0, len(listOfStrings)):
    years.append(listOfStrings[index].a.string)
    listOfStrings[index] = listOfStrings[index].a["href"]
    print listOfStrings[index]
    print years[index]

index = 0

while index < len(listOfStrings):
    yearLinks.append("http://www.clsd.k12.pa.us/" + listOfStrings[index])
    print yearLinks[index]
    index += 1
    
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

js = execjs.compile("""
     function upload(articleLinks) {
         return articleLinks;
     }
""")
print js.call("upload", articleLinks)
    
    
    
    
    
    
    
    