import React, { useState, useEffect } from "react";
//import hash from "./hash";
import logo from './logo.svg';
import './App.css';
import ProgressBar from './components/progressBar.component.js'

export const authEndpoint = 'https://accounts.spotify.com/authorize?'
// const clientId = process.env.REACT_APP_CLIENTID;
// const clientSecret = process.env.REACT_APP_CLIENTSECRET;
const redirectUri = "http://localhost:3000";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
];


const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

window.location.hash = "";


function App() {
  const [token, setToken] = useState();
  const [nowPlaying, setNowPlaying] = useState(
    { album: {
         images: [{ url: ""}, { url: "" }] 
      },
      name: "",
      artists: [{ name: "" }],
      duration_ms: 0
    }
  );
  const [is_playing, setIsPlaying] = useState();
  const [progress_ms, setProgress_ms] = useState();

  useEffect(() => {
      let _token = hash.access_token;
      console.log(hash.access_token)
      if(_token) {
        setToken(_token)
      }
  })

  useEffect(() => {
    if(token){
    const getCurrentlyPlaying =   async  () => {
      const data = await fetch("https://api.spotify.com/v1/me/player", {
        headers: {
                'Content-Type': 'application/json',
                'Authorization':  "Bearer " + token
              }
      }).then(data => data.json())
      console.log(data)
      setNowPlaying( data.item );//removed return 
      setIsPlaying(data.is_playing);
      setProgress_ms(data.progress_ms);
    }
    getCurrentlyPlaying();
  }}, [token])

  useEffect(() => {
    console.log(nowPlaying)
  })

  // useEffect(() => {
  //   console.log(progress_ms)
  //   let interval = setInterval(() => setProgress_ms(progress_ms - 1000), 1000 )
    
  // })

  const convertTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  //const progressBarStyle = { width: ( progress_ms * 60 / nowPlaying.item.duration_ms) + '%' };

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {!token && (
          <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}client_id=${process.env.REACT_APP_CLIENTID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
          > Login to Spotify</a>  
        )}
        {token &&(
          <div name="now-playing">
            <img src={nowPlaying.album.images[1].url} />
            <h1>{nowPlaying.name}</h1> 
            <h2>{nowPlaying.artists[0].name}</h2>
            <ProgressBar 
                        progress_ms={progress_ms}
                        duration_ms={nowPlaying.duration_ms}
                        percentage={((progress_ms  / nowPlaying.duration_ms)*100)}
                        setToken={setToken} />

            <i> Logged in to Spotify</i>
         </div>      
        )}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
