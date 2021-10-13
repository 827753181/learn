#!/usr/local/bin/lua

print('test')

-- 111
-- 
--[[ 12312213
1231232 ]]

print(X == nil)

local site = {"2"};
site["table"] = 3;
local aaa = {
    ['a'] = 2
};
aaa[site] = 4;

print(aaa[site], aaa['a']);

-- if( 布尔表达式 1)
-- then
--    --[ 布尔表达式 1 为 true 时执行该语句块 --]
--    if(布尔表达式 2)
--    then
--       --[ 布尔表达式 2 为 true 时执行该语句块 --]
--    end
-- else 
--     print('')
-- end
function testIf(...)
    if (true and false) then
        print('not haapend');
    elseif (not (true or false)) then
        print('not append');
    elseif (true or false) then
        print('happend');
    end
    while (aaa[site] < 10) do
        if (0) then
            print("0 为真", aaa[site])
        else
            print('为否', aaa[site])
        end
        aaa[site] = aaa[site] + 1;
    end
    print("参数长度为", #{...})
    return 1, 2, ...;
end

local c, d, e, f = testIf(3, 4, 5);
print(c, d, e, f);

for i = 1, 10 do
    print(i)
end

function throwError(txt)
    error(txt or 'test error')
end

local hasError, errorInfo = pcall(throwError, 'replace error text');
print(hasError, errorInfo)
hasError = xpcall(throwError, function(err)
    print("error happend ERROR:", err)
end, 'replace error');
print(hasError)
