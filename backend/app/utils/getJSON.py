import json
import os
from app import app

def getJSONFromFile(name):
    if(name == 'Atms'):
        filePath = 'C:/Users/Dell/Desktop/SIH2020/mmbackend/app/JSON/atm2.json'
    elif(name == 'Banks'):
        filePath = 'C:/Users/Dell/Desktop/SIH2020/mmbackend/app/JSON/Banks.json'
    elif(name == 'BankMitras'):
        filePath = 'C:/Users/Dell/Desktop/SIH2020/mmbackend/app/JSON/BankMitras.json'
    elif(name == 'PostOffices'):
        filePath = 'C:/Users/Dell/Desktop/SIH2020/mmbackend/app/JSON/PostOffices.json'
    elif(name == 'CSCs'):
        filePath = 'C:/Users/Dell/Desktop/SIH2020/mmbackend/app/JSON/CSCs.json'
    
    f = open(filePath,)
    data = json.load(f)
    return data
