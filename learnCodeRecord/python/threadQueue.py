
import queue
import threading
from time import sleep
import time

queueLock = threading.Lock()
workQueue = queue.Queue(10)
exitFlag = 0
threadList = ["Thread-1", "Thread-2", "Thread-3"]
nameList = ["One", "Two", "Three", "Four", "Five"]
threads = []
threadID = 0

class myThread (threading.Thread):
    def __init__(self, threadID, name,queue):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name
        self.queue = queue

    def run(self):
        print('开始线程 %s' % (self.name))
        prine_process_data(self.name,self.queue)
        print('结束线程 %s' % (self.name))


def prine_process_data(threadName,q):
    while not exitFlag:
        # 线程锁
        queueLock.acquire() 
        if not workQueue.empty():
            d = q.get()
            print('获取处理进程%s processing %s' % (threadName,d))
        queueLock.release()
        sleep(1)




# 创建新线程
for tName in threadList:
    thread = myThread(threadID, tName, workQueue)
    thread.start()
    threads.append(thread)
    threadID += 1

# 填充队列
queueLock.acquire()
for word in nameList:
    workQueue.put(word)
queueLock.release()

while not workQueue.empty():
    pass
exitFlag = 1
for t in threads:
    t.join()
print('退出主线程')
