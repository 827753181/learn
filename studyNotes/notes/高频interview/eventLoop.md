
## 哪些是宏任务
  宏任务（node，浏览器）
  - 整体代码script（所以主线程其实也可以算做宏任务）
  - setTimeout
  - setInterval
  - I/O
   
## 哪些是微人物
  微任务（js引擎）
  - nextTicket 
  - callback 
  - Promise 
  - process.nextTick
  - Object.observer
  - MutationObserver

## js的执行流程  

1. 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入Event Table并注册函数
2. 当指定的事情完成时，Event Table会将这个函数移入Event Queue。
3. 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行。
4. 上述过程会不断重复，也就是常说的Event Loop(事件循环)。  

那么主线程内的任务执行为空的判定？  
在js引擎中，存在一个叫monitoring process的进程，这个进程会不断的检查主线程的执行情况，一旦为空，就会去Event Quene检查有哪些待执行的函数。  

![eventLoop__2021-09-23-13-32-25](/studyNotes/attachments/eventLoop__2021-09-23-13-32-25.png)

## 微任务 和 宏任务的执行分析
主线程 => 微任务 => 宏任务 => 主线程 （所以先微任务，再宏任务）
![eventLoop__2021-09-23-13-35-24](/studyNotes//attachments/eventLoop__2021-09-23-13-35-24.png)

> js异步有一个机制，就是遇到宏任务，先执行宏任务，将宏任务放入eventqueue，然后在执行微任务，将微任务放入eventqueue  
最骚的是，这两个queue不是一个queue。  
当你往外拿的时候先从微任务里拿这个回调函数，然后再从宏任务的queue上拿宏任务的回调函数。 