from flask import Flask 
from flask_mysqldb import MySQL 
import json
import jwt
from flask import request
from flask_cors import CORS
# app = Flask(__name__)

app=Flask(__name__)
CORS(app) 
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

# adding more comment to a particular thread
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


# create a new ticket by a user
@app.route('/addticket/<user_id>',methods=['POST'])
def add_new_ticket(user_id):
    subject=request.json['subject']
    resolved=request.json['resolved']
    priority=request.json['priority']
    company_id=request.json['company_id']
    user_id=request.json['user_id']
    creation_time=request.json['creation_time']
    cur=mysql.connection.cursor()
    stmt="INSERT INTO ticket(resolved,priority,user_id,creation_time,subject,company_id) VALUES(%s,%s,%s,%s,%s,%s)"
    data=(resolved,priority,user_id,creation_time,subject,company_id)
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

# change status of ticket open/close
@app.route('/chgstatus/<ticket_id>',methods=['POST'])
def chg_status(ticket_id):

    resolved=request.json['resolved']
    cur=mysql.connection.cursor()
    stmt="UPDATE ticket SET resolved=%s WHERE ticket_id=%s"
    data=([resolved],[ticket_id])
    cur.execute(stmt,data)
    mysql.connection.commit()
    cur.close()
    return 'done'

# for signup
@app.route('/signup',methods=['POST'])
def signup():
    name=request.json['name']
    isAdmin=request.json['isAdmin']
    phone=request.json['phone']
    email=request.json['email']
    password=request.json['password']
    cur=mysql.connection.cursor()
    stmt="INSERT INTO user(name,isAdmin,phone,email,password) VALUES(%s,%s,%s,%s,%s)"
    data=(name,isAdmin,phone,email,password)
    cur.execute(stmt,data)
    mysql.connection.commit()
    cur.close()
    return json.dumps({'user_added':True})



@app.route('/chart/')
def chart():
    cur=mysql.connection.cursor()
    cur.execute('''select count(ticket_id),name from ticket right join company on ticket.company_id=company.company_id GROUP BY company.company_id;''')
    result=cur.fetchall()
    data=[]
    f_data=[]
    s_data=[]
    for row in result:
        f_data.append(row[0])
        s_data.append(row[1])

    data.append(f_data)
    data.append(s_data)

    # print('data changed to',data)

    cur.execute('''select count(*),DATE(creation_time) from ticket GROUP BY DATE(creation_time);
''')
    result1=cur.fetchall()
    data1=[]
    f_data1=[]
    s_data1=[]
    for row in result1:
        f_data1.append(row[0])
        s_data1.append(row[1])

    data1.append(f_data1)
    data1.append(s_data1)

    cur.execute('''select count(*),resolved from ticket group by resolved;''')
    result2=cur.fetchall()
    data2=[]
    f_data2=[]
    s_data2=[]
    for row in result2:
        f_data2.append(row[0])
        s_data2.append(row[1])

    data2.append(f_data2)
    data2.append(s_data2)


    cur.close()


    return {'ticket_respective_company':data,"ticket_by_date":data1,"tickets_status":data2}



# create new company
@app.route('/newcompany',methods=['POST'])
def new_comp():
    name=request.json['name']
    cur=mysql.connection.cursor()
    stmt="INSERT INTO company(name) VALUES(%s)"
    data=([name])
    cur.execute(stmt,data)
    mysql.connection.commit()
    cur.close()
    return json.dumps({'company added':True})


@app.route('/companylist',methods=['GET'])
def get_compy():
    
    cur=mysql.connection.cursor()
    cur.execute('''select distinct(name),company_id from company;''')
    result=cur.fetchall()
    data=[]
    for row in result:
        data.append(row)
    
    cur.close()
    return json.dumps({'company_list':data})




#     //for getting all company name
# select distinct(name) from company;


# //for visulixation need all tickets of respective companies
# select count(*),name from ticket join company on ticket.company_id=company.company_id GROUP BY company.company_id ;

# //for visualization need all tickets created in different dates
# select count(*),DATE(creation_time) from ticket GROUP BY DATE(creation_time);


# //all comment in one column with respective ticket_id
# select count(*),ticket.subject,GROUP_CONCAT(data.description) from ticket join data where ticket.ticket_id=data.ticket_id GROUP BY ticket.ticket_id;


# //for getting tickets resolved/unresolved
# select count(*),resolved from ticket group by resolved;