import time
import pika
import sys

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

channel.queue_declare(queue='test', durable=True)

channel.basic_qos(prefetch_count=1)
def callback(ch,method,properties,body: bytes):
    print(" [x] Received %r" %(body,))
    time.sleep(body.count('.'))
    print(" [x] Done")
    ch.basic_ack(delivery_tag=method.delivery_tag)
channel.basic_consume(on_message_callback=callback,queue='test')
channel.start_consuming()
