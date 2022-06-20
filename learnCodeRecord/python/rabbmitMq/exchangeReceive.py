import time
import pika
import sys


connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost'))
channel = connection.channel()
channel.exchange_declare(exchange='logs', exchange_type='fanout')
queueRes = channel.queue_declare(exclusive=True)
queue_name = queueRes.method.name
channel.queue_bind(exchange='logs', queue=queue_name)
print('wait for received,exit to print ctrl+c')
def callback(ch,method,properties,body: bytes):
    print(" [x] Received %r" %(body,))
    time.sleep(body.count('.'))
    print(" [x] Done")
    ch.basic_ack(delivery_tag=method.delivery_tag)
channel.basic_consume(on_message_callback=callback,queue=queue_name)

channel.start_consuming()
