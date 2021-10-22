local t = {}
local m = {
    a = "and",
    b = "Li Lei",
    c = "Han Meimei"
}

setmetatable(t, {
    __index = m
}) -- 表{ __index=m }作为表t的元表

for k, v in pairs(t) do -- 穷举表t
    -- 此处不会有输出,元表的值，不会被pairs枚举到
    print("有值吗？")
    print(k, "=>", v)
end

print("-------------")
print(t.b, t.a, t.c)

local function add(t1, t2)
    -- ‘#’运算符取表长度
    assert(#t1 == #t2)
    local length = #t1
    for i = 1, length do
        t1[i] = t1[i] + t2[i]
    end
    return t1
end

local function reduce(t1, t2)
    -- ‘#’运算符取表长度
    assert(#t1 == #t2)
    local length = #t1
    -- 会改变t1
    for i = 1, length do
        t1[i] = t1[i] - t2[i]
    end
    return t1
end

-- setmetatable返回被设置的表
t1 = setmetatable({1, 2, 3}, {
    __add = add
})
t2 = setmetatable({10, 20, 30}, {
    __add = reduce
})

for k, v in pairs(t1) do
    print(k, "=>", v)
end

for k, v in pairs(t2) do
    print(k, "=>", v)
end

print("---------两元表相加--------------")
t1 = t1 + t2 -- 这样会触发t1的__add
-- t2 = t1 + t2 --这样会触发t2的__add
for i = 1, #t1 do
    print(t1[i])
end
for i = 1, #t2 do
    print(t2[i])
end

-- 基于原型的继承
local Robot = {
    name = "Sam",
    id = 001
}
function Robot:New(extension)
    local t = setmetatable(extension or {}, self)
    self.__index = self
    return t
end

function Robot:SetName(name)
    self.name = name
end

function Robot:GetName()
    return self.name
end

function Robot:SetId(id)
    self.id = id
end

function Robot:GetId()
    return self.id
end

robot = Robot:New()
print("robot's name:", robot:GetName())
print("robot's id:", robot:GetId())
print("-----------------")

local FootballRobot = Robot:New({
    position = "right back"
})
function FootballRobot:SetPosition(p)
    self.position = p
end

function FootballRobot:GetPosition()
    return self.position
end

fr = FootballRobot:New()
print("fr's position:", fr:GetPosition())
print("fr's name:", fr:GetName())
print("fr's id:", fr:GetId())
print("-----------------")

fr:SetName("Bob")
print("fr's name:", fr:GetName())
print("robot's name:", robot:GetName())

--[[ 

    输出结果:

    robot's name:Sam

    robot's id:1

    fr's position:right back

    fr's name:Sam

    fr's id:1

    fr's name:Bob

    robot's name:Sam
 ]]
