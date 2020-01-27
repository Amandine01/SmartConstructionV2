from pymongo import MongoClient
from urllib.parse import quote_plus

if __name__ == "__main__":
    
    print("Connexion aux dbs")
    
    rpi_client = MongoClient("mongodb+srv://pfe_smartconstruction:pfe1961@smartconstruction-vkl5p.mongodb.net")
    rpi_client_local = MongoClient() #localhost

    db = rpi_client["SmartConstruction"]
    db_local = rpi_client_local["messages"]
    collection = db["Capteurs"]
    collection_local = db_local["ReceivedData"]

    while (true):
	    capteur_local = db_local.ReceivedData.find()

	    #On rentre les données dans la db sur serveur
	    resultat = collection.insert_many(capteur_local)
	    print("Entered data : " + str(resultat))

	    #On efface la db local
	    effacer = collection_local.delete_many({})
	    print(effacer.deleted_count, "Local data deleted")

    
    rpi_client.close()
    rpi_client_local.close()
