from pymongo import MongoClient
from urllib.parse import quote_plus
import json

if __name__ == "__main__":
    
    print("Connexion aux dbs")
    
    rpi_client = MongoClient("mongodb+srv://pfe_smartconstruction:pfe1961@smartconstruction-vkl5p.mongodb.net")
    rpi_client_local = MongoClient() #localhost

    db = rpi_client["SmartConstruction"]
    db_local = rpi_client_local["messages"]
    collection = db["Capteurs"]
    collection_local = db_local["ReceivedData"]

    capteur_local = db_local.ReceivedData.find()
    print("local db is read")
    #On rentre les données dans la db sur serveur
    #resultat = collection.insert_many(capteur_local)

    #On efface la db distante
    print("erasing data in distant db")
    effacer = collection.delete_many({})
    print(effacer.deleted_count, "data deleted")
		

    
    #rpi_client.close()
    rpi_client_local.close()
