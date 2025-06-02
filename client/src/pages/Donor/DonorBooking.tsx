import React, { useState, useEffect } from 'react';
import { createBooking, cancelBooking, getBookings } from '../../services/bookingService';
import { useAuthContext } from '../../contexts/AuthContext';

const Booking: React.FC = () => {
  const { user, token } = useAuthContext();
  const [bookings, setBookings] = useState<any[]>([]);
  const [date, setDate] = useState('');
  const [hospitalId, setHospitalId] = useState('');
  const [survey, setSurvey] = useState({ fever: false, medication: false, travelHistory: false });

  const fetchBookings = async () => {
    if (!user || !token) return;
    const res = await getBookings({ donorId: user.id }, token);
    setBookings(res.data);
  };

  useEffect(() => {
    if (user && token) {
      fetchBookings();
    }
    // eslint-disable-next-line
  }, [user, token]);

  const handleBook = async () => {
    if (!user || !token) return;
    await createBooking({ donorId: user.id, hospitalId, date, survey }, token);
    fetchBookings();
  };

  const handleCancel = async (id: string) => {
    if (!token) return;
    await cancelBooking(id, token);
    fetchBookings();
  };

  if (!user || !token) {
    return <div>Please log in to view or book donations.</div>;
  }

  return (
    <div>
      <h2>Book Donation</h2>
      <label>
        Select Date:
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          title="Select donation date"
        />
      </label>
      <input type="text" placeholder="Hospital ID" value={hospitalId} onChange={e => setHospitalId(e.target.value)} />
      <label>
        Fever? <input type="checkbox" checked={survey.fever} onChange={e => setSurvey(s => ({ ...s, fever: !s.fever }))} />
      </label>
      {/* Add other survey fields */}
      <button onClick={handleBook}>Book</button>
      <h3>My Bookings</h3>
      {bookings.map(b => (
        <div key={b._id}>
          {b.date} - {b.status}
          {b.status === 'pending' && <button onClick={() => handleCancel(b._id)}>Cancel</button>}
        </div>
      ))}
    </div>
  );
};

export default Booking;
