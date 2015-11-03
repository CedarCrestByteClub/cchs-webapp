from bs4 import BeautifulSoup
import requests
import urllib
import urllib2
import cookielib
import execjs
import json,httplib
import nltk

requests.packages.urllib3.disable_warnings()
link = ""
print("running")
#def load(url):
url = "https://moodle.clsd.k12.pa.us/course/view.php?id=314"
link = url
code = urllib.urlopen(link)
htmlCode = code.read()
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/classes/MoodleLinks', json.dumps(
{
    "userid":"000001",
    "link":htmlCode
}), 
{
    "X-Parse-Application-Id": "1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw",
    "X-Parse-REST-API-Key": "wL9fgRcbDT7UE6slUasHwC1bClQxRyaPCUOZ7a5C",
    "Content-Type": "application/json"
})
# load("https://moodle.clsd.k12.pa.us/course/view.php?id=314")