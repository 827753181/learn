local myarray = function(arr)
    local index = 1;
    return function()
        local item = arr[index];
        index = index + 1;
        return item, index;
    end
end

function foreach(arr)
    for k, v in myarray(arr) do
        print('key是' .. k, 'value是' .. v);
    end
end
foreach({1, 2, 3, 4})

local productor = function()
    return coroutine.create(function(salt)
        local t = {1, 2, 3}
        for i = 1, #t do
            salt = coroutine.yield(t[i] + salt);
            print('inner productor input：' .. salt);
        end
    end)
end

local resumer = function(pro)
    local salt = 10
    while (true) do
        -- resume return 的值，函数执行完还会有一次running为true，第二个参数会是nil
        local running, product = coroutine.resume(pro, salt);
        salt = salt * salt;
        if running then
            print('running', 'result is：' .. (product or 'end'))
        else
            break
        end
    end
end

resumer(productor())

co3 = coroutine.create(function()
end)

print(coroutine.resume(co3));
print(coroutine.resume(co3));
