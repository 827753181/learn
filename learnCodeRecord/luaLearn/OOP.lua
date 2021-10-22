-- 这是基础实现，更好的方法见learnNoteLow
-- Meta class
local Shape = {};
-- 基础类方法 new
function Shape:new(o, side)
    o = o or {};
    local tmp = {
        area = 0
    };
    setmetatable(o, tmp);
    self.__index = self;
    side = side or 0;
    -- 这里有个问题 其实派生类的side变更会同步到Shape上，其实可以把Shape的所有方法包到一个闭包里，每次创建新的Shape避开这个问题
    self.area = side * side;
    return o
end

-- 基础类方法 printArea
function Shape:printArea()
    print('基础类面积为', self.area)
end
myshape = Shape:new(nil, 10)
myshape:printArea()

-- 派生类
Square = Shape:new()
-- 派生类方法 new
function Square:new(o, side)
    o = o or Shape:new(o, side)
    setmetatable(o, self)
    self.__index = self
    return o
end

-- 派生类方法 printArea
function Square:printArea()
    print("正方形面积为 ", self.area)
end

mySqure = Square:new(nil, 100);
mySqure:printArea()

Rectangle = Shape:new()
-- 派生类方法 new
function Rectangle:new(o, length, breadth)
    o = o or Shape:new(o)
    setmetatable(o, self)
    self.__index = self
    self.area = length * breadth
    return o
end

-- 派生类方法 printArea
function Rectangle:printArea()
    print("矩形面积为 ", self.area)
end

-- 创建对象
myrectangle = Rectangle:new(nil, 10, 20)
myrectangle:printArea()
