import React, {Component} from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';

const particleOptions = {
  "particles": {
    "number": {
        "value": 110,
        "density": {
            "enable": false,
            
        }
    },
    "size": {
        "value": 9,
        "random": true,
        "anim": {
            "speed": 4,
            "size_min": 0.3
        }
    },
    "line_linked": {
        "enable": true
    },
    "move": {
        "random": true,
        "speed": 4,
        "direction": "top",
        "out_mode": "out"
    }
},
"interactivity": {
    "events": {
        "onhover": {
            "enable": true,
            "mode": "repulse"
        },
        "onclick": {
            "enable": true,
            "mode": "repulse"
        }
    },
    "modes": {
        "bubble": {
            "distance": 250,
            "duration": 2,
            "size": 0,
            "opacity": 0
        },
        "repulse": {
            "distance": 400,
            "duration": 2
        }
    }
}  }

class App extends Component{
  constructor() {
    super();
    this.state= {
      input: ''
    }
  }

  onInputChange=(event) => {
    console.log(event);
  }


render() {
  
  return (
    <div className="App">
      <Particles className='particles' onInputChange={onInputChange} params={particleOptions} />
      <Navigation />
      <Logo/> 
      <Rank />
      <ImageLinkForm/>  
    </div>
  );
}
}

export default App;
