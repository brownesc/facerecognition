import React, {Component} from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import FaceRecon from './components/FaceRecon/FaceRecon';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai'

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
            "enable": false,
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

// const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '726c299071994961848484cf3173dd2c'
});

class App extends Component{
  constructor() {
    super();
    this.state= {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange=(event) => {
    this.setState({input: event.target.value});
  }
  onButtonSubmit =() => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    function(response) {
      console.log(response)
      // do something with response
    },
    function(err) {
      // there was an error
    }
  );
  }


render() {
  
  return (
    <div className="App">
      <Particles className='particles' onChange={this.onInputChange} params={particleOptions} />
      <Navigation />
      <Logo/> 
      <Rank />
      <ImageLinkForm onInputChange= {this.onInputChange} onButtonSubmit={this.onButtonSubmit} />  
      <FaceRecon imageUrl={this.state.imageUrl}/>
    </div>
  );
}
}

export default App;
