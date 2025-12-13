import WhatsApp from "./classes/whatsapp";
import ProcessPayload from "./classes/processPayload";
import Server from "./classes/server";
import { NotificationPayload } from "./types/event"

module.exports = {
    WhatsApp,
    ProcessPayload,
    Server,
    
    // @ts-ignore
    NotificationPayload
}

export {
    WhatsApp,
    ProcessPayload,
    Server,
    NotificationPayload
}
