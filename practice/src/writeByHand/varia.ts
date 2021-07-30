function myCreateObject(proto) {
  function F() {}

  F.prototype = proto;
  return new F();
}

function parseParam(url: string) {
  if (typeof url !== "string") return;
  let paramsStr = url.replace(/(http:|https:)?!\/\/(\S+)/, "$2");
  let res = {};

  if (paramsStr != null) {
    paramsStr.split("&").forEach((str) => {
      let arr = str.replace(/(\S+)=(\S+)/, "$1,$2").split(",");
      let key = arr[0],
        val = arr[1] != null ? decodeURIComponent(arr[1]) : true;
      let prevCached = res[key];
      if (prevCached) {
        if (Array.isArray(prevCached)) {
          res[key] = prevCached.concat(val);
        } else {
          res[key] = [prevCached, val];
        }
      } else {
        res[key] = val;
      }
    });
    return res;
  }
  return res;
}

//下划线转换为驼峰
function transformToTuofeng(str) {
  return str.replace(/-\w/g, (x) => x.slice(1).toUpperCase());
}
//驼峰转换下划线
function hump2Underline(str) {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}
