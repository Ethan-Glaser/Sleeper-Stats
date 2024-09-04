import JSONPlayers from './JSONPlayers.json';
import JSONESPNPlayers from './JSONESPNPlayers.json'

/*

ISSUE TBD ....... NEED WAY TO GET ESPN TEAM IDS

Season Stats ------

1. get http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/<season>/types/2/teams/<team id>/athletes/<player id>/statistics
2. in data.categories get passing rushing recieving

Stats Per Week ----- 

1. get https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/<season>/athletes/<playerid>/eventlog
2. for each itm in data.events.items get statistics $ref
3. in data.categories get passing rushing recieving




*/


class Player {
    constructor(id) {
        let p = JSONPlayers[id];
        this._name = p.first_name + ' ' + p.last_name;
        this._position = p.position;
        this._team = p.team;
        this._number = p.number;
        this._age = p.age;
        this._sleeperID = id;
        let x = JSONESPNPlayers.items.find(obj => obj.fullName.includes(p.first_name + ' ' + p.last_name) && obj.jersey === p.number.toString())
        console.log(p.first_name + ' ' + p.last_name + ' ' + p.number.toString())
        console.log(x)
        if(x) this._espnID = x.id; else this._espnID = null;
        
    }

    // Getter and Setter for name
    get name() {
        return this._name;
    }

    set name(newName) {
        if (typeof newName === 'string' && newName.trim() !== '') {
            this._name = newName;
        } else {
            console.error('Name must be a non-empty string');
        }
    }

    // Getter and Setter for position
    get position() {
        return this._position;
    }

    set position(newPosition) {
        if (typeof newPosition === 'string' && newPosition.trim() !== '') {
            this._position = newPosition;
        } else {
            console.error('Position must be a non-empty string');
        }
    }

    // Getter and Setter for team
    get team() {
        return this._team;
    }

    set team(newTeam) {
        if (typeof newTeam === 'string' && newTeam.trim() !== '') {
            this._team = newTeam;
        } else {
            console.error('Team must be a non-empty string');
        }
    }

    // Getter and Setter for number
    get number() {
        return this._number;
    }

    set number(newNumber) {
        if (typeof newNumber === 'number' && newNumber > 0) {
            this._number = newNumber;
        } else {
            console.error('Number must be a positive number');
        }
    }

    // Getter and Setter for age
    get age() {
        return this._age;
    }

    set age(newAge) {
        if (typeof newAge === 'number' && newAge > 0) {
            this._age = newAge;
        } else {
            console.error('Age must be a positive number');
        }
    }

    // Getter and Setter for sleeperID
    get sleeperID() {
        return this._sleeperID;
    }

    set sleeperID(newID) {
        console.error('SleeperID is read-only and cannot be changed');
    }

    // Getter and Setter for espnID
    get espnID() {
        return this._espnID;
    }

    set espnID(newEID) {
        if (typeof newEID === 'string' && newEID.trim() !== '') {
            this._espnID = newEID;
        } else {
            console.error('Name must be a non-empty string');
        }
    }
}

export default Player;
