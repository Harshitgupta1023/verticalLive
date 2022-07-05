import sys
import os
from urllib.parse import urlparse
import psycopg2

# Connecting to database
try:
    result = urlparse(os.getenv("DATABASE_URL"))
    connection = psycopg2.connect(
        database = result.path[1:],
        user = result.username,
        password = result.password,
        host = result.hostname,
        port = result.port
    )

    cursor = connection.cursor()
except:
    raise Exception("Can't Connect to database.")

# Query for getting all roles based on category
try:
    roles_query = "SELECT * FROM roles WHERE category=%s;"
    cursor.execute(roles_query,(sys.argv[1],))
    roles_records = cursor.fetchall()
except:
    raise Exception("Roles query failed.")

# Query for getting all quality based on qrid
try:
    arr = []
    for row in roles_records:
        arr.append(row[0])
    arr = "','".join(arr)
    quality_query = f"SELECT * FROM quality WHERE qrid IN ( '{arr}');"
    cursor.execute(quality_query)
    quality_records = cursor.fetchall()
except:
    raise Exception("Quality query failed.")

# intialising qualities
quality_index = {}
quality_qrid = {}
k = 0
for row in quality_records:    
    a,b,c = row[0],row[1],row[2]
    b,c = b.split("$$"),c.split("$$")
    quality_qrid[a] = [b,c]
    for i in b:
        if i in quality_index: continue
        quality_index[i] = k
        k+=1

# intialising careers
careers = {}
careers_index = {}
k = 0
for row in roles_records:    
    a,b,c = row[0],row[1],row[2]
    careers_index[c] = k
    careers[c] = quality_qrid[a] 
    k+=1

# building up data matrix 
rows = len(careers_index)
columns = len(quality_index)
data = [[0]*columns for _ in range(rows)]

for career in careers:
    for quality,weight in zip(careers[career][0],careers[career][1]) :
        data[careers_index[career]][quality_index[quality]] = float(weight)

# getting input from user

user_input = {}
for i in sys.argv[2:]:
    for j in i.split(","):
        if len(j.split("=")) < 2:
            print("Feature to be released soon")
            exit()
        a,b = j.split("=")
        if a not in quality_index:
            print("Feature to be released soon")
            exit()
        user_input[a] = float(b)

# generating candidates using content filtering
user_data = [0]*columns
for i in user_input:
    user_data[quality_index[i]] = user_input[i]

# scoring
scores = {}
for career,idx in careers_index.items():
    cur_score = 0
    for i in range(columns):
        cur_score += data[idx][i]*user_data[i]
    scores[career] = cur_score

recommended = sorted(scores.items(),key=lambda x:-x[1])

# filtering 
# print("User Interests :- ",*user_input)
print("$$".join([i[0] for i in recommended][:10]))


# # Code for building matrix question
# f1 = open("qualities.txt","r")
# f2 = open("questions.txt","r")
# t = []
# for i,j in zip(f1.readlines(),f2.readlines()):
#     t.append(i.strip()+"="+j.strip())

# print("$$".join(t))
