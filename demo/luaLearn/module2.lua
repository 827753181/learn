local modu = require "./module"

-- module  function
print('\n----------module function log start----------');
print(func4())
assert(resss, '这里会报错，因为resss是local的')
-- require "./module"后，定义的全局变量都会通到这里

modu.func3()
modu.func1()
print('----------module function log start----------\n');

fn = function(a)
    print(a);
    return a .. '1'
end;
load(fn)

print(fn(2));
print(fn(2));

function dump(t, i)
    local tab = "	" -- 这里需要一个变量
    if not i then
        i = 0
    end
    local indent = ""
    for j = 1, i do
        indent = indent .. tab
    end
    for k, v in next, t do
        -- 如果 v 还是个table的话就继续遍历
        if type(v) == "table" then
            print(indent .. k .. " = { ")
            dump(v, i + 1)
            print(indent .. "}")
        else
            print(indent .. k .. "=" .. v)
        end
    end
end
dump({
    a = 1,
    b = 2,
    c = {
        d = 4
    },
    2,
    1,
    1
})
