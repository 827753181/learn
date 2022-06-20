import uuid
import pika

# （7）建立连接、通道并且为回复（replies）声明独享的回调队列。
# （16）我们订阅这个回调队列，以便接收RPC的响应。
# （18）“on_response”回调函数对每一个响应执行一个非常简单的操作，检查每一个响应消息的correlation_id属性是否与我们期待的一致，如果一致，将响应结果赋给self.response，然后跳出consuming循环。
# （23）接下来，我们定义我们的主要方法 call 方法。它执行真正的RPC请求。
# （24）在这个方法中，首先我们生成一个唯一的 correlation_id 值并且保存起来，'on_response'回调函数会用它来获取符合要求的响应。
# （25）接下来，我们将带有 reply_to 和 correlation_id 属性的消息发布出去。
# （32）现在我们可以坐下来，等待正确的响应到来。
# （33）最后，我们将响应返回给用户。


class FibonacciRpcClient(object):
    def __init__(self) -> None:

        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host='localhost'))
        self.channel = self.connection.channel()
        queueRes = self.channel.queue_declare(exclusive=True)
        self.callback_queue = queueRes.method.queue
        self.channel.basic_consume(
            on_message_callback=self.on_response, queue=self.callback_queue)

    def on_response(self, ch, method, props, body):
        if self.corr_id == props.correlation_id:
            self.response = body

    def call(self, n):

        self.corr_id = uuid()
        self.response = None
        self.channel.basic_publish(
            exchange='',
            routing_key='rpc_queue',
            properties=pika.ConnectionParameters(
                reply_to=self.callback_queue,
                correlation_id=self.corr_id,
            ),
            body=str(n)
        )

        while self.response == None:
            self.channel._process_data_events()
        return str(self.response)


fibclient = FibonacciRpcClient()
print(" [x] Requesting fib(30)")

response = fibclient.call(30)
print(" [.] Got %r" % (response,))
