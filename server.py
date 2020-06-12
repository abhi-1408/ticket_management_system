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
        return json.dumps({'logged_in':True,'user_id':data[0][0]})
    else:
        return json.dumps({'logged_in':False})
    


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
    desc=request.json['description']
    cur=mysql.connection.cursor()
    stmt="INSERT INTO data(description,ticket_id) VALUES(%s,%s)"
    data=(desc,ticket_id)
    cur.execute(stmt,data)
    mysql.connection.commit()
    cur.close()
    return json.dumps({"ticket_id":ticket_id})