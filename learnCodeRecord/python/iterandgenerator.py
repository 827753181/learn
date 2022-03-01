#!/usr/bin/python3
import sys


list = [1, 2, 3, 4]
it = iter(list)
# print(next(it))
# print(next(it))

for item in it:
    print(item)


# list2 = [4, 3, 2, 1]
# it2 = iter(list2)
# while True:
#     try:
#         print(next(it2))
#     except StopIteration:
#         sys.exit()


class Test:
    def __iter__(self):
        self.a = 1
        return self

    def __next__(self):
        x = self.a
        self.a += 1
        if x > 20:
            raise StopIteration
        else:
            return x


test = Test()
itT = iter(test)
for x in itT:
    print(x)


def fibonaric(n):
    a, b, counter = 0, 1, 0
    while True:
        if counter > n:
            return
        counter += 1
        a, b = b, a+b
        x = yield a
        print('xis:', x)


f = fibonaric(10)  # f 是一个迭代器，由生成器返回生成

while True:
    try:
        print(next(f), end='')
    except StopIteration:
        sys.exit()
