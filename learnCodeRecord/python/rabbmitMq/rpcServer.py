import pika
import sys
# （4）像往常一样，我们建立连接，声明队列
# （11）我们声明我们的fibonacci函数，它假设只有合法的正整数当作输入。（别指望这个函数能处理很大的数值，函数递归你们都懂得...）
# （19）我们为 basic_consume 声明了一个回调函数，这是RPC服务器端的核心。它执行实际的操作并且作出响应。
# （32）或许我们希望能在服务器上多开几个线程。为了能将负载平均地分摊到多个服务器，我们需要将 prefetch_count 设置好。
connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost'))

channel = connection.channel()
queue_name = 'rpc_queue'
queueRes = channel.queue_declare(exclusive=True, queue=queue_name)


def fib(n):
    return n if n <= 1 else fib(n-1)+fib(n-2)


def on_request(ch, method, properties, body: bytes):
    n = int(body)

    print(" [.] fib(%s)" % (n,))
    response = fib(n)

    ch.basic_publish(exchange='',
                     routing_key=properties.reply_to,
                     properties=pika.BasicProperties(
                         correlation_id=properties.correlation_id
                     ),
                     body=str(response))
    ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_qos(prefetch_count=1)
channel.basic_consume(on_message_callback=on_request, queue=queue_name)

channel.start_consuming()
