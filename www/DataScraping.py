from bs4 import BeautifulSoup
import urllib

originalHTML = urllib.urlopen("http://www.clsd.k12.pa.us/CCHigh.cfm?subpage=43147")
sourceCode = originalHTML.read()
soup = BeautifulSoup(sourceCode)
listOfStrings = ""

for link in soup.find_all("a"):
    listOfStrings = listOfStrings + link.text + link.get("href")
    
myList = listOfStrings.split("2002-2003")
finalList = myList[1].split("School Information")
yearLinks = []
index = 0

while finalList.hasNext():
    yearLinks[index] = "http://www.clsd.k12.pa.us/" + (finalList[0].split("200" +str(index + 3) + "-200" + str(index + 4)))[0]
    print yearLinks[index]
    index = index + 1

'''
firstLink = "http://www.clsd.k12.pa.us/" + (finalList[0].split("2003-2004"))[0]
print firstLink
secondLink = "http://www.clsd.k12.pa.us/" + (((finalList[0].split("2004-2005"))[1]).split("2005-2006"))[0]
print secondLink
thirdLink = "http://www.clsd.k12.pa.us/" + (((finalList[0].split("2005-2006"))[1]).split("2006-2007"))[0]
print thirdLink
fourthLink = "http://www.clsd.k12.pa.us/" + (((finalList[0].split("2006-2007"))[1]).split("2007-2008"))[0]
print fourthLink
fifthLink = "http://www.clsd.k12.pa.us/" + (((finalList[0].split("2007-2008"))[1]).split("2008-2009"))[0]
print fifthLink
sixthLink = "http://www.clsd.k12.pa.us/" + (((finalList[0].split("2008-2009"))[1]).split("2009-2010"))[0]
print sixthLink
seventhLink = "http://www.clsd.k12.pa.us/" + (((finalList[0].split("2009-2010"))[1]).split("2010-2011"))[0]
print seventhLink
eighthLink = "http://www.clsd.k12.pa.us/" + (((finalList[0].split("2010-2011"))[1]).split("2011-2012"))[0]
print eighthLink
ninthLink = "http://www.clsd.k12.pa.us/" + (((finalList[0].split("2011-2012"))[1]).split("2012-2013"))[0]
print ninthLink
tenthLink = "http://www.clsd.k12.pa.us/" + (((finalList[0].split("2012-2013"))[1]).split("2013-2014"))[0]
print tenthLink
eleventhLink = "http://www.clsd.k12.pa.us/" + (((finalList[0].split("2013-2014"))[1]).split("2014-2015"))[0]
print eleventhLink
'''
