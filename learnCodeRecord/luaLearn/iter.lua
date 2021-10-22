array = {"Lua", "Tutorial"}
obj = {
    ['a'] = 1,
    ['b'] = 2
}

-- 自己的迭代器
--[[ 
  迭代器的本质  
  迭代器函数表达式应该返回for需要的三个值  迭代函数、状态常量、控制变量
  for in 语句会将 状态常量 和 控制变量 作为参数调用迭代函数
  迭代函数返回值 
    如果第一个为nil，结束循环
    否则 
      赋值给左边的变量列表，执行循环
      将迭代函数返回值赋值给状态常量和控制变量，然后这两作为参数调用迭代函数
 ]]
print('\n----------iter function log start----------');
function iter(a, i)
    i = i + 1
    local v = a[i]
    if v then
        return i, v
    end
end

function ipairs2(a)
    return iter, a, 0
end
for k, v in pairs(obj) do
    print(k, v)
end
for k, v in ipairs2(array) do
    print(k, v)
end
print('----------iter function log end----------\n');
