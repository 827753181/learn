from multiprocessing import context
import ssl
import urllib.request
import urllib.parse
import urllib.robotparser

url = 'http://www.baidu.com/?s='  # 菜鸟教程搜索页面
keyword = 'Python 教程'
key_code = urllib.request.quote(keyword)  # 对请求进行编码
url_all = url+key_code
header = {
    'User-Agent': 'Mozilla/5.0 (X11; Fedora; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}  # 头部信息
request = urllib.request.Request(url_all, headers=header)
reponse = urllib.request.urlopen(
    'https://www.runoob.com/python3/python-urllib.html', context=ssl._create_unverified_context())

lines = reponse.readlines()
for line in lines:
    print(line)
fh = open("./urllib_test_runoob_search.html", "wb")    # 将文件写入到当前目录中
fh.write(reponse.read())
fh.close()


rp = urllib.robotparser.RobotFileParser()
rp.set_url("http://www.baidu.com/robots.txt")
print(rp.read())
rrate = rp.request_rate("*")
print(rp.site_maps())

print(rp.can_fetch("EasouSpider", "http://www.baidu.com"))
print(rp.can_fetch("*", "http://www.baidu.com"))
