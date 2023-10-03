import { useState } from 'react';
import './App.css';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import ImageLinkForm from '../components/ImageLinkForm';
import Rank from '../components/Rank';
import ParticlesContainer from '../components/Particles';
import FaceRecognition from '../components/FaceRecognition';

function App() {
  const [input, setInput] = useState('');

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", clarifaiRequestOptions(input))
      .then(response => console.log(response))
      .catch(error => console.log('error', error));
  };

  return (
    <div className="App">
      <ParticlesContainer className="particles" />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
      <FaceRecognition imageURL={input}/>
    </div>
  );
}

const clarifaiRequestOptions = (imageURL) => {
  const PAT = '98e42e8a626b46ffa9ededb80f51c34c';
  const USER_ID = 'clarifai';
  const APP_ID = 'main';
  const IMAGE_URL = imageURL;

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return requestOptions;
};

export default App;
