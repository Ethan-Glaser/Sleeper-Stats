import UserLogin from "./UserLogin";
import LeagueSelect from "./LeagueSelect";
import NavBar from "./style/NavBar";
import React, {useState, useEffect} from 'react';
import {Box} from '@mui/material';
import { Routes, Route, Link } from 'react-router-dom';
import League from "./League";
import Team from "./Team";
import Players from "./Players";
import NFLTeams from "./NFLTeams";
import ComparePlayers from "./ComparePlayers";
import Home from "./Home";
import Player from "./objects/Player";
import JSONPlayers from './data/JSONPlayers.json';

function App() {

  const[NFLState, setNFLState] = useState({})
  const [UserID, setUserID] = useState('')
  const [LeagueID, setLeagueID] = useState('')
  const [Users, setUsers] = useState([])
  const [Rosters, setRosters] = useState([])

  const [FullPlayerList, setFullPlayerList] = useState([])

  const pages = ['League', 'Team', 'Players', 'NFL Teams', 'Compare Players'];
  const pageComps = {League, Team, Players, NFLTeams, ComparePlayers}

  useEffect(() => {
    fetchState()
  },[])

  async function setAllPlayers(d) {
    let list = Object.keys(JSONPlayers).filter(itm => JSONPlayers[itm].active && ['QB', 'RB', 'WR', 'TE'].includes(JSONPlayers[itm].position) && JSONPlayers[itm].team)
    let players = []
    for(let i = 0; i < list.length; i++){
      let p = new Player(list[i])
      await p.fetchSeasonStats(d)
      players.push(p)
    }
    setFullPlayerList(players)
  }

  async function fetchState(){
    try{
      const response = await fetch('https://api.sleeper.app/v1/state/nfl')
      if (!response.ok){
        throw new Error('State Fetch Error')
      }
      const data = await response.json()
      setNFLState(data)
      setAllPlayers(data.league_season)
    } catch (error) {
      console.error('Error:',error)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'background.default',
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
                  <Route path={page.split(' ').join('').toLowerCase()} element={<El UserID={UserID} LeagueID={LeagueID} NFLState={NFLState} Users={Users} Rosters={Rosters} FullPlayerList={FullPlayerList} />} />
                )
              })}
            </Routes>
          </Box>

        </>)}
    </Box>
  );
}

export default App;
