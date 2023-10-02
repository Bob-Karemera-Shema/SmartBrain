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
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.JSON())
      .catch(error => console.log('error', error));
  };

  return (
    <div className="App">
      <ParticlesContainer className="particles" />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
      <FaceRecognition />
    </div>
  );
}

const clarifaiRequestOptions = (imageURL) => {
  const PAT = 'YOUR_PAT_HERE';
  const USER_ID = 'clarifai';
  const APP_ID = 'main';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';
  const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
  const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

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
