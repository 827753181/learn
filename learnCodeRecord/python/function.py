

def test(age, name):
    print("age is", age)
    print("name is", name)
    return


test(name='111', age='222')

abc = 'outside'


def longnotSet(age, name, *args):
    print(age, name, args, abc)


longnotSet(11, 'test', 2, 3, 4, 5, 1, 23, 123, 123)


def printInfo(age, name, **args):
    print(age, name, args)


printInfo(name='test', age=11, a=2, b=3, c=4, d=5, e=1, f=23, g=123, h=123)
# lambda [arg1 [,arg2,.....argn]]:expression

lambdaFun = lambda arg1, arg2, *args: print(arg1*arg2, *args)
lambdaFun(1, 2, 3, 4, 5, 12, 34,)

