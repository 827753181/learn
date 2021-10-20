-- 一种简单的对象实现方式 
function create(name, id)
    local obj = {
        name = name,
        id = id
    };
    function obj:setId(id)
        self.id = id;
    end
    function obj:getId()
        return self.id
    end
    function obj:setName(name)
        self.name = name;
    end
    function obj:getName()
        return self.name
    end
    return obj;
end

--[[ 
      ① tab.func = function()
          -- body
      end
      ② function tab.func()
          -- body
      end
      ③ function tab:func()
          -- body
      end

      定义方式：
      其中，①②两种定义方式与非表元素的函数的定义一样。方式③采用‘：’来定义，实际上隐藏了一个形参的声明，这个形参会截获调用函数时的第一个实参并把它赋值给self。
        
      调用方式：
            ①tab.func(参数)
            ②tab:func(参数)
      其中，①调用方式与非表元素的函数的调用一样。方式②采用‘：’来调用函数，实际上隐式的把tab自己当作第一个实参传递，即tab:func(参数)相当于 tab.func(tab,参数) 。
]]
local myCreate = create('sam', 001);
for k, v in pairs(myCreate) do
    print(k, "=>", v);
end
print("myCreate's name:", myCreate:getName(), "myCreate's id: ", myCreate.getId(myCreate));

myCreate:setId(100);
myCreate:setName('hello kity');
print("myCreate's name:", myCreate:getName(), "myCreate's id: ", myCreate.getId(myCreate));

-- obj:method(a1, a2, ...)  == obj.method(obj, a1, a2, ...) 
-- function obj:method(a1, a2, ...) ... end  == function obj.method(self, a1, a2, ...) ... end == obj.method = function (self, a1, a2, ...) ... end

local function createRoot(name, id)
    local obj = {
        name = name,
        id = id
    }
    function obj:setName(name)
        self.name = name
    end

    function obj:getName()
        return self.name
    end

    function obj:setId(id)
        self.id = id
    end

    function obj:getId()
        return self.id
    end
    return obj
end
local function createFootballRobot(name, id, position)
    local obj = createRoot(name, id);
    obj.position = "right back"
    function obj:setPosition(p)
        self.position = p
    end

    function obj:getPosition()
        return self.position
    end

    return obj
end
local myCreateFootballRobot = createFootballRobot('Tom', 100, '广州');
print("mycreateFootballRobot's name:", myCreateFootballRobot:getName(), "myCreate's id:", myCreateFootballRobot:getId(),
    myCreateFootballRobot:getPosition())

myCreateFootballRobot:setName("麦迪")
myCreateFootballRobot:setId(2000)
myCreateFootballRobot:setPosition("北京")
print("mycreateFootballRobot's name:", myCreateFootballRobot:getName(), "myCreate's id:", myCreateFootballRobot:getId(),
    myCreateFootballRobot:getPosition())
