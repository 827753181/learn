
-- table的一些function
print('\n----------table function log start----------');
print(table.concat(array, ',', 1, 2))
table.remove(array, 1)
print(table.concat(array, ','))
table.insert(array, 1, 'added')
print(table.concat(array, ','))
table.sort(array)
print(table.concat(array, ','));
print('----------table function log end----------\n');

function table_maxn(t)
    local maxmn = 0;
    for k, v in pairs(t) do
        if k > maxmn then
            maxmn = k
        end
    end
    return maxmn
end

print('\n----------metatable get set funciton log start----------');
local dtable = {
    a = 1
};
local mytable = setmetatable({3, 4}, {
    -- __index用于对表访问，类似于原型的一个概念，可以是table也可以是function
    __index = {
        foo = 3
    },
    --[[ 
    __index = function(mytable, key)
      if key == "key2" then
        return "metatablevalue"
      else
        return nil
      end
    end
   ]]
    -- __newindex用于对表更新，和__index的使用类似
    -- 设置了元方法 __newindex，在对新索引键（newkey）赋值时（mytable.newkey = "新值2"），会调用元方法，而不进行赋值。
    -- 而如果对已存在的索引键，则会进行赋值，而不调用元方法 __newindex。
    __newindex = dtable, --[[ 
  __newindex = function(mytable, key, value)
      rawset(mytable, key, "\"" .. value .. "\"")
  end ]]

    -- testTable({222})
    __call = function(mytable, newtable)
        local sum = 0
        for k, v in pairs(mytable) do
            sum = sum + v
        end
        for k, v in pairs(newtable) do
            sum = sum + v
        end
        return sum;
    end
});

mytable.c = 2;
print(mytable.a, dtable.a, mytable.foo, dtable.c)
print('__callfunction result'..mytable({
    a = 222,
    c = 333
}))
print('----------metatable get set function log end----------\n');


local testTable = setmetatable({1, 2, 3}, {
    __add = function(mytable, newtable)
        for i = 1, table_maxn(newtable) do
            table.insert(mytable, table_maxn(mytable) + 1, newtable[i])
        end
        return mytable
    end,

    --[[ 
      __add	对应的运算符 '+'.
      __sub	对应的运算符 '-'.
      __mul	对应的运算符 '*'.
      __div	对应的运算符 '/'.
      __mod	对应的运算符 '%'.
      __unm	对应的运算符 '-'.
      __concat	对应的运算符 '..'.
      __eq	对应的运算符 '=='.
      __lt	对应的运算符 '<'.
      __le	对应的运算符 '<='.
     ]]
--[[ 
        注意： 
            对于二元操作符，如果第一个操作数有元表，并且元表中有所需要的字段定义，比如我们这里的__add元方法定义，那么Lua就以这个字段为元方法，而与第二个值无关；
            对于二元操作符，如果第一个操作数有元表，但是元表中没有所需要的字段定义，比如我们这里的__add元方法定义，那么Lua就去查找第二个操作数的元表；
            如果两个操作数都没有元表，或者都没有对应的元方法定义，Lua就引发一个错误。 
    ]] 

    __tostring = function(mytable)
        sum = 0
        for k, v in pairs(mytable) do
            sum = sum + v
        end
        return "表所有元素的和为 " .. sum
    end
})
secondTable = {4, 5, 6};
print('\n----------metatable function log start----------');
print(testTable)
testTable = testTable + secondTable;
for k, v in pairs(testTable) do
    print(k, v);
end
print('----------metatable function log end----------\n');
