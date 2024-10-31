import logo from './logo.svg';
import Header from './components/Header';
import './App.css';
import { useState } from 'react';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Hello React',
      content: "The error you're seeing is because npm cannot locate a package.json file in your project directory (C:\Users\ROBERTO\Documents\code__projects). The package.json file is necessary for npm to know what scripts to run and which dependencies to load."
    },
    {
      id: 2,
      title: 'Second posts',
      content: "Simple SDK Integration: The Firebase SDK makes it easy to connect to your React app and provides simple methods for signing in, signing up, and managing user sessions."
    },
    {
      id: 3,
      title: 'Third',
      content: "Set up a login and register form and use Firebase’s signInWithEmailAndPassword and createUserWithEmailAndPassword methods."
    },
  ])
  
  return (
    <div className="App">
      <Header />
     hello
    </div>
  );
}

export default App;
