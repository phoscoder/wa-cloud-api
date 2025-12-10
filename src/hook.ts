import 'dotenv/config'
import Server from './classes/server'


let notificationServer = new Server(
    process.env.LISTEN_PORT,
    process.env.VERIFY_TOKEN
)

let app = notificationServer.start(async (rawData, processedPayload) => {
    // NOTE: raw_data is the raw data you recieve from Whatsapp 
    // NOTE: processed_data is a object of ProcessPayload, 
    // NOTE: it contains both the data and helper functions
    // TIP FOR BEGINNERS: use processed_data
     


    if (processedPayload.type == "messages"){
        let messages = processedPayload.getMessages()

        for (const message of messages){
            if (message.type == "text"){
                // console.log("Message Data: ", message)
                return message
            }

            else if (message.type == "image"){
                // console.log("Image Message Data: ", message)
                return message
            }

            else if (message.type == "sticker"){
                // console.log("Sticker Message Data: ", message)
                return message
            }

            else if (message.type == "video"){
                // console.log("Video Message Data: ", message)
                return message
            }

            else if (message.type == "audio"){
                // console.log("Audio Message Data: ", message)
                return message
            }

            else if (message.type == "document"){
                // console.log("Document Message Data: ", message)
                return message
            }

            else if (message.type == "location"){
                // console.log("Location Message Data: ", message)
                return message
            }

            else if (message.type == "contacts"){
                // console.log("Contacts Message Data: ", message)
                return message
            }
        }
    } 

    // // console.log("Payload Type: ", processedPayload.type)
    // // console.log("Payload Data: ", processedPayload.data.entry[0].changes[0].value)

    return "Thanks, notification recieved!"



})

export default app

