import React, { useEffect, useState } from 'react';
import { getBookings, updateBookingStatus } from '../../services/bookingService';
import { useAuthContext } from '../../contexts/AuthContext';

const BookingManagement: React.FC = () => {
  const { user, token } = useAuthContext();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings for the hospital
  const fetchBookings = async () => {
    if (!user || !token) return;
    setLoading(true);
    try {
      const res = await getBookings({ hospitalId: user.id }, token);
      setBookings(res.data);
    } catch (err) {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and whenever user/token changes
  useEffect(() => {
    if (user && token) {
      fetchBookings();
    }
    // eslint-disable-next-line
  }, [user, token]);

  // Update booking status (accept/reject)
  const handleStatus = async (id: string, status: string) => {
    if (!token) return;
    try {
      await updateBookingStatus(id, status, token);
      fetchBookings();
    } catch (err) {
      // Optionally show an error to the user here
    }
  };

  // Show loading or not authorized
  if (!user || !token) {
    return <div>Loading or not authorized...</div>;
  }

  return (
    <div>
      <h2>Hospital Booking Management</h2>
      {loading ? (
        <div>Loading...</div>
      ) : bookings.length === 0 ? (
        <div>No bookings found.</div>
      ) : (
        bookings.map(b => (
          <div key={b._id}>
            Donor: {b.donor?.name}, Date: {b.date}, Status: {b.status}
            {b.status === 'pending' && (
              <>
                <button onClick={() => handleStatus(b._id, 'confirmed')}>Accept</button>
                <button onClick={() => handleStatus(b._id, 'rejected')}>Reject</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default BookingManagement;
