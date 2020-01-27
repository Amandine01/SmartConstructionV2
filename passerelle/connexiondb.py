from pymongo import MongoClient
from urllib.parse import quote_plus

if __name__ == "__main__":
    
    print("coucou mon ami. on va tester mongodb hehe")
    
    rpi_client = MongoClient("mongodb+srv://pfe_smartconstruction:pfe1961@smartconstruction-vkl5p.mongodb.net")
    rpi_client_local = MongoClient() #localhost

    db = rpi_client["SmartConstruction"]
    db_local = rpi_client_local["messages"]
    collection = db["Capteurs"]
    collection_local = db_local["ReceivedData"]
    

    #try:
    #    db.command("serverStatus")
    #except Exception as e: print(e)
    #else:
    #    print("You are connected!")
   
    # Insert business object directly into MongoDB via insert
    #dico = [
    	#{"nom_capteur": 7, "CO" : 7, "NO2" : 7, "PM10" : 7, "PM25" : 7, "Son" : 7},
	#{"nom_capteur": 2, "CO" : 2, "NO2" : 2, "PM10" : 2, "PM25" : 2, "Son" : 2}
    #]


    #resultat_local = collection_local.insert_many(dico)
    #print(resultat_local)
        
    #capteur = db.Capteurs.find_one({'nom_capteur': 18})
    capteur_local = db_local.ReceivedData.find()
    #print("essai d afficher une ligne de la base de donnees : " + str(capteur))

    #On la rentre dans la db sur serveur
    resultat = collection.insert_many(capteur_local)
    print("Affichage de la valeur rentree : " + str(resultat))

    effacer = collection_local.delete_many({})
    print(effacer.deleted_count, "documents deleted")

    
    rpi_client.close()
