// Import the WhatsApp Cloud API package
const { WhatsApp } = require('@phoscoder/whatsapp-cloud-api');
import { config } from 'dotenv';
config();

// Set up your credentials
// Replace these with your actual values from Facebook Developer Portal
// e.g., '255757902132'
const TOKEN = process.env.TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const RECIPIENT = process.env.RECIPIENT;

// Initialize the WhatsApp messenger
const messenger = new WhatsApp(TOKEN, PHONE_NUMBER_ID);

// Example 1: Send a simple text message
async function sendTextMessage() {
  try {
    const response = await messenger.send_message(
      'Hello! This is a test message from WhatsApp Cloud API',
      RECIPIENT
    );
    console.log('Message sent successfully:', response);
  } catch (error) {
    console.error('Error sending message:', error.message);
  }
}

// Example 2: Send an image
async function sendImage() {
  try {
    const response = await messenger.send_image({
      image: 'https://i.imgur.com/Fh7XVYY.jpeg',
      recipient_id: RECIPIENT,
    });
    console.log('Image sent successfully:', response);
  } catch (error) {
    console.error('Error sending image:', error);
  }
}

// Example 3: Send a video
async function sendVideo() {
  try {
    const response = await messenger.send_video({
      video: 'https://www.youtube.com/watch?v=K4TOrB7at0Y',
      recipient_id: RECIPIENT,
    });
    console.log('Video sent successfully:', response);
  } catch (error) {
    console.error('Error sending video:', error);
  }
}

// Example 4: Send a document
async function sendDocument() {
  try {
    const response = await messenger.send_document({
      document: 'http://www.africau.edu/images/default/sample.pdf',
      recipient_id: RECIPIENT,
    });
    console.log('Document sent successfully:', response);
  } catch (error) {
    console.error('Error sending document:', error);
  }
}

// Example 5: Send location
async function sendLocation() {
  try {
    const response = await messenger.send_location({
      lat: 1.29,
      long: 103.85,
      name: 'Singapore',
      address: 'Singapore',
      recipient_id: RECIPIENT,
    });
    console.log('Location sent successfully:', response);
  } catch (error) {
    console.error('Error sending location:', error);
  }
}

// Example 6: Send interactive buttons
async function sendButton() {
  try {
    const response = await messenger.send_button({
      recipient_id: RECIPIENT,
      button: {
        header: 'Banking Services',
        body: 'Please select an option below',
        footer: 'Powered by Your Bank',
        action: {
          button: 'Services',
          sections: [
            {
              title: 'iBank',
              rows: [
                { id: 'row 1', title: 'Send Money', description: 'Transfer funds to another account' },
                { id: 'row 2', title: 'Withdraw money', description: 'Withdraw from your account' },
              ],
            },
          ],
        },
      },
    });
    console.log('Button sent successfully:', response);
  } catch (error) {
    console.error('Error sending button:', error);
  }
}

// Example 7: Send a template message
async function sendTemplate() {
  try {
    const response = await messenger.send_template('hello_world', RECIPIENT);
    console.log('Template sent successfully:', response);
  } catch (error) {
    console.error('Error sending template:', error);
  }
}

// Run examples
// Uncomment the function you want to test
(async () => {
  console.log('WhatsApp Cloud API Examples\n');
  
  // await sendTextMessage();
  await sendImage();
  // await sendVideo();
  // await sendDocument();
  // await sendLocation();
  // await sendButton();
  // await sendTemplate();
})();

// Export functions for use in other files
module.exports = {
  sendTextMessage,
  sendImage,
  sendVideo,
  sendDocument,
  sendLocation,
  sendButton,
  sendTemplate,
};
