import time
import pika
import sys


connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost'))

channel = connection.channel()
channel.exchange_declare(exchange='direct_logs', exchange_type='fanout')
queueRes = channel.queue_declare(exclusive=True)
queue_name = queueRes.method.name


routeKeys = sys.argv[1:] if sys.argv[1:] else ['info']

for routeKey in routeKeys:
    channel.queue_bind(exchange='direct_logs',routing_key=routeKey, queue=queue_name)


print('wait for received,exit to print ctrl+c')

def callback(ch,method,properties,body: bytes):
    print(" [x] Received %r %r" %(method.routing_key,body,))
    time.sleep(body.count('.'))
    print(" [x] Done")
    ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_consume(on_message_callback=callback,queue=queue_name)

channel.start_consuming()
