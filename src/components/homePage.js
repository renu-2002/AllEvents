import React, { useState } from 'react';
import EventForm from './eventForm';

export default function HomePage() {
    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
      setShowForm(!showForm);
    };

    const [eventName, setEventName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [bannerImage, setBannerImage] = useState("");
    const [formData, setFormData] = useState(null);

  return (
    <>
    
        {!showForm && <button onClick={handleClick}>Create a new Event</button>}
        {showForm && <EventForm eventName= {eventName} setEventName={setEventName} startTime= {startTime} setStartTime= {setStartTime} endTime= {endTime} setEndTime= {setEndTime} location= {location} setLocation= {setLocation} description= {description} setDescription= {setDescription} category= {category} setCategory= {setCategory} bannerImage= {bannerImage} setBannerImage= {setBannerImage} formData= {formData} setFormData= {setFormData} setShowForm= {setShowForm}/>}
        <br></br><br></br>
        <button type="button" class="btn btn-success">
          <a class="nav-link" href='/allevents'>See all Events</a>
        </button>
        {/* <TestHomePage/> */}
    </>
  );
}
