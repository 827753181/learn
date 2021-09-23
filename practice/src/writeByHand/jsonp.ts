export default function jsonp(url, data) {
  if (!url || !data) return;
  let dataStr = "";
  for (let key in data) {
    dataStr += `${key}=${data[key]}&`;
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const cbFn = `jsonp${Date.now()}`;
    script.setAttribute("src", `${url}?${dataStr}jsoncallback=${cbFn}`);
    let head = document.getElementsByTagName("head")[0];
    window[cbFn] = function (res) {
      res ? resolve(res) : reject("");
      window[cbFn] = null;
      head.removeChild(script);
    };
    head.appendChild(script);
  });
}
