import { useState } from 'react';
import './App.css';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import ImageLinkForm from '../components/ImageLinkForm';
import Rank from '../components/Rank';
import ParticlesContainer from '../components/Particles';
import FaceRecognition from '../components/FaceRecognition';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

function App() {
  const [user, setUser] = useState({});
  const [input, setInput] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setSignIn] = useState(false);

  const loadUser = (user) => {
    setUser(user);
  };

  const onRouteChange = (curRoute) => {
    if (curRoute === "home") {
      setSignIn(true);
    } else {
      setSignIn(false);
      setBox({});
      setInput('');
      setUser({});
    }
    setRoute(curRoute);
  };

  

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("input-image");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    };
  };

  const displayFaceBox = (boxObject) => {
    setBox(boxObject);
    return true;
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onPictureSubmit = () => {
    fetch('https://smart-brain-api-mm49.onrender.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: input
            })
          })
      .then(response => response.json())
      .then(data => {
        displayFaceBox(calculateFaceLocation(data));
        if(data){
          fetch('https://smart-brain-api-mm49.onrender.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: user.id
            })
          })
          .then(res => res.json())
          .then(count => {
            setUser({...user, entries: count});
          })
          .catch(console.log);
        }
      })
      .catch(error => console.log('error', error));
  };

  return (
    <div className="App">
      <ParticlesContainer className="particles" />
      <Navigation signedIn={isSignedIn} onRouteChange={onRouteChange} />
      <Logo />
      {
        route === "home" ?
          <div>
            <Rank name={user.name} entries={user.entries}/>
            <ImageLinkForm onInputChange={onInputChange} onPictureSubmit={onPictureSubmit} />
            <FaceRecognition box={box} imageURL={input} />
          </div> :
          (
          route === "signin" ? <SignIn onRouteChange={onRouteChange} loadUser={loadUser} /> : 
            <SignUp onRouteChange={onRouteChange} loadUser={loadUser} />
          )
      }
    </div>
  );
}

export default App;