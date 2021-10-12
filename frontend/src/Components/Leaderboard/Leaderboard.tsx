import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function Leaderboard() {

    return (
       <div id="container">
           <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '85vh'}}>
               <h1>
                    <div className="row">
                        <div className="name">Employee1</div><div className="score">5 points</div>
                    </div>

                    <div className="row">
                       <div className="name">Employee2</div><div className="score">15 points</div>
                   </div>

                   <div className="row">
                       <div className="name">Employee3</div><div className="score">2 points</div>
                   </div>

                   <div className="row">
                       <div className="name">Employee4</div><div className="score">10 points</div>
                   </div>

                   <div className="row">
                       <div className="name">Employee5</div><div className="score">3 points</div>
                   </div>
               </h1>
           </div>
       </div>
    )
}


export default Leaderboard;