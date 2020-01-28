from pymongo import MongoClient
from urllib.parse import quote_plus
import time
import json



######################
#    MAIN PROGRAM    #
######################


if __name__ == "__main__":
    
    # Connect to local and distant servers
    print("Connexion aux dbs")
    rpi_client = MongoClient("mongodb+srv://pfe_smartconstruction:pfe1961@smartconstruction-vkl5p.mongodb.net")
    rpi_client_local = MongoClient() #localhost
    
    # Access to both databases
    db = rpi_client["SmartConstruction"]
    db_local = rpi_client_local["messages"]
    collection = db["Capteurs"]
    collection_local = db_local["ReceivedData"]


    # Infinite loop
    while(True):

        # Read local database
        print("reading local db")
        capteur_local = db_local.ReceivedData.find()
        print("local db is read")
        #nb_items = capteur_local.count()
        #print("valeur :" + str(nb_items))

        # For each item in the read database
        for item in capteur_local:

            # Collect all required data for distant database
            # Sound (from local database)
            converted_data = {"Son" : int(dict(json.loads(item["data"]))["Son"])}
            # Date (from local database)
            date = { "date" : item["time"] }
            # Sensor's number (manually)
            numero = { "nom_capteur" : "1" }
            # Packet ID (from local database)
            dictionnaire = { "_id" : item["_id"] }
            # Other sensors' information (manually)
            other_data1 = {"CO" : 0, "NO2" : 0, "PM10" : 0, "PM25" : 0}
            other_data2 = {"Latitude" : 0, "Longitude" : 0}

            # Put all this information inside a dictionnary
            dictionnaire.update(numero)
            dictionnaire.update(date)
            dictionnaire.update(other_data1)
            dictionnaire.update(converted_data)
            dictionnaire.update(other_data2)
            dictionnaire["Son"] = float((dictionnaire["Son"])/100)
            # Inform the user
            print("dictionnaire :" + str(dictionnaire))

            # Register it in the distant database
            print("inserting data in distant db")
            resultat = collection.insert_one(dict(dictionnaire))
            print("Entered data : " + str(resultat))

        # Erase old values from local database
        print("erasing data in local db")
        effacer = collection_local.delete_many({})
        print(effacer.deleted_count, "Local data deleted")
		
        # Wait 40 seconds (during this time the gateway will receive information via LoRa module and register it in local database)
        time.sleep(40)

    
    # Close servers' access
    rpi_client.close()
    rpi_client_local.close()

# END
