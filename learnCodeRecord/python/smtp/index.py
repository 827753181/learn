from email.header import Header
from email.mime.text import MIMEText
import smtplib

message = MIMEText('test email body','plain','utf-8')
message['From'] = '827753181@qq.com'
message['To'] = '8277531821@qq.com'

message['Subject'] = Header('代码测试邮件','utf-8')
smtplib.SMTP()


sender = '827753181@qq.com'
receiver = ['f827753181@163.com']

try:
    smtpObj = smtplib.SMTP('localhost',25)
    smtpObj.sendmail(sender,receiver,message.as_string())
    smtpObj.quit()
    print('邮件发送成功')
except smtplib.SMTPResponseException as err:
    print("Error: 无法发送邮件",err)
