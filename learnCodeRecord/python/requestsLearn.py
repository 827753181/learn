import requests
url = "https://www.baidu.com"  # url地址在请求头中可以看见
query_string = {
    "query": "人生",
    "from": "zh",
    "to": "en"
}  # 参数
response = requests.get(url, data=query_string)
print(response.content)
