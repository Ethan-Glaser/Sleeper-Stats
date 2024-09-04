import ESPNTeams from './ESPNTeams.json';

class Team {
    constructor(abv) {
        let x = ESPNTeams.sports[0].leagues[0].teams.find(obj => obj.team.abbreviation == abv);
        this._name = x.team.name;
        this._abbreviation = x.team.abbreviation;
        this._location = x.team.location;
        this._color = x.team.color;
        this._altcolor = x.team.alternateColor;
        this._ESPNID = x.team.id;
    }

    // Getter and Setter for name
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    // Getter and Setter for abbreviation
    get abbreviation() {
        return this._abbreviation;
    }

    set abbreviation(value) {
        this._abbreviation = value;
    }

    // Getter and Setter for location
    get location() {
        return this._location;
    }

    set location(value) {
        this._location = value;
    }

    // Getter and Setter for color
    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }

    // Getter and Setter for altcolor
    get altcolor() {
        return this._altcolor;
    }

    set altcolor(value) {
        this._altcolor = value;
    }

    // Getter and Setter for ESPNID
    get ESPNID() {
        return this._ESPNID;
    }

    set ESPNID(value) {
        this._ESPNID = value;
    }
}

export default Team;
