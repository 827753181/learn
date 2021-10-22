local co = coroutine.create(function(i)
    print('coroutine create', i);
end);
coroutine.resume(co, 1) -- 1
print(coroutine.status(co)) -- dead
print("----------")

local co2 = coroutine.wrap(function(i)
    print('coroutine wrap', i);
end)
co2(2)

print('\n----------coroutine base demo log start----------');

-- 不能用local,不然闭包内读不到
co3 = coroutine.create(function()
    for i = 1, 10 do
        print(i)
        if i == 3 then
            print(coroutine.status(co3)) -- running
            print(coroutine.running()) -- thread:XXXXXX
        end
        coroutine.yield()
    end
end)
coroutine.resume(co3);
coroutine.resume(co3);
coroutine.resume(co3);
print(coroutine.status(co3)); -- suspended
print(coroutine.running()) -- nil

print('----------coroutine base demo log end----------\n');

print('\n----------coroutine resume demo log start----------');
function foo(a)
    print("foo函数输入", a)
    return coroutine.yield(2 * a)
end
co4 = coroutine.create(function(a, b)
    print("第一次协同程序执行输入", a, b);
    local r = foo(a + 1);
    print("第二次协同程序执行输入", r);
    local r, s = coroutine.yield(a + b, a - b); -- a，b的值为第一次调用协同程序时传入
    print("第三次协同程序执行输入", r, s)
    return b, "结束协同程序" -- b的值为第二次调用协同程序时传入
end)

-- resume操作成功返回true，否则返回false；
print("main", coroutine.resume(co4, 1, 10)) -- true, 4
print("main", coroutine.resume(co4, "r")) -- true 11 -9
print("main", coroutine.resume(co4, "x", "y")) -- true 10 end
print("main", coroutine.resume(co4, "x", "y")) -- cannot resume dead coroutine
print('----------coroutine resume demo log end----------\n');

print('\n----------生产者-消费者问题 start----------');

function productor(max)
    local i = 0
    while i <= max do
        i = i + 1
        send(i) -- 将生产的物品发送给消费者
    end
end
function consumer(corFn)
    local i = 0;
    while (i ~= nil) do
        i = receive(corFn);
        print(i);
    end
end
function send(val)
    coroutine.yield(val);
end
function receive(corFn)
    local status, val = coroutine.resume(corFn);
    if (status == true) then
        return val;
    else
        return nil;
    end
end

newProductor = coroutine.create(productor)
coroutine.resume(newProductor, 10);
consumer(newProductor);

print('----------生产者-消费者问题 end----------\n');

