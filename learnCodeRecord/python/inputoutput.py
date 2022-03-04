print('{}网址： "{}!"'.format('菜鸟教程', 'www.runoob.com'))

print('{1} 和 {0}'.format('Google', 'Runoob'))

print('{name}网址： {site}'.format(name='菜鸟教程', site='www.runoob.com'))

table = {'Google': 1, 'Runoob': 2, 'Taobao': 3}
for name, number in table.items():
    print('{0:10} ==> {1:10d}'.format(name, number))

table = {'Google': 1, 'Runoob': 2, 'Taobao': 3}
# print('Runoob: {0[Runoob]:d}; Google: {0[Google]:d}; Taobao: {0[Taobao]:d}'.format(table))
print(
    'Runoob: {Runoob:d}; Google: {Google:d}; Taobao: {Taobao:d}'.format(**table))


f = open('./inputoutput.txt', 'w')
f.write('hello world!\nnextLine\nthirdLine\n')
f.close()


f = open('./inputoutput.txt', 'r')
# str = f.read()
# print('文件内容是 {0}'.format(str))
# str = f.readline()


# while(str):
#     print('文件该行内容是 {0}'.format(str), end='')
#     str = f.readline()


# str = f.readlines()
# print('文件所有行内容是 {0}'.format(str), end='')


for line in f:
    print(line, end='')
# print(f.tell()) #开头开始算起的字节数。

# f.seek(1) 
# f.seek(-3, 2) # 移动到文件的倒数第三字节
# 如果要改变文件当前的位置, 可以使用 f.seek(offset, from_what) 函数。 
# from_what 的值, 如果是 0 表示开头, 如果是 1 表示当前位置, 2 表示文件的结尾，例如：
# for line in f:
#     print(line, end='')

f.close()
