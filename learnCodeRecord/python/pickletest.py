import pickle
import pprint


# f = open('./pickletest.txt', 'wb')
# data1 = {
#     "a": [1, 2, 3, 4+5j],
#     "b": ('string', u'unicode string'),
#     "c": None
# }

# data2 = [1, 2, 3]
# data2.append(data2)
# pickle.dump(data1, f)
# pickle.dump(data2, f, -1)
# f.close()




f = open('./pickletest.txt', 'rb')

data1 = print(pickle.load(f))
pprint.pprint(data1)

data2 = pickle.load(f)
pprint.pprint(data2)
f.close()
