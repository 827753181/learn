"""
  Python3 中有六个标准的数据类型：

  Number（数字）
  String（字符串）
  List（列表）
  Tuple（元组）
  Set（集合）
  Dictionary（字典）
  Python3 的六个标准数据类型中：

  不可变数据（3 个）：Number（数字）、String（字符串）、Tuple（元组）；
  可变数据（3 个）：List（列表）、Dictionary（字典）、Set（集合）。
"""


counter, floatnumber, str = 1, 1.0, 'zifuchuan'

# number
num = 1
num2 = 2
isinstance(num, int)
# isinstance和type函数的区别是，isinstance会认为子类是一种父类类型，type不会如此认为
print(num/num2, num//num2)

# list
lista = [1, 2, 3, 4]


def reverseWord(str):
    reverstr = str.split(' ')[-1::-1]
    output = ' '.join(reverstr)
    return output


if True:
    input = 'I like runoob'
    rw = reverseWord(input)
    print(rw)

# tuple
tum = (1, '2', 3)
print(tum[1], tum[1::1])


# set
sites = {'set1', 'set1', 'set2', 'set3'}
print(sites)

a = set('abcdefg')
b = set('abcdwwwwqerasdwe')
print(a, a-b, a & b, a | b, a ^ b)


# dictory
dicts = {}
dicts['a'] = [1, 2, 3]
dicts['b'] = set('ab')
tinydict = {'name': 'runoob', 'code': 1, 'site': 'www.runoob.com'}
print(dicts['a'], dicts['b'])
print(tinydict, tinydict.keys(), tinydict.values())

names = ['Bob', 'Tom', 'alice', 'Jerry', 'Wendy', 'Smith']
a = [name.upper() for name in names]
c = {x for x in 'abcdef' if x not in 'abc'}
b = {y: y for y in dicts if y != 'b'}
d = (z for z in tum)
print(a, b, c, d)


a = 'HELLO'
b = 'WORLD'

print(a+b, a*2,  a[1], a[1:4])

if("H" in a):
    print('H in HELLO')
else:
    print('H not in HELLO')
def printInfo(x,y):
    return x+y

if("A" not in a):
    print('A not in HELLO')
else:
    print('A in HELLO')

print('\n', r'\n', R'\n', )

print('%c %s hahah %d' % (123 or 'a', 'asdasd', 123123))

""" 
    %c	 格式化字符及其ASCII码
    %s	 格式化字符串
    %d	 格式化整数
    %u	 格式化无符号整型
    %o	 格式化无符号八进制数
    %x	 格式化无符号十六进制数
    %X	 格式化无符号十六进制数（大写）
    %f	 格式化浮点数字，可指定小数点后的精度
    %e	 用科学计数法格式化浮点数
    %E	 作用同%e，用科学计数法格式化浮点数
    %g	 %f和%e的简写
    %G	 %f 和 %E 的简写
    %p	 用十六进制数格式化变量的地址
"""
