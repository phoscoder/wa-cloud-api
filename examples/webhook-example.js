// Import required packages
const { WhatsApp } = require("@phoscoder/whatsapp-cloud-api");
const Server =
  require("@phoscoder/whatsapp-cloud-api/dist/classes/server").default;

// Load environment variables (create a .env file with these values)
require("dotenv").config();

// Configuration
const TOKEN = process.env.WHATSAPP_TOKEN || "YOUR_ACCESS_TOKEN_HERE";
const PHONE_NUMBER_ID =
  process.env.PHONE_NUMBER_ID || "YOUR_PHONE_NUMBER_ID_HERE";
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "your_verify_token";
const LISTEN_PORT = process.env.LISTEN_PORT || 3000;

// Initialize WhatsApp messenger for sending responses
const messenger = new WhatsApp(TOKEN, PHONE_NUMBER_ID);

// Initialize notification server
const notificationServer = new Server(LISTEN_PORT, VERIFY_TOKEN);

// Handle incoming notifications
async function handleNotifications(rawData, processedPayload) {
  console.log("Received notification");

  try {
    // Get messages from the payload
    const messages = processedPayload.get_messages();
    const contacts = processedPayload.get_contacts();
    const statuses = processedPayload.get_statuses();

    if (messages && messages.length > 0) {
      for (const message of messages) {
        console.log("Message received:", message);

        const senderId = message.from;
        const messageType = message.type;

        // Handle different message types
        switch (messageType) {
          case "text":
            await handleTextMessage(message, senderId);
            break;

          case "image":
            await handleImageMessage(message, senderId);
            break;

          case "video":
            await handleVideoMessage(message, senderId);
            break;

          case "audio":
            await handleAudioMessage(message, senderId);
            break;

          case "document":
            await handleDocumentMessage(message, senderId);
            break;

          case "location":
            await handleLocationMessage(message, senderId);
            break;

          case "interactive":
            await handleInteractiveMessage(message, senderId);
            break;

          default:
            console.log(`Unsupported message type: ${messageType}`);
        }
      }
    }

    // Handle message status updates (sent, delivered, read, etc.)
    if (statuses && statuses.length > 0) {
      for (const status of statuses) {
        console.log("Status update:", status);
        // You can track message delivery status here
      }
    }
  } catch (error) {
    console.error("Error handling notification:", error);
  }
}

// Handle text messages
async function handleTextMessage(message, senderId) {
  const text = message.text.body.toLowerCase();
  console.log(`Text message from ${senderId}: ${text}`);

  // Simple echo bot
  if (text.includes("hello") || text.includes("hi")) {
    await messenger.sendMessage("Hello! How can I help you today?", senderId);
  } else if (text.includes("help")) {
    await messenger.sendMessage(
      'Available commands:\n- Say "hello" to get a greeting\n- Say "help" to see this message\n- Say "menu" to see options',
      senderId,
    );
  } else if (text.includes("menu")) {
    await messenger.sendButton(senderId, {
      header: "Main Menu",
      body: "Please select an option:",
      footer: "Powered by WhatsApp Cloud API",
      action: {
        button: "Options",
        sections: [
          {
            title: "Services",
            rows: [
              {
                id: "service_1",
                title: "Service 1",
                description: "Description for service 1",
              },
              {
                id: "service_2",
                title: "Service 2",
                description: "Description for service 2",
              },
            ],
          },
        ],
      },
    });
  } else {
    await messenger.sendMessage(`You said: "${message.text.body}"`, senderId);
  }
}

// Handle image messages
async function handleImageMessage(message, senderId) {
  console.log(`Image received from ${senderId}`);

  // Get media details
  const mediaId = message.image.id;
  const mediaData = await messenger.getMedia(mediaId);

  console.log("Media data:", mediaData);

  await messenger.sendMessage("Thank you for the image!", senderId);
}

// Handle video messages
async function handleVideoMessage(message, senderId) {
  console.log(`Video received from ${senderId}`);
  await messenger.sendMessage("Thank you for the video!", senderId);
}

// Handle audio messages
async function handleAudioMessage(message, senderId) {
  console.log(`Audio received from ${senderId}`);
  await messenger.sendMessage("Thank you for the audio message!", senderId);
}

// Handle document messages
async function handleDocumentMessage(message, senderId) {
  console.log(`Document received from ${senderId}`);
  await messenger.sendMessage("Thank you for the document!", senderId);
}

// Handle location messages
async function handleLocationMessage(message, senderId) {
  const { latitude, longitude } = message.location;
  console.log(`Location received from ${senderId}: ${latitude}, ${longitude}`);
  await messenger.sendMessage(
    `Received your location: ${latitude}, ${longitude}`,
    senderId,
  );
}

// Handle interactive messages (button responses, list responses)
async function handleInteractiveMessage(message, senderId) {
  console.log(`Interactive message from ${senderId}:`, message.interactive);

  if (message.interactive.type === "button_reply") {
    const buttonId = message.interactive.button_reply.id;
    await messenger.sendMessage(`You selected button: ${buttonId}`, senderId);
  } else if (message.interactive.type === "list_reply") {
    const listId = message.interactive.list_reply.id;
    const listTitle = message.interactive.list_reply.title;
    await messenger.sendMessage(`You selected: ${listTitle}`, senderId);
  }
}

// Start the server
const app = notificationServer.start(handleNotifications);

console.log(`\nWebhook server started on port ${LISTEN_PORT}`);
console.log(`Verify token: ${VERIFY_TOKEN}`);
console.log(
  "\nMake sure to configure your webhook URL in Facebook Developer Portal:",
);
console.log(`Webhook URL: https://your-domain.com/webhook`);
console.log(`Verify Token: ${VERIFY_TOKEN}\n`);
