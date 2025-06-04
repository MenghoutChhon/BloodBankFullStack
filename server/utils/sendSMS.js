const twilio = require('twilio');

function getClient() {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) return null;
  return twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
}

module.exports = async function sendSMS(to, body) {
  const client = getClient();
  const from = process.env.TWILIO_FROM_NUMBER;
  if (!client || !from) {
    console.warn('Twilio credentials not configured, skipping SMS');
    return;
  }
  try {
    await client.messages.create({ to, from, body });
  } catch (err) {
    console.error('Failed to send SMS:', err.message);
  }
};
