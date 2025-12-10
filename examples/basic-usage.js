// Import the WhatsApp Cloud API package
const { WhatsApp, Server } = require("@phoscoder/whatsapp-cloud-api");
const { config } = require("dotenv");
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
    const response = await messenger.sendMessage(
      "Hello! This is a test message from WhatsApp Cloud API",
      RECIPIENT,
    );
    console.log("Message sent successfully:", response);
  } catch (error) {
    console.error("Error sending message:", error.message);
  }
}

// Example 2: Send an image
async function sendImage() {
  try {
    const response = await messenger.sendImage(
      "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
      RECIPIENT,
      undefined,
      "A cute dog",
    );
    console.log("Image sent successfully:", response);
  } catch (error) {
    console.error("Error sending image:", error);
  }
}

// Example 3: Send a video
async function sendVideo() {
  try {
    const response = await messenger.sendVideo(
      "https://www.youtube.com/watch?v=K4TOrB7at0Y",
      RECIPIENT,
    );
    console.log("Video sent successfully:", response);
  } catch (error) {
    console.error("Error sending video:", error);
  }
}

// Example 4: Send a document
async function sendDocument() {
  try {
    const response = await messenger.sendDocument(
      "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf",
      RECIPIENT,
    );
    console.log("Document sent successfully:", response);
  } catch (error) {
    console.error("Error sending document:", error);
  }
}

// Example 5: Send location
async function sendLocation() {
  try {
    const response = await messenger.sendLocation(
      1.29,
      103.85,
      "Singapore",
      "Singapore",
      RECIPIENT,
    );
    console.log("Location sent successfully:", response);
  } catch (error) {
    console.error("Error sending location:", error);
  }
}

// Example 6: Send interactive buttons
async function sendButton() {
  try {
    const response = await messenger.sendButton(RECIPIENT, {
      header: "Banking Services",
      body: "Please select an option below",
      footer: "Powered by Your Bank",
      action: {
        button: "Services",
        sections: [
          {
            title: "iBank",
            rows: [
              {
                id: "row 1",
                title: "Send Money",
                description: "Transfer funds to another account",
              },
              {
                id: "row 2",
                title: "Withdraw money",
                description: "Withdraw from your account",
              },
            ],
          },
        ],
      },
    });
    console.log("Button sent successfully:", response);
  } catch (error) {
    console.error("Error sending button:", error);
  }
}

// Example 7: Send a template message
async function sendTemplate() {
  try {
    const response = await messenger.sendTemplate("hello_world", RECIPIENT);
    console.log("Template sent successfully:", response);
  } catch (error) {
    console.error("Error sending template:", error);
  }
}

// Run examples
// Uncomment the function you want to test
(async () => {
  console.log("WhatsApp Cloud API Examples\n");

  // await sendTextMessage();
  // await sendImage();
  // await sendVideo();
  // await sendDocument();
  // await sendLocation();
  // await sendButton();
  // await sendTemplate();
})();

let notificationServer = new Server(
    process.env.VERIFY_TOKEN,
    6000
)

let app = notificationServer.start(async (rawData ,processedPayload) => {
  // Do your stuff here
  // let messages = processedPayload.getMessages()
  // let metadata = processedPayload.getContacts()
  // let contacts = processedPayload.getContacts()
  // let status = processedPayload.getStatuses()
  
   console.log("processedPayload Type: ", processedPayload.type)
  console.log("processedPayload: ", JSON.stringify(rawData))
  console.log("contacts ", processedPayload.getContacts())
  
  
  console.log(processedPayload.type == "messages" ? processedPayload.getMessages() : processedPayload.getStatuses())

  // Do other stuff here
})