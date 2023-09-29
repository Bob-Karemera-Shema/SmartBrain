import './App.css';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import ImageLinkForm from '../components/ImageLinkForm';
import Rank from '../components/Rank';
import ParticlesContainer from '../components/Particles';

function App() {
  return (
    <div className="App">
      <ParticlesContainer className="particles" />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
