
import React from 'react';
import FunctionApp from './Components/FunctionApp'; // Import FunctionApp

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DefconLandingPage from './LandingPage/FrontPage';
import ChatBot from './Chatbot/Chatbot';
import ExploreGpt from './Chatbot/Exploregpt';
import TextToSpeech from './Chatbot/Text-to-speech';
import SpeechToText from './Chatbot/Speech-to-text';
import TextToImage from './Chatbot/Text-to-image';
import ImageToText from './Chatbot/Image-to-text';

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<DefconLandingPage />} />
      <Route path="/function" element={<FunctionApp />} />
      <Route path="/chatbot" element={<ChatBot />} />
      <Route path="/exploregpt" element={<ExploreGpt />} />
      <Route path="/text-to-speech" element={<TextToSpeech />} />
      <Route path="/speech-to-text" element={<SpeechToText />} />
      <Route path="/text-to-image" element={<TextToImage />} />
      <Route path="/image-to-text" element={<ImageToText />} />
    </Routes>
  </Router>
  );
};

export default App;
