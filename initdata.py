import sys
import os
import shutil
import requests
import json

folder_to_zip = './src/data/'

if not os.path.isdir(folder_to_zip):
    print(f"Error: The folder '{folder_to_zip}' does not exist.")
    sys.exit(1)

try:
    shutil.make_archive('data', 'zip', folder_to_zip)
    shutil.rmtree(folder_to_zip)
    os.makedirs(folder_to_zip) 
    response = requests.get('https://api.sleeper.app/v1/players/nfl')
    if not response.ok:
        sys.exit(1)
    data = json.loads(response.text)
    with open(folder_to_zip +'/JSONPlayers.json', 'w') as file:
        json.dump(data, file)
    response = requests.get('https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams')
    if not response.ok:
        sys.exit(1)
    data = json.loads(response.text)
    with open(folder_to_zip +'/ESPNTeams.json', 'w') as file:
        json.dump(data, file)
    response = requests.get('https://sports.core.api.espn.com/v3/sports/football/nfl/athletes?limit=18000')
    if not response.ok:
        sys.exit(1)
    data = json.loads(response.text)
    with open(folder_to_zip +'/JSONESPNPlayers.json', 'w') as file:
        json.dump(data, file)

    
except Exception as e:
    print('Error')