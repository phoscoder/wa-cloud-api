# WhatsApp Cloud API Examples

This directory contains examples demonstrating how to use the `@phoscoder/whatsapp-cloud-api` package in a Node.js project.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Fill in your WhatsApp Cloud API credentials from [Facebook Developer Portal](https://developers.facebook.com/)

   ```bash
   cp .env.example .env
   ```

3. **Get your credentials:**
   - Go to [Facebook Developer Portal](https://developers.facebook.com/apps)
   - Create a new app or select an existing one
   - Add WhatsApp Messenger product
   - Get your **TOKEN** and **PHONE_NUMBER_ID**
   - Verify your test recipient phone number

## Examples

### 1. Basic Usage (`basic-usage.js`)

Demonstrates how to send different types of messages:
- Text messages
- Images
- Videos
- Documents
- Location
- Interactive buttons
- Template messages

**Run it:**
```bash
node basic-usage.js
```

Make sure to:
- Update the `TOKEN`, `PHONE_NUMBER_ID`, and `RECIPIENT` variables
- Uncomment the function you want to test in the main execution block

### 2. Webhook Example (`webhook-example.js`)

Demonstrates how to set up a webhook server to receive incoming messages and events.

**Run it:**
```bash
node webhook-example.js
```

Features:
- Handles incoming text messages
- Responds to different commands (hello, help, menu)
- Handles media messages (images, videos, audio, documents)
- Handles location messages
- Handles interactive message responses
- Tracks message delivery status

**Setting up the webhook:**
1. Deploy your webhook to a public server (or use ngrok for local testing)
2. Go to Facebook Developer Portal
3. Configure webhook settings:
   - **Webhook URL:** `https://your-domain.com/webhook`
   - **Verify Token:** Use the same token from your `.env` file
4. Subscribe to webhook fields (messages, message_status, etc.)

## Using with Environment Variables

Both examples support environment variables. Create a `.env` file:

```bash
WHATSAPP_TOKEN=your_actual_token
PHONE_NUMBER_ID=your_phone_number_id
VERIFY_TOKEN=your_verify_token
LISTEN_PORT=3000
TEST_RECIPIENT=recipient_phone_number
```

Then modify the examples to use:

```javascript
require('dotenv').config();
const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
```

## Important Notes

1. **Media URLs:** When sending media, the URL must be publicly accessible and return the correct content-type header.

2. **Phone Number Format:** Use international format without '+' or '00' prefix (e.g., `255757902132` for a Tanzanian number).

3. **Template Messages:** Template messages must be pre-approved in the Facebook Business Manager before you can use them.

4. **Rate Limits:** Be aware of WhatsApp Cloud API rate limits. Check the [official documentation](https://developers.facebook.com/docs/whatsapp/cloud-api) for details.

5. **Media Download:** Media URLs from `get_media()` are only valid for 5 minutes. Download and store them immediately if needed.

## Resources

- [WhatsApp Cloud API Documentation](https://developers.facebook.com/docs/whatsapp/cloud-api)
- [Facebook Developer Portal](https://developers.facebook.com/)
- [Package Repository](https://github.com/phoscoder/wa-cloud-api)
- [NPM Package](https://www.npmjs.com/package/@phoscoder/whatsapp-cloud-api)

## Support

If you encounter any issues, please open an issue on the [GitHub repository](https://github.com/phoscoder/wa-cloud-api/issues).
