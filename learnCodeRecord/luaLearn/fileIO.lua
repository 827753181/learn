--[[ 
  解释：
    这个函数会以参数mode所描述的方式代开文件filename并返回一个文件描述符，
    如果出错将会返回nil并且附带一个错误信息。
    不同的mode含义解释如下：
      "r":以只读方式打开文件，该文件必须存在，否则返回nil。（默认的打开方式）
      "w":以只写方式打开文件，若文件存在则清空文件内容，若文件不存在则建立该文件，从头开始写入。
      "a":以附加的方式打开只写文件。若文件不存在，则会建立该文件，如果文件存在，写入的数据会被加到文件尾，即文件原先的内容会被保留。
      "r+":以读写方式打开文件，该文件必须存在，读取时从文件头开始读，写入时从文件头开始写，保留原文件中没有被覆盖的内容；
      "w+":以读写方式打开文件，若文件存在则清空文件内容。若文件不存在则建立该文件，从头开始写入，读取文件时从头读取。
      "a+":以附加方式打开可读写的文件。若文件不存在，则会建立该文件，如果文件存在，写入的数据会被加到文件尾后，即文件原先的内容会被保留。
 ]] 

file = io.open('./fileIODemo/ioDemo.txt', "r");
io.input(file);
--[[ 
  模式	描述
  "*n"	读取一个数字并返回它。例：file.read("*n")
  "*a"	从当前位置读取整个文件。例：file.read("*a")
  "*l"（默认）	读取下一行，在文件尾 (EOF) 处返回 nil。例：file.read("*l")
  number	返回一个指定字符个数的字符串，或在 EOF 时返回 nil。例：file.read(5)
]]
local fileTxt = io.read('*a');
print(fileTxt);
io.close(file);

file = io.open('./fileIODemo/ioDemo.txt', "a");
io.output(file);
-- io.write('\n最后一行');
print(io.type(file))
-- io.flush('./ioDemo.txt');  -- 向文件写入缓冲中的所有数据
io.close();
print(io.type(file))

for k, v in io.lines('./fileIODemo/ioDemo.txt') do
    print(k, v);
end
--[[ 
  io.tmpfile(file name):返回一个临时文件句柄，该文件以更新模式打开，程序结束时自动删除
  io.type(file): 检测obj是否一个可用的文件句柄
  io.flush(file name): 向文件写入缓冲中的所有数据
  io.lines(optional file name): 返回一个迭代函数,每次调用将获得文件中的一行内容,当到文件尾时，将返回nil,但不关闭文件
]]

-- 完全模式,在同一时间处理多个文件,我们需要使用 file:function_name 来代替 io.function_name 方法
-- 以只读方式打开文件
file2 = io.open("./fileIODemo/testFile.lua", "r")
-- 输出文件第一行
print('第一行', file2:read())
file2:seek("end", -3)
print('seek read', file2:read("*a"))

-- 关闭打开的文件
file2:close()
-- 以附加的方式打开只写文件
file2 = io.open("./fileIODemo/testFile.lua", "a")
-- 在文件最后一行添加 Lua 注释
file2:write("\n--test")
-- 关闭打开的文件
file2:close()
