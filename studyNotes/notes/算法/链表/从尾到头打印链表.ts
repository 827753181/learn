// #题目
// 输入一个链表，按链表值从尾到头的顺序返回一个ArrayList。

// #分析
// 要了解链表的数据结构：

// val属性存储当前的值，next属性存储下一个节点的引用。

// 要遍历链表就是不断找到当前节点的next节点，当next节点是null时，说明是最后一个节点，停止遍历。

// 因为是从尾到头的顺序，使用一个队列来存储打印结果，每次从队列头部插入。
function printListFromTailToHead(head) {
    const arr = []
    while(head){
        arr.unshift(head.val)
        head = head.next;
    }
    return head;
}
