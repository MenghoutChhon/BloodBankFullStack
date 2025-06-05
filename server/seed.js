// seed.js (Cambodia context - run: node seed.js)
require("dotenv").config();
const mongoose = require("mongoose");
const Donor = require("./models/Donor");
const Hospital = require("./models/Hospital");
const Booking = require("./models/Booking");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

async function main() {
  await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/blood_donation_db");

  // Wipe existing data
  await Donor.deleteMany();
  await Hospital.deleteMany();
  await Booking.deleteMany();
  await User.deleteMany();

  // Seed donors (Cambodian names, Khmer phone numbers)
  const donors = await Donor.insertMany([
    {
      fullName: "Chhunly Sok",
      email: "chhunly.sok@gmail.com",
      password: await bcrypt.hash("test", 10),
      blood: "A+",
      phone: "093222111",
      unitsDonated: 3,
    },
    {
      fullName: "Sreymom Hun",
      email: "sreymom.hun@gmail.com",
      password: await bcrypt.hash("test", 10),
      blood: "O-",
      phone: "015334455",
      unitsDonated: 5,
    },
    {
      fullName: "Vuthy Chea",
      email: "vuthy.chea@gmail.com",
      password: await bcrypt.hash("test", 10),
      blood: "B+",
      phone: "069876543",
      unitsDonated: 2,
    },
  ]);

  // Seed hospitals (Cambodian hospitals, Khmer-style address, phone)
  const hospitals = await Hospital.insertMany([
    {
      name: "Calmette Hospital",
      email: "calmette@hospital.com",
      password: await bcrypt.hash("test", 10),
      address: "Yothapol Khemarak Phoumin Blvd, Phnom Penh",
      phone: "023430514",
      bloodStock: { "A+": 12, "O-": 5, "B+": 8 },
    },
    {
      name: "Royal Phnom Penh Hospital",
      email: "royalpp@hospital.com",
      password: await bcrypt.hash("test", 10),
      address: "Street 271, Sangkat Phsar Doeum Thkov, Phnom Penh",
      phone: "023991000",
      bloodStock: { "O+": 10, "A-": 2, "AB+": 3 },
    },
    {
      name: "Angkor Hospital for Children",
      email: "angkor@ahc.org",
      password: await bcrypt.hash("test", 10),
      address: "Oum Chhay Street, Krong Siem Reap",
      phone: "063963409",
      bloodStock: { "B+": 6, "A+": 4, "O-": 2 },
    },
  ]);

  // Seed bookings/requests (Cambodian context)
  await Booking.insertMany([
    { donor: donors[0]._id, hospital: hospitals[0]._id, type: "A+", units: 1, status: "pending", createdAt: new Date() },
    { donor: donors[1]._id, hospital: hospitals[1]._id, type: "O-", units: 2, status: "approved", createdAt: new Date() },
    { donor: donors[2]._id, hospital: hospitals[2]._id, type: "B+", units: 1, status: "pending", createdAt: new Date() }
  ]);

  // Seed users (admin/staff with Khmer names/emails)
  await User.insertMany([
    {
      name: "Sopheap Chan",
      email: "admin.khmer@hospital.com",
      password: await bcrypt.hash("admin", 10),
      role: "admin",
    },
    {
      name: "Borey Heng",
      email: "staff.khmer@hospital.com",
      password: await bcrypt.hash("staff", 10),
      role: "staff",
    }
  ]);

  console.log("✅ Seeded Cambodian demo donors, hospitals, bookings, and admin users!");
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
