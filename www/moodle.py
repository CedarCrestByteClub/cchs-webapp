from bs4 import BeautifulSoup
import requests
import urllib
import urllib2
import cookielib
requests.packages.urllib3.disable_warnings()
url = "https://moodle.clsd.k12.pa.us/mod/resource/view.php?id="
print "starting"
for x in range(51450, 51460):
    raw = requests.get(url + str(x), versify=False)
    soup = BeautifulSoup(raw.content)
    if not "Internal" in soup.title.string:
        url2 = "https://moodle.clsd.k12.pa.us/login/index.php"
        acc_pwd = {'username':'cl16lauckse','password':'7554'}
        cj = cookielib.CookieJar()
        opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))
        opener.addheaders = [('User-agent','Mozilla/5.0 \ (compatible; MSIE 6.0; Windows NT 5.1)')]
        data = urllib.urlencode(acc_pwd)
        try:
            opener.open(url2,data,10)
            login = opener.open(url + str(x))
            code = login.read()
            if not "logged in" in code:
                if not "word" in code:
                    print url + str(x)
        except:
            print 'log in - times out!', url2