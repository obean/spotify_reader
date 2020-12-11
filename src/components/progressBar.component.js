import React, { useState, useEffect, Component } from "react";


function ProgressBar(props) {
//const [styleWidth, setWidth] = useEffect('0%');



return (
  <div class="progress_bar" style={ {width: props.percentage + '%'} }/>
)


}

export default ProgressBar;
// {/* <div class="progress_bar" style={ {width:  + '%'} }/> */}