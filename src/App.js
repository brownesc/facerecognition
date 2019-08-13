import React, {Component} from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import FaceRecon from './components/FaceRecon/FaceRecon';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
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
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id:'',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation=(data)=>{
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
  
    return {
      leftCol: clarifaiFace.left_col*width,
      topRow: clarifaiFace.top_row,
      rightCol: width- (clarifaiFace.right_col*width),
      bottomRow: height - (clarifaiFace.bottom_row*height)
    }

  }

  displayFaceBox= (box) => {
    console.log(box)
    this.setState({box: box})
  }

  onInputChange=(event) => {
    this.setState({input: event.target.value});
  }
  onButtonSubmit =() => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response =>{ 
      if (response){
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
          id: this.state.user.id    
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count})          )
        })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))})
    .catch(err=> {console.log(err)
    
      // do something with response
    });
  
  
  }
  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState({isSignedIn: false})
    }else if (route=== 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route:route})
  }


render() {
  
  return (
    <div className="App">
      <Particles className='particles' onChange={this.onInputChange} params={particleOptions} />
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange= {this.onRouteChange} />
      { this.state.route==='home' 
        ? <div><Logo/> 
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkForm onInputChange= {this.onInputChange} onButtonSubmit={this.onButtonSubmit} />  
          <FaceRecon box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>

        : (this.state.route === 'signin'
          ?<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
         )
      }
  </div>
  );
}
}

export default App;
