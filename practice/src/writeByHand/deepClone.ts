var toType = (typeThing) => {
  return Object.prototype.toString
    .call(typeThing)
    .replace(/\[object (\S+)\]/, "$1")
    .toLocaleLowerCase();
};
function deepClone(obj) {
  let objType = toType(obj);
  if (objType === "object" || objType === "array") {
    let newObj = null;
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = deepClone(obj[key]);
      }
    }
    return newObj;
  } else {
    return obj;
  }
}
