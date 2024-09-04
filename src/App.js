import UserLogin from "./UserLogin";
import LeagueSelect from "./LeagueSelect";
import NavBar from "./NavBar";
import React, {useState, useEffect} from 'react';
import {Box, Container} from '@mui/material';
import { Routes, Route, Link } from 'react-router-dom';
import League from "./League";
import Team from "./Team";
import Players from "./Players";
import NFLTeams from "./NFLTeams";
import ComparePlayers from "./ComparePlayers";
import Home from "./Home";


function App() {

  const[NFLState, setNFLState] = useState({})

  useEffect(() => {
    fetchState()
  },[])

  async function fetchState(){
    try{
      const response = await fetch('https://api.sleeper.app/v1/state/nfl')
      if (!response.ok){
        throw new Error('State Fetch Error')
      }
      const data = await response.json()
      setNFLState(data)
    } catch (error) {
      console.error('Error:',error)
    }
  }

  const [UserID, setUserID] = useState('')
  const [LeagueID, setLeagueID] = useState('')
  const [Users, setUsers] = useState([])
  const [Rosters, setRosters] = useState([])

  const pages = ['League', 'Team', 'Players', 'NFL Teams', 'Compare Players'];
  const pageComps = {League, Team, Players, NFLTeams, ComparePlayers}


  const getTeamName = (user) => {
    if(user.metadata.team_name){
      return user.metadata.team_name
    }
    return 'Team ' + user.display_name
  }

  const getUser = (roster) => {
    for(let user in Users){
      if(roster.owner_id === Users[user].user_id){
        return Users[user]
      }
    }
    console.log('No user found ' + roster.owner_id)
  }

  const getRoster = (id) =>{
    for(let roster in Rosters){
      if(Rosters[roster].roster_id === id){
        return Rosters[roster]
      }
    }
    console.log('No roster found ' + id)
  }



  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: '4px',
      }}
    >
      { UserID === '' && (<UserLogin setUserID={setUserID} />)}
      { UserID !== '' && LeagueID === '' && (<LeagueSelect setLeagueID={setLeagueID} UserID={UserID} NFLState={NFLState} setUsers={setUsers} setRosters={setRosters} />)}
      { UserID !== '' && LeagueID !== '' && Users && Rosters && Users.length > 0 && Rosters.length > 0 && (
        <>
          <NavBar pages={pages} setUserID={setUserID} setLeagueID={setLeagueID} setUsers={setUsers} setRosters={setRosters} />
          <Box
            sx={{
                width: '96%',
                flexGrow: 1,
                padding: '2rem',
                backgroundColor: '#fafafa',
                boxShadow: 2,
                borderRadius: 2,
                mt: '1rem',
            }}
          >
            <Routes>
              <Route path='/' element={<Home />} />
              {pages.map((page) => {
                const El = pageComps[page.split(' ').join('')]
                return(
                  <Route path={page.split(' ').join('').toLowerCase()} element={<El UserID={UserID} LeagueID={LeagueID} NFLState={NFLState} Users={Users} Rosters={Rosters} getUser={getUser} getRoster={getRoster} getTeamName={getTeamName} />} />
                )
              })}
            </Routes>
          </Box>

        </>)}

      
    </Box>
  );
}

export default App;
