import sys

# intialising qualities
quality_index = {}
qualities = []
f = open("python_code/qualities.txt",'r')
k = 0
for i in f.readlines():    
    line = i.strip()
    quality_index[line] = k
    qualities.append(line)
    k+=1

# intialising careers
careers = {}
careers_index = {}
f = open("python_code/careers.txt",'r')
k = 0
for i in f.readlines():    
    line = i.strip().split("$$")
    careers_index[line[0]] = k
    careers[line[0]] = line[1:]
    k+=1

# building up data matrix 
rows = len(careers_index)
columns = len(quality_index)

data = [[0]*columns for i in range(rows)]

for career in careers:
    for quality in careers[career]:
        data[careers_index[career]][quality_index[quality]] = 1

# getting input from user

user_input = {}
for i in sys.argv[1:]:
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
user_data = []
for i in sorted(quality_index,key = lambda x:quality_index[x]):
    if i in user_input:
        user_data.append(user_input[i])
    else: 
        user_data.append(0) 
        

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
