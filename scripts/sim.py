import firebase_admin
from firebase_admin import db

from data import DATA

cred_obj = firebase_admin.credentials.Certificate('fyp-19-35-firebase-adminsdk-3sibw-e108e73876.json')
default_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL': 'https://fyp-19-35.firebaseio.com/'
	})

# As an admin, the app has access to read and write all data, regradless of Security Rules
ref = db.reference('/CaseWorkers')

# print(list(DATA.keys()))

ref_dict = {}
for i in list(DATA.keys()):
    ref_dict[i] = ref.child(i).child('currLocation')
    print(ref_dict[i].__dir__())

    print(ref_dict[i].path)

# print(ref_dict.__dir__)

# exit()

counter = 0
while counter < 20:
    print(counter)
    is_quit = True

    for i in ref_dict:

        # print(DATA[i][counter])
        try:



            ref_dict[i].set({
                'lat': DATA[i][counter][0],
                'long': DATA[i][counter][1]
            })
            is_quit = False
        
        except:
            pass

    if is_quit:
        break

    counter += 1










# for i in DATA:
#     # users_ref = ref.child(i)
#     for coord in DATA[i]:
#         print(coord)
#     # print(users_ref.get())
#     break

# users_ref.push({
#     'lat': "73.02636",
#     'long': "33.67775"
# })

# print(ref.get())
