const https = require('https')

const data = JSON.stringify({
  lng: '120.25771872',
  distance: '1000.0',
  segment: 1,
  num: 5,
  _orgId: 597,
  lat: '30.44431438'
})

const options = {
  hostname: 'http://bus-open.parse-dev.dtwb.ibuscloud.com',
  path: '/v2/nearStop?lng=120.25771872&distance=1000.0&segment=1&num=5&_orgId=597&lat=30.44431438',
  method: 'GET',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Content-md5': 'Ktz1JInPZeJx5YYtgWhazQ==',
    'X-Date': 'Tue, 25 Aug 2020 08:35:39 GMT',
    Authorization:
      'hmac username="13537", algorithm="hmac-sha1", headers="X-Date Contend-md5", signature="utRgUDaHowevPl48gfaV9RSn0LY="',
  }
}

const req = https.request(options, res => {
  console.log(res)
})

req.on('error', error => {
  console.error(error)
})

req.write(data)
req.end()