# import mysql.connector
import pymysql

mydb = pymysql.connect(
    host="localhost",
    user="root",
    passwd="asd456789",
    database="flb_test_db"
)
# 事务应该具有4个属性：原子性、一致性、隔离性、持久性。这四个属性通常称为ACID特性。

# 原子性（atomicity）。一个事务是一个不可分割的工作单位，事务中包括的诸操作要么都做，要么都不做。
# 一致性（consistency）。事务必须是使数据库从一个一致性状态变到另一个一致性状态。一致性与原子性是密切相关的。
# 隔离性（isolation）。一个事务的执行不能被其他事务干扰。即一个事务内部的操作及使用的数据对并发的其他事务是隔离的，并发执行的各个事务之间不能互相干扰。
# 持久性（durability）。持续性也称永久性（permanence），指一个事务一旦提交，它对数据库中数据的改变就应该是永久性的。接下来的其他操作或故障不应该对其有任何影响。

try: 
    mycursor = mydb.cursor()

    tableName = 'sites_log'

    # mycursor.execute(f"CREATE TABLE {tableName} (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255),url VARCHAR(255))")
    # mycursor.execute(f"ALTER TABLE {tableName} ADD  id_add INT ")

    # mycursor.execute("SELECT * FROM sites")
    # sizesInfo = mycursor.fetchone()
    # print(sizesInfo)


    mycursor.execute(f"SELECT * FROM {tableName}")
    lastTuple = (0,)
    for x in mycursor:
        lastTuple=x

    # sql = f"INSERT INTO {tableName} (name, url) VALUES (%s, %s)"
    # val = ('flb'+str(lastTuple[0]+1),'test'+str(lastTuple[0]+1))
    # mycursor.execute(sql,val)
    # mydb.commit()

    # sql = f"DELETE FROM {tableName} WHERE name like %s AND url like %s AND id>0"
    # val = ('flb%','test%')
    # mycursor.execute(sql,val)
    # sql = f"DELETE FROM {tableName} WHERE name like %s AND url like %s AND id>0"
    # val = [('flb3','test3'),('flb67','test67')]
    # mycursor.executemany(sql,val)
    # sql = f"INSERT INTO {tableName} (info,site_id) VALUES (%s,%s)"
    # val = [('flb'+str(lastTuple[0]+i+1) ,1) for i in range(4)]
    # mycursor.executemany(sql,val)

    mydb.commit()
    print(mycursor.rowcount,mycursor.lastrowid)
except: 
    mydb.rollback()