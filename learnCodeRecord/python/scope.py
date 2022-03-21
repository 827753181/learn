
import datetime
import time


num = 1

print(num)
b = 2
print('b', b)


def fun1():
    num = 123
    global b
    b = 123
    print(num)
    print('b', b)

    def inner():
        num = 100   # nonlocal关键字声明
        print(num)
    inner()
    print(num)


fun1()
print('b', b)
print(num)