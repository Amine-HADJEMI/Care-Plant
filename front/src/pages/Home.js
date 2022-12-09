import React from "react";
import "../style/Home.css"
import logo from '../img/logo.png';

function Home (props){

    return(
            <div className="Home">
                <div>
                    <button id="register" img='logo'>register</button>
                </div>
                <div id="title">
                    <h1>CarePlant</h1>
                </div>
                <div>
                    <img></img>
                </div>
                
                
            </div>
          );
}
export default Home;