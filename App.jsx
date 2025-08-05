import React from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Form from './components/Form';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <Form />
      <Footer />
    </div>
  );
};

export default App;