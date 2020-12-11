import React, { useState, useEffect, Component } from "react";


function ProgressBar(percentage) {
//const [styleWidth, setWidth] = useEffect('0%');

return (
  <div class="progress_bar" style={ {width: percentage + '%'} }/>
)


}

export default ProgressBar;
// {/* <div class="progress_bar" style={ {width:  + '%'} }/> */}