
-- 定义一个包
module = {}
-- 定义个常量
module.constant = '这是个常量'
-- 定义个函数
function module.func1()
  print('func1')
end



local function func2()
    print("这是一个私有函数！")
end
 
function module.func3()
    func2()
end


return module
