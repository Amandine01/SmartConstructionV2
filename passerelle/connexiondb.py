from pymongo import MongoClient
from urllib.parse import quote_plus
import time
import json

if __name__ == "__main__":
    
    print("Connexion aux dbs")
    
    rpi_client = MongoClient("mongodb+srv://pfe_smartconstruction:pfe1961@smartconstruction-vkl5p.mongodb.net")
    rpi_client_local = MongoClient() #localhost

    db = rpi_client["SmartConstruction"]
    db_local = rpi_client_local["messages"]
    collection = db["Capteurs"]
    collection_local = db_local["ReceivedData"]

    while(True):
        print("reading local db")
        capteur_local = db_local.ReceivedData.find()
        print("local db is read")
        #print("ya quelquun la dedans ? :" + str(capteur_local.count()))
        #nb_items = capteur_local.count()
        #dictionnaire = dict()
        for item in capteur_local:
            converted_data = json.loads(item["data"])
            dictionnaire = { "_id" : item["_id"]}
            dictionnaire.update(converted_data)
            print("dictionnaire :" + str(dictionnaire))
            print("inserting data in distant db")
            resultat = collection.insert_one(dict(dictionnaire))
            print("Entered data : " + str(resultat))
            time.sleep(10)
        #On rentre les données dans la db sur serveur
        #resultat = collection.insert_many(capteur_local)

        #On efface la db local
        time.sleep(20)
        print("erasing data in distant db")
        effacer = collection.delete_many({})
        #print(effacer.deleted_count, "Local data deleted")
		
        #Wait 2 minutes
        time.sleep(20)

    
    rpi_client.close()
    rpi_client_local.close()
