import React, { useState } from 'react';
import axios from "axios";
import { useLocation } from 'react-router-dom';


export default 
function BookTicket({event_id, setShowForm}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tickets, setTickets] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

console.log(event_id);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const bookingData = {
        event_id,
        name,
        email,
        phone,
        tickets
    };

    setShowForm(false);
    try {
        const response = await axios.post("http://localhost:8081/book_ticket", bookingData);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
      
  };

  return (
    <div>
      <h1>Book Your Tickets</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Phone:
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <label>
          Number of Tickets:
          <input type="number" value={tickets} onChange={(e) => setTickets(parseInt(e.target.value))} min="1" max="10" required />
        </label>
        <button type="submit">Book Tickets</button>
      </form>
    </div>
  );
}
