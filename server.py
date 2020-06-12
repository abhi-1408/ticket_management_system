from flask import Flask 
from flask_mysqldb import MySQL 
import json
from flask import request

app=Flask(__name__)
app.config['MYSQL_HOST']='localhost'
app.config['MYSQL_USER']='root'
app.config['MYSQL_PASSWORD']='rootpass'
app.config['MYSQL_DB']= 'ticktest'

mysql=MySQL(app)

@app.route('/login',methods=['POST'])
def login_chk():
    username=request.json['username']
    password=request.json['password']
    
    cur=mysql.connection.cursor()
    stmt="select * from user where email=%s and password=%s;"
    dd=(username,password)
    cur.execute(stmt,dd)
    result=cur.fetchall()
    data=[]
    for row in result:
        data.append(row)

    # return 'true'
    if(len(data)!=0):
        return json.dumps({'logged_in':True})
    else:
        return json.dumps({'logged_in':False})
    

@app.route('/alltickets')
def all_tick():
    cur=mysql.connection.cursor()
    cur.execute('''SELECT * FROM ticket;''')
    result=cur.fetchall()
    data=[]
    for row in result:
        data.append(row)

    return {'all_ticket':data}

@app.route('/<user_id>/ticket')
def user_tick(user_id):
    cur=mysql.connection.cursor()
    cur.execute('''select * from user join ticket on user.user_id=ticket.user_id where user.user_id=%s;'''%user_id)
    result=cur.fetchall()
    data=[]
    for row in result:
        data.append(row)

    return {'user '+str(user_id)+' all tickets':data}

@app.route('/ticket/<ticket_id>')
def tick_det(ticket_id):
    cur=mysql.connection.cursor()
    cur.execute('''select * from ticket join data on ticket.ticket_id=data.ticket_id where ticket.ticket_id=%s;'''%ticket_id)
    result=cur.fetchall()
    data=[]
    for row in result:
        data.append(row)

    return {'ticket detail':data}