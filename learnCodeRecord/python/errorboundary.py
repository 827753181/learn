idx = 0

while idx <= 2:
    try:
        x = int(input('请输入一个数字'))
        break
    except ValueError:
        print('您输入的不是数字，请再次尝试输入！')
    # 一个except子句可以同时处理多个异常，这些异常将被放在一个括号里成为一个元组，例如：
    except (RuntimeError, TypeError, NameError):
        pass
    # 最后一个except子句可以忽略异常的名称，它将被当作通配符使用。你可以使用这种方法打印一个错误信息，然后再次把异常抛出。
    # except:
    #     print("Unexpected error:", sys.exc_info()[0])
    else:
        print('没有发生异常')
    finally:
        print('这句话，无论异常是否发生都会执行。')


def this_fails():
    x = 10
    if x > 5:
        # raise [Exception [, args [, traceback]]]
        raise Exception('x 不能大于 5。x 的值为: {}'.format(x))


try:
    this_fails()
except Exception as err:
    print('handleError', err)


# 用户自定义异常

class MyError(Exception):
    def __init__(self, value):
        self.value = value

    def __str__(self) -> str:
        return repr(self.value)


try:
    raise MyError('test')
except MyError as err:
    print('My exception occurred, value:', err.value)

