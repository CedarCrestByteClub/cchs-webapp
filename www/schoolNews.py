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
    links.append("http://www.clsd.k12.pa.us/" + link.get("href"))

#gets all of the pertinent info from each popup link
for link in links:
    news = []
    tags = []
    paras = []
    #make new soup from the news articles
    orig = urllib.urlopen(link)
    source = orig.read()
    soupTwo = BeautifulSoup(source)
    
    #takes the last font off of the end of the doc and extracts it, then gets the content it will remove tags from
    soupTwo = soupTwo.find("div", id="inside").extract()
    for tag in soupTwo.findAll("font"):
        tags.append(tag.extract())
    for tag in tags:
        for link in tag.findAll(["p", "div"]):
            paras.append(tag.extract())
    
    #add all the tags to the end of the font except for the last two
    for i in range(0, len(paras)-2):
        tags.append(paras[i])
    
    #add the font back into the soup
    for tag in tags:
        soupTwo.append(tag)
    
    #add all the tags to the array
    for tag in soupTwo:
        news.append(tag)
        print news
    
    