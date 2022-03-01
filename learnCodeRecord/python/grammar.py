from sys import argv, path
import sys
import keyword
print(keyword.kwlist)

if True:
    print('true')
elif 1 == 2:
    print("won't happen")
else:
    print('false')
    print('eleee')


total = ['1',
         '2']
str = "this is a line with \n11"
# 输出
print(str[0:1])
# 等待用户输入
# input('\n\n按下退出键结束')


# for i in sys.argv:
#     print(i)
# print('路径是', sys.path)

for i in argv:
    print(i)
print('路径是', path)
