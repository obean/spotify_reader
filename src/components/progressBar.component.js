import React, { useState, useEffect, useRef } from "react";


function ProgressBar(props) {
const [styleWidth, setWidth] = useState(props.percentage);
const [progress_ms, setProgress] = useState();



let interval = useRef();

const moveBar = () => {
  
  interval = setInterval(() => {
    const newProgress = progress_ms + 1000;
    if(newProgress < props.duration_ms) {
      setProgress(newProgress);
      clearInterval(interval.current);
    }else {
      clearInterval(interval);
      props.setToken()
    }
  ;}, 600)
}

useEffect(() => {
  setProgress(props.progress_ms)
}, [props.progress_ms])

useEffect(() => {
  moveBar();
  return () => {
    clearInterval(interval);
  }
}, [progress_ms])

const progressBarWidthPercentage = () => {
 return ((progress_ms  / props.duration_ms)*100);
}


return (
  <div>
  <div class="progress_bar" style={ {width: progressBarWidthPercentage() + '%'} }/>
  </div>
)


}

export default ProgressBar;
