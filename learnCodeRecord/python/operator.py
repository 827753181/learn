
# and 返回最先一个为假，如果没有，返回最后一个为真的值
print('start and',
      0 and 20
      )
print(
    10 and 0
)
print(
    10 and 20
)

# or 返回最先一个为真，如果没有，返回最后一个为假的值
print('start or',
      0 or 20
      )
print(
    10 or 0
)
print(
    10 or 20
)
print(
    0 or 0
)


# in	如果在指定的序列中找到值返回 True，否则返回 False。	x 在 y 序列中 , 如果 x 在 y 序列中返回 True。
# not in	如果在指定的序列中没有找到值返回 True，否则返回 False。
a = 10
b = 1
list = [1, 2, 3, 4, 5]

if (a in list):
    print("1 - 变量 a 在给定的列表中 list 中")
else:
    print("1 - 变量 a 不在给定的列表中 list 中")

if (b not in list):
    print("2 - 变量 b 不在给定的列表中 list 中")
else:
    print("2 - 变量 b 在给定的列表中 list 中")

# is	 判断两个标识符是不是引用自一个对象	x is y, 类似 id(x) == id(y) , 如果引用的是同一个对象则返回 True，否则返回 False
a, b = 20, 20
if(a is b):
    print('a is b,true!')
else:
    print('a is b,false!')
b = 0
if(a is b):
    print('a is b,true!')
else:
    print('a is b,false!')

# is 与 == 区别：
# is 用于判断两个变量引用对象是否为同一个， == 用于判断引用变量的值是否相等。
a = [1, 2, 3]
b = a
if(a is b):
    print('list a is list b,true!')
else:
    print('list a is list b,false!')
b = a[:]
if(a is b):
    print('list a is list b,true!')
else:
    print('list a is list b,false!')

# is not 判断两个标识符是不是引用自不同对象	x is not y ， 类似 id(x) != id(y)。如果引用的不是同一个对象则返回结果 True，否则返回 False。
a, b = 20, 20
if(a is not b):
    print('a is not b,true!')
else:
    print('a is not b,false!')
b = 0
if(a is not b):
    print('a is not b,true!')
else:
    print('a is not b,false!')
