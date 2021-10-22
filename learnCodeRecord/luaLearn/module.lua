-- 定义一个包
local resss = {}
-- 定义个常量
resss.constant = '这是个常量'
-- 定义个函数
function resss.func1()
    print('func1')
end

local function func2()
    print("这是一个私有函数！")
end

function resss.func3()
    func2()
end
function func4()
    print('func4')
end

return resss
