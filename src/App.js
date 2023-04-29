import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import HomePage from './components/homePage';
import LoginPage from './components/loginPage';
import EventForm from './components/eventForm';
import AllEvents from './components/allEvents';
import BookTicket from './components/bookTicket';

import { useEffect, useState } from 'react';


function App() {


  const [data, setData]= useState([]);

  useEffect(()=> {
    fetch('http://localhost:8081/events')
    .then(res =>res.json())
    .then(data => {
      console.log(data); // add this line to print the data on the console
      setData(data);
    })
    .catch(err => console.log(err));
  }, [])

  // const handleFailure = (result) => {
  //   alert(result);
  // }
  // const handleLogin = (googleData) => {
  //   alert(googleData);
  // }

  return (
    <div className="App">

      <Router>
          <Routes>

            {/* Common Login Page */}
            <Route path="/" element={<LoginPage/>} />

            <Route path="/homepage" element={<HomePage/>} />
            <Route path="/allevents" element={<AllEvents/>} />
            <Route path="/allevents/bookTicket" element={<BookTicket/>} />

          </Routes>
        </Router>
    </div>
  );
}

export default App;
