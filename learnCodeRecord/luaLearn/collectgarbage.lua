--[[ 
  collectgarbage("collect"): 做一次完整的垃圾收集循环。通过参数 opt 它提供了一组不同的功能：

  collectgarbage("count"): 以 K 字节数为单位返回 Lua 使用的总内存数。 这个值有小数部分，所以只需要乘上 1024 就能得到 Lua 使用的准确字节数（除非溢出）。

  collectgarbage("restart"): 重启垃圾收集器的自动运行。

  collectgarbage("setpause"): 将 arg 设为收集器的 间歇率 （参见 §2.5）。 返回 间歇率 的前一个值。

  collectgarbage("setstepmul"): 返回 步进倍率 的前一个值。

  collectgarbage("step"): 单步运行垃圾收集器。 步长"大小"由 arg 控制。 传入 0 时，收集器步进（不可分割的）一步。 传入非 0 值， 收集器收集相当于 Lua 分配这些多（K 字节）内存的工作。 如果收集器结束一个循环将返回 true 。

  collectgarbage("stop"): 停止垃圾收集器的运行。 在调用重启前，收集器只会因显式的调用运行。
-- ]] -- 
mytable = {"apple", "orange", "banana"};

print(collectgarbage("count"));

mytable = nil

print(collectgarbage("count"))

collectgarbage("collect")

print(collectgarbage("count"))

mytable = {"apple", "orange", "banana"};
print(collectgarbage("count"))
mytable = nil;
-- collectgarbage("collect")
collectgarbage("step", 24 * 1024)
print(collectgarbage("setpause", 200)) -- 把间歇率设为 200,每次 Lua 使用的内存翻倍时，做采集  返回 间歇率 的前一个值。
print(collectgarbage("setstepmul", 200)) -- 把 步进倍率 设为 200,Lua 收集器以内存分配的"两倍"速工作  返回 步进倍率 的前一个值。
-- collectgarbage("stop")
-- collectgarbage("restart")
print(collectgarbage("count"))
