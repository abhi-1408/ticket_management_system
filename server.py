from flask import Flask 
from flask_mysqldb import MySQL 
import json
import jwt
from flask import request

app=Flask(__name__)
app.config['MYSQL_HOST']='localhost'
app.config['MYSQL_USER']='root'
app.config['MYSQL_PASSWORD']='rootpass'
app.config['MYSQL_DB']= 'TICKET_DB'

mysql=MySQL(app)

# for login
@app.route('/login',methods=['POST'])
def login_chk():
    username=request.json['username']
    password=request.json['password']
    
    cur=mysql.connection.cursor()
    stmt="select * from user where email=%s and password=%s;"
    credentials=(username,password)
    cur.execute(stmt,credentials)
    result=cur.fetchall()
    data=[]
    for row in result:
        data.append(row)

    # return 'true'
    if(len(data)!=0):
        payload={'logged_in':True,'user_id':data[0][0],"user_data":data}    
    else:
        payload={'logged_in':False}

    key='masai'
    encode_jwt=jwt.encode(payload,key)
    return json.dumps({'auth_token':encode_jwt.decode()})
    # return json.dumps()
    
@app.route('/authtoken',methods=['POST'])
def auth_token():
    token=request.json['auth_token']
    
    # return 'true'
    
    key='masai'
    decode_jwt=jwt.decode(token,key)
    return json.dumps(decode_jwt)
    # return json.dumps()

# for getting all the tickets
@app.route('/alltickets')
def all_tick():
    cur=mysql.connection.cursor()
    cur.execute('''SELECT * FROM ticket;''')
    result=cur.fetchall()
    data=[]
    for row in result:
        data.append(row)

    return {'all_ticket':data}



# for gettting all tickets created by a specific user
@app.route('/<user_id>/ticket')
def user_tick(user_id):
    cur=mysql.connection.cursor()
    cur.execute('''select * from user join ticket on user.user_id=ticket.user_id where user.user_id=%s;'''%user_id)
    result=cur.fetchall()
    data=[]
    for row in result:
        data.append(row)

    return {'user_tickets':data}



#if someone clicks on ticket then all comments of that ticket would be given
@app.route('/ticket/<ticket_id>')
def tick_det(ticket_id):
    cur=mysql.connection.cursor()
    cur.execute('''select * from ticket join data on ticket.ticket_id=data.ticket_id where ticket.ticket_id=%s;'''%ticket_id)
    result=cur.fetchall()
    data=[]
    for row in result:
        data.append(row)

    return {'ticket_detail':data}


@app.route('/addcmt/<ticket_id>',methods=['POST'])
def add_comment(ticket_id):
    description=request.json['description']
    comment_date=request.json['comment_date']
    commentby=request.json['commentby']
    cur=mysql.connection.cursor()
    stmt="INSERT INTO data(ticket_id,comment_date,commentby,description) VALUES(%s,%s,%s,%s)"
    data=(ticket_id,comment_date,commentby,description)
    cur.execute(stmt,data)
    mysql.connection.commit()
    cur.close()
    return json.dumps({"ticket_id":ticket_id})


@app.route('/addticket/<user_id>',methods=['POST'])
def add_new_ticket(user_id):
    subject=request.json['subject']
    resolved=request.json['resolved']
    priority=request.json['priority']
    user_id=request.json['user_id']
    creation_time=request.json['creation_time']
    cur=mysql.connection.cursor()
    stmt="INSERT INTO ticket(resolved,priority,user_id,creation_time,subject) VALUES(%s,%s,%s,%s,%s)"
    data=(resolved,priority,user_id,creation_time,subject)
    cur.execute(stmt,data)
    mysql.connection.commit()
    cur.close()


    # for getting the ticket_id of the newly created ticket
    cur1=mysql.connection.cursor()
    stmt1="SELECT * FROM ticket WHERE subject=%s;"
    cur1.execute(stmt1,[subject])
    result=cur1.fetchall()
    data1=[]
    for row in result:
        data1.append(row)

    cur1.close()


    description=request.json['description']
    cur2=mysql.connection.cursor()
    stmt="INSERT INTO data(ticket_id,comment_date,commentby,description) VALUES(%s,%s,%s,%s)"
    data=(data1[0][0],[creation_time],[user_id],[description])
    cur2.execute(stmt,data)
    mysql.connection.commit()
    cur2.close()


    return json.dumps({"user":user_id,"added_ticket_id":data1[0][0]})

