# from fib import fib0
# fib0(101)

# from fib import *
# fib0(101)

from packageTest import fib
# from packageTest.fib import fib0
# import packageTest.fib
# import 语法会首先把 item 当作一个包定义的名称，如果没找到，再试图按照一个模块去导入。如果还没找到，抛出一个 :exc:ImportError 异常。
# 反之，如果使用形如 import item.subitem.subsubitem 这种导入形式，除了最后一项，都必须是包，而最后一项则可以是模块或者是包，但是不可以是类，函数或者变量的名字。

print(dir(fib))
print(dir())
