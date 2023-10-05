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
  const [box, setBox] = useState({});

  const clarifaiRequest = (imageURL) => {
    const PAT = '98e42e8a626b46ffa9ededb80f51c34c';
    const USER_ID = 'b9f8884cvz0m';
    const APP_ID = 'smart-brain';
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

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("input-imaage");
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
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", clarifaiRequest(input))
      .then(response => displayFaceBox(calculateFaceLocation(response.json())))
      .catch(error => console.log('error', error));
  };

  return (
    <div className="App">
      <ParticlesContainer className="particles" />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
      <FaceRecognition box={box} imageURL={input} />
    </div>
  );
}

export default App;
