import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';

function Logo() {
    return (
        <div className="ma4 mt0">
            <Tilt className="tilt br2 shadow-2" style={{ height: '110px', width: '110px' }}>
                <div className="inner-element pa3" >
                    <img style={{paddingTop: '5px'}} src={brain} alt="brain"/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;