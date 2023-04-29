import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import axios from "axios";
import './allEvents.css';
import BookTicket from './bookTicket.js';



function AllEvents() {

  var event_id = useRef(null);

  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
const [showForm, setShowForm]= useState(false);

  useEffect(() => {
    fetch('http://localhost:8081/events')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setData(data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

const handleClick= ({id}) => {
  setShowForm(true);
  event_id.current= id;
  console.log(id);
  console.log(event_id);
}


  const filteredData = data.filter((item) => {
    const eventDate = new Date(item.startTime).toISOString().slice(0, 10);

    const startDateMatch = !startDate || eventDate >= startDate;
    console.log('startDateMatch:', startDateMatch);

    const endDateMatch = !endDate || eventDate <= endDate;
    console.log('endDateMatch:', endDateMatch);

    const categoryMatch = !category || item.category === category;
    console.log('categoryMatch:', categoryMatch);

    const locationMatch = !location || item.location === location;
    console.log('locationMatch:', locationMatch);

    return (startDateMatch && endDateMatch) && categoryMatch && locationMatch;
  });

  return (
    <div>
      <button type="button" class="btn btn-success">
        <a class="nav-link" href='/homepage'>Home</a>
      </button>
      <br></br><br></br>
      <div>
        Filter by Start Date :
        <input type="date" value={startDate} onChange={handleStartDateChange} />

        <br></br>
        Filter by End Date :
        <input type="date" value={endDate} onChange={handleEndDateChange} />

        <br></br>
        Filter by Category :
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="music">Music</option>
          <option value="sports">Sports</option>
          <option value="art">Art</option>
        </select>

        <br></br>
        Filter by Location :
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">--Select a location--</option>
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Vadodara">Vadodara</option>
          <option value="Surat">Surat</option>
          <option value="art">Rajkot</option>
        </select>
      </div>


      <div class="event-container">
        {filteredData.map(item => (
          <div key={item.id} class="event-card card">
            <h2 class="card-header">{item.eventName}</h2>
            <div class="card-body">
              <p>{new Date(item.startTime).toLocaleDateString("en-US", {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short'})}</p>
              <p>{new Date(item.endTime).toLocaleDateString("en-US", {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short'})}</p>
              <p>{item.location}</p>
              <p>{item.description}</p>
              <p>{item.category}</p>
              <p>{item.bannerImage}</p>
              <p>Event id= {item.id}</p>
              <div>
                <button type="button" class="btn btn-success" onClick={() => handleClick(item)}> Book your tickets now
                  {/* <Link to={`/allevents/bookTicket`} class="btn btn-success">
                    Book your tickets now
                  </Link>               */}
                </button>
                {showForm && event_id.current === item.id && <BookTicket event_id= {event_id.current} setShowForm= {setShowForm}/>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllEvents;
