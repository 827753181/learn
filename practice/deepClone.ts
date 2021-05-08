var toType = (typeThing) => {
  return Object.prototype.toString.call(typeThing).slice(8,-1).toLocaleLowerCase();
}
function deepClone(obj){
  let objType = toType(obj);
  if( objType === 'object'|| objType==='array'){
      let newObj = null;
      for(let key in obj){
         newObj[key] = deepClone(obj[key]);
      }
      return newObj;
  }else{
      return obj;
  }

}