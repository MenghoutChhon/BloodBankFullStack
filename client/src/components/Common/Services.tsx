import React from 'react';

const Services: React.FC = () => (
  <section className="services p-6 bg-gray-100">
    <h2 className="text-3xl font-bold text-center mb-6">Our Services</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="service-card p-4 bg-white shadow-lg rounded">
        <h3 className="font-semibold">Blood Donation</h3>
        <p>Facilitating easy blood donations to save lives.</p>
      </div>
      <div className="service-card p-4 bg-white shadow-lg rounded">
        <h3 className="font-semibold">Emergency Support</h3>
        <p>Immediate response in urgent blood requirements.</p>
      </div>
      <div className="service-card p-4 bg-white shadow-lg rounded">
        <h3 className="font-semibold">Health Check-ups</h3>
        <p>Regular health screening camps and awareness.</p>
      </div>
    </div>
  </section>
);

export default Services;