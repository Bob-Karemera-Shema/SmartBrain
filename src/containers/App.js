import { useState } from 'react';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import ImageLinkForm from '../components/ImageLinkForm';
import Rank from '../components/Rank';
import ParticlesContainer from '../components/Particles';
import FaceRecognition from '../components/FaceRecognition';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import Modal from '../components/Modal/Modal';
import Profile from '../components/Profile/Profile';
import './App.css';

function App() {
  const [user, setUser] = useState({});
  const [input, setInput] = useState('');
  const [boxes, setBoxes] = useState([]);
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setSignIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const loadUser = (user) => {
    setUser(user);
  };

  const onRouteChange = (curRoute) => {
    if (curRoute === "home") {
      setSignIn(true);
    } else {
      setSignIn(false);
      setBoxes([]);
      setInput('');
      setUser({});
    }
    setRoute(curRoute);
  };



  const calculateFaceLocations = (data) => {
    return data.outputs[0].data.regions.map(face => {
      const clarifaiFace = face.region_info.bounding_box;
      const image = document.getElementById("input-image");
      const width = Number(image.width);
      const height = Number(image.height);

      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      };
    });
  };

  const displayFaceBoxes = (boxObjects) => {
    setBoxes(boxObjects);
    return true;
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onPictureSubmit = () => {
    fetch('http://localhost:3030/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: input
      })
    })
      .then(response => response.json())
      .then(data => {
        displayFaceBoxes(calculateFaceLocations(data));
        if (data) {
          fetch('http://localhost:3030/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id
            })
          })
            .then(res => res.json())
            .then(count => {
              setUser({ ...user, entries: count });
            })
            .catch(console.log);
        }
      })
      .catch(error => console.log('error', error));
  };

  const toggleModal = () => {
    setIsProfileOpen(prevState => !prevState);
  }

  return (
    <div className="App">
      <ParticlesContainer className="particles" />
      <Navigation signedIn={isSignedIn} onRouteChange={onRouteChange} toggleModal={toggleModal} />
      {
        isProfileOpen &&
        <Modal>
          <Profile isProfileOpen={isProfileOpen} toggleModal={toggleModal} user={user} />
        </Modal>
      }
      <Logo />
      {
        route === "home" ?
          <div>
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm onInputChange={onInputChange} onPictureSubmit={onPictureSubmit} />
            <FaceRecognition boxes={boxes} imageURL={input} />
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