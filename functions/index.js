const dotenv = require('dotenv');
dotenv.config(); // Load environment variables (if using .env file)

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const twilio = require('twilio');

admin.initializeApp(); // Initialize Firebase Admin SDK

// Retrieve Twilio credentials

// Initialize Twilio client
const client = twilio(accountSid, authToken);

// Example function to send a notification
exports.sendNotification = functions.https.onRequest((req, res) => {
  res.send('Notification sent!');
});

// Function to check subscription expiry
exports.checkSubscriptionExpiry = functions.pubsub.schedule('every 24 hours').onRun(async () => {
  const today = new Date().toISOString().split('T')[0]; // Define 'today'
  const db = admin.firestore(); // Initialize Firestore
  const membersRef = db.collection('members'); // Reference to the 'members' collection
  const snapshot = await membersRef.where('subscriptionEndDate', '==', today).get();

  if (snapshot.empty) {
    console.log('No members with expiring subscriptions today.');
    return null;
  }

  snapshot.forEach(async (doc) => {
    const member = doc.data();
    const message = `Hi ${member.name}, your gym subscription has expired. Please renew to continue enjoying our services!`;

    try {
      await client.messages.create({
        body: message,
        from: 'whatsapp:+14155238886', // Your Twilio WhatsApp Sandbox number
        to: `whatsapp:${member.phone}`,
      });
      console.log(`Notification sent to ${member.name}`);
    } catch (error) {
      console.error(`Failed to send notification to ${member.name}:`, error);
    }
  });
});
