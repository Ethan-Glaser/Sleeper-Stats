

export const nflTeamAbbreviations = [
    "ARI", // Arizona Cardinals
    "ATL", // Atlanta Falcons
    "BAL", // Baltimore Ravens
    "BUF", // Buffalo Bills
    "CAR", // Carolina Panthers
    "CHI", // Chicago Bears
    "CIN", // Cincinnati Bengals
    "CLE", // Cleveland Browns
    "DAL", // Dallas Cowboys
    "DEN", // Denver Broncos
    "DET", // Detroit Lions
    "GB",  // Green Bay Packers
    "HOU", // Houston Texans
    "IND", // Indianapolis Colts
    "JAX", // Jacksonville Jaguars
    "KC",  // Kansas City Chiefs
    "LV",  // Las Vegas Raiders
    "LAC", // Los Angeles Chargers
    "LAR", // Los Angeles Rams
    "MIA", // Miami Dolphins
    "MIN", // Minnesota Vikings
    "NE",  // New England Patriots
    "NO",  // New Orleans Saints
    "NYG", // New York Giants
    "NYJ", // New York Jets
    "PHI", // Philadelphia Eagles
    "PIT", // Pittsburgh Steelers
    "SF",  // San Francisco 49ers
    "SEA", // Seattle Seahawks
    "TB",  // Tampa Bay Buccaneers
    "TEN", // Tennessee Titans
    "WSH"  // Washington Commanders
  ];

export function lightenColor(hex, percent) {
    // Convert hex to RGB
    const num = parseInt(hex.slice(1), 16),
          r = (num >> 16) + Math.round((255 - (num >> 16)) * percent / 100),
          g = ((num >> 8) & 0x00FF) + Math.round((255 - ((num >> 8) & 0x00FF)) * percent / 100),
          b = (num & 0x0000FF) + Math.round((255 - (num & 0x0000FF)) * percent / 100);
  
    // Ensure RGB values are within 0-255
    const newR = (r > 255) ? 255 : r;
    const newG = (g > 255) ? 255 : g;
    const newB = (b > 255) ? 255 : b;
  
    // Convert back to hex and return
    return "#" + ((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1).toUpperCase();
  }

export function getLoginUser(Rosters, UserID){
    for(let r in Rosters){
        if(UserID === Rosters[r].owner_id){
            return Rosters[r]
        }
    }
    console.log('No user found: ' + UserID)
}

export function getTeamName(user){
    if(user.metadata.team_name){
      return user.metadata.team_name
    }
    return 'Team ' + user.display_name
  }

export function getUser(roster, Users){
    for(let user in Users){
        if(roster.owner_id === Users[user].user_id){
            return Users[user]
        }
    }
    console.log('No user found ' + roster.owner_id)
}

export function getRoster(id, Rosters){
    for(let roster in Rosters){
        if(Rosters[roster].roster_id === id){
            return Rosters[roster]
        }
    }
    console.log('No roster found ' + id)
}

export function getTeamShare(abv, AllPlayers) {
    return AllPlayers
        .filter(p => p.team.abbreviation === abv)
        .sort((a, b) => {
            const aReceiving = a.seasonStats.find(obj => obj.name === 'receiving');
            const bReceiving = b.seasonStats.find(obj => obj.name === 'receiving');
            
            const aTargets = aReceiving ? aReceiving.stats.find(obj => obj.name === 'receivingTargets') : null;
            const bTargets = bReceiving ? bReceiving.stats.find(obj => obj.name === 'receivingTargets') : null;
            
            const aValue = aTargets ? aTargets.value : 0; // Default to 0 if no value found
            const bValue = bTargets ? bTargets.value : 0; // Default to 0 if no value found
            
            return bValue - aValue;
        });
}

export function getTeamSplit(abv, AllPlayers) {
    return AllPlayers
        .filter(p => p.team.abbreviation === abv).filter(p => p.seasonStats.length > 0 && p.seasonStats.find(obj => obj.name === 'rushing'))
        .sort((a, b) => {
            const aReceiving = a.seasonStats.find(obj => obj.name === 'rushing');
            const bReceiving = b.seasonStats.find(obj => obj.name === 'rushing');
            
            const aTargets = aReceiving ? aReceiving.stats.find(obj => obj.name === 'rushingAttempts') : null;
            const bTargets = bReceiving ? bReceiving.stats.find(obj => obj.name === 'rushingAttempts') : null;
            
            const aValue = aTargets ? aTargets.value : 0; // Default to 0 if no value found
            const bValue = bTargets ? bTargets.value : 0; // Default to 0 if no value found
            
            return bValue - aValue;
        });



}