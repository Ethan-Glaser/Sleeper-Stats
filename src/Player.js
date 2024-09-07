import JSONPlayers from './JSONPlayers.json';
import JSONESPNPlayers from './JSONESPNPlayers.json'
import NFLTeam from './NFLTeam'

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
        let t = p.team
        if(t === 'WAS') t = 'WSH'           //Washington Commanders issue
        if(t) this._team = new NFLTeam(t); else this._team = null;
        this._number = p.number;
        this._age = p.age;
        this._sleeperID = id;
        this._seasonStats = [];
        this._weeklyStats = [];
        let x 
        if(p.number) x = JSONESPNPlayers.items.find(obj => obj.fullName.includes(p.first_name + ' ' + p.last_name) && obj.jersey === p.number.toString()); else x=null
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
        this._team = newTeam;
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

    get seasonStats(){
        return this._seasonStats
    }

    set seasonStats(newStat){
        this._seasonStats =newStat
    }

    get weeklyStats(){
        return this._weeklyStats
    }

    set weeklyStats(newStat){
        this._weeklyStats =newStat
    }

    async fetchWeeklyStats(season){
        const response = await fetch('https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/'+ season + '/athletes/'+ this._espnID+'/eventlog')
        if (!response.ok){
            throw new Error('Stats Fetch Error')
        }
        const events = await response.json()
        const weekdata = {}
        for(let i = 0; i < events.events.count; i++){
            if(events.events.items[i].played){
                const eventresp = await fetch(events.events.items[i].statistics.$ref)
                if (!eventresp.ok){
                    throw new Error('Stats Fetch Error')
                }
                const wdata = await eventresp.json()
                weekdata[i+1] = wdata.splits.categories
            } else{
                weekdata[i+1] = null
            }
        }
        this._weeklyStats = weekdata
    }
    
    async fetchSeasonStats(season){
        try{
            const response = await fetch('https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/' + season+ '/types/2/teams/' + this._team._ESPNID +'/athletes/'+ this._espnID+'/statistics')
            if (!response.ok){
                throw new Error('Stats Fetch Error')
            }
            const seasondata = await response.json()
            this._seasonStats = seasondata.splits.categories

        } catch (error){
            console.error('Error:', error + ' : ' + this._name)
        }
    }
}

export default Player;
