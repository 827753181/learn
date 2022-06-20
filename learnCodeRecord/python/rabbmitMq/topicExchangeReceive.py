# 主题交换机
# 主题交换机是很强大的，它可以表现出跟其他交换机类似的行为

# 当一个队列的绑定键为 "#"（井号） 的时候，这个队列将会无视消息的路由键，接收所有的消息。

# 当 * (星号) 和 # (井号) 这两个特殊字符都未在绑定键中出现的时候，此时主题交换机就拥有的直连交换机的行为。
import time
import pika
import sys


connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost'))

channel = connection.channel()
channel.exchange_declare(exchange='topic_logs', exchange_type='topic')
queueRes = channel.queue_declare(exclusive=True)
queue_name = queueRes.method.name


routeKeys = sys.argv[1:] if sys.argv[1:] else ['anonymous.info']

for routeKey in routeKeys:
    channel.queue_bind(exchange='topic_logs',routing_key=routeKey, queue=queue_name)


print('wait for received,exit to print ctrl+c')

def callback(ch,method,properties,body: bytes):
    print(" [x] Received %r %r" %(method.routing_key,body,))
    time.sleep(body.count('.'))
    print(" [x] Done")
    ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_consume(on_message_callback=callback,queue=queue_name)

channel.start_consuming()
