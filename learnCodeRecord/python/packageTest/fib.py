


def fib0(n):    # 定义到 n 的斐波那契数列
    a, b, i = 0, 1, 0
    while i < n:
        print(b, end=' ')
        a, b = b, a+b
        i += 1
    print()


print('was imported')
if __name__ == '__main__':
    print('程序自身在运行')
else:
    print('我来自另一模块')
