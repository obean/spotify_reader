import React, { useState, useEffect, Component } from "react";
//import hash from "./hash";
import logo from './logo.svg';
import './App.css';

export const authEndpoint = 'https://accounts.spotify.com/authorize?'
const clientId = process.env.REACT_APP_CLIENTID;
const clientSecret = process.env.REACT_APP_CLIENTSECRET;
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
  const [token, setToken] = useState("");
  const [nowPlaying, setNowPlaying] = useState(
    { album: {
         images: [{ url: ""}] 
      },
      name: "",
      artists: [{ name: "" }],
      duration_ms: 0
    }
  )


    //   const data = await fetch("https://api.spotify.com/v1/me/player", {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization':  "Bearer " + token
    //     }
    //   })

  useEffect(() => {
      let _token = hash.access_token;
      console.log(hash.access_token)
      if(_token) {
        setToken(_token)
      }
  },[])
  useEffect(() => {
    setNowPlaying(getCurrentlyPlaying())
  }, [token])

  const getCurrentlyPlaying =   async  () => {
    const data = await fetch("https://api.spotify.com/v1/me/player", {
      headers: {
              'Content-Type': 'application/json',
              'Authorization':  "Bearer " + "BQCnGhypFIEVxoTUw-2l-C5WOx-jj1vxHEh6MVtXUr4YqPYW5q4JwGLKrrlv3kIlTOiHiLJlGcfI0rWjz_q3CNB9aId2aNOivPeIVY8Da99u_xdIjziDeKHVPtW4zrQF0zIENLkxIDSbHnceLAdRrR8"
            }
    }).then(data => data.json())
    return  setNowPlaying( data.item )
  }



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!token && (
          <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}client_id=${process.env.REACT_APP_CLIENTID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
          > Login to Spotify</a>  
        )}
        {token &&(
          <div>
            <h1>{token}</h1> 
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
