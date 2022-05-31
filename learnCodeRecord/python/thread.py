import _thread
import threading
from time import sleep
import time


def print_time(threadName, delay, counter):
    count = 0
    while count < counter:
        sleep(delay)
        count += 1
        print('name is %s,time is %s' % (threadName, time.ctime(time.time())))

# try:
#     _thread.start_new_thread(print_time, ('test', 1, 5))
#     _thread.start_new_thread(print_time, ('test2', 2, 5))
# except:
#     print('无法启动线程')
# try:
#     while 1:
#         pass
# except KeyboardInterrupt:
#     print('手动退出')


threadLock = threading.Lock()

class myThread (threading.Thread):
    def __init__(self, threadID, name, delay):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name
        self.delay = delay

    def run(self):
        print('开始线程 %s' % (self.name))
        # 线程锁
        threadLock.acquire()
        print_time(self.name, self.delay, 5)
        threadLock.release()
        print('结束线程 %s' % (self.name))

threads = []

testMyThread1 = myThread(123, '测试进程1', 0.5)
testMyThread2 = myThread(123, '测试进程2', 1)


threads.append(testMyThread1)
threads.append(testMyThread2)

for t in threads:
    t.start()
for t in threads:
    t.join()
print("退出主线程")