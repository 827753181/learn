import socket


s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)

host = socket.gethostname()
port = 9999
s.bind((host,port))

# 设置最大连接数，超过后排队
s.listen(5)

while True: 
    clientsocket,addr = s.accept()
    msg='欢迎访问菜鸟教程！'+ "\r\n"
    print("连接地址: %s" % str(addr))
    clientsocket.send(msg.encode('utf-8'))
    clientsocket.close()
    s.close()