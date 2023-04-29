import React, { useState } from "react";
import axios from "axios";


const EventForm = ({eventName, setEventName, startTime, setStartTime, endTime, setEndTime, location, setLocation, description, setDescription, category, setCategory, bannerImage, setBannerImage, formData, setFormData, setShowForm}) => {
 

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      eventName,
      startTime,
      endTime,
      location,
      description,
      category,
      bannerImage,
    };
  
    try {
      const response = await axios.post("http://localhost:8081/events", formData);
      console.log(response.data);
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div class="container mt-3">
      <h2>Create new Event</h2>

      <form onSubmit={handleFormSubmit}>
      <div class="mb-3 mt-3">
        <label>Event Name: </label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
       
      </div>

      <div class="mb-3 mt-3">
        <label>Start Time:</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
      </div>

      <div class="mb-3 mt-3">
        <label>End Time:</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
      </div>

      <div class="mb-3 mt-3">
        <label>Location:</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">--Select a location--</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Vadodara">Vadodara</option>
              <option value="Surat">Surat</option>
              <option value="Rajkot">Rajkot</option>
            </select>
         
      </div>

      <div class="mb-3 mt-3">
        <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
      </div>

      <div class="mb-3 mt-3">
        <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">--Select a category--</option>
            <option value="music">Music</option>
            <option value="art">Art</option>
            <option value="sports">Sports</option>
            <option value="food">Food</option>
            <option value="other">Other</option>
          </select>
      </div>

      <div class="mb-3">
        <label>Banner Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBannerImage(e.target.files[0])}
            />
      </div>
      
      <button class="btn btn-success" type="submit">Create Event</button>
      </form>
      {formData && (
        <div>
          <h2>Form Data:</h2>
          <p>Event Name: {formData.eventName}</p>
          <p>Start Time: {formData.startTime}</p>
          <p>End Time: {formData.endTime}</p>
          <p>Location: {formData.location}</p>
          <p>Description: {formData.description}</p>
          <p>Category: {formData.category}</p>
          <p>Banner Image: {formData.bannerImage.name}</p>
        </div>
      )}
    </div>
  );
};

export default EventForm;
