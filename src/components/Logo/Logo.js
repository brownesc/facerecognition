import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
const Logo = () => {
    return(<div className='ma4 mt0'>
    <Tilt className="center Tilt br2 shadow-2" options={{ max : 60 }} style={{ height: 150, width: 150 }} >
    <div className="Tilt-inner"> <img style={{paddingTop: '25px'}}  src="https://img.icons8.com/ios/96/000000/brain.png" alt='brain logo'></img></div>
    </Tilt>    
    </div>
    );
}

export default Logo;