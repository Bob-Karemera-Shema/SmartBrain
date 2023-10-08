import React from "react";

function Navigation({ signedIn, onRouteChange }) {
    return (signedIn ?
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p onClick={() => onRouteChange("signin")} className="f3 link dim black underline pa3 pointer">Sign Out</p>
        </nav> :
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p onClick={() => onRouteChange("signin")} className="f3 link dim black underline pa3 pointer">Sign In</p>
            <p onClick={() => onRouteChange("signup")} className="f3 link dim black underline pa3 pointer">Sign Up</p>
        </nav>
    );
}

export default Navigation;