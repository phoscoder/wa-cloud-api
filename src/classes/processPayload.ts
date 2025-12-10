import { Message, NotificationPayload } from "../types/event";

class ProcessPayload{
    data: NotificationPayload
    type: string

    constructor(data:NotificationPayload){
        this.data = data 
        this.getType()
    }

    getValue = () => this.data.entry[0].changes[0].value

    getType(){
        let value_keys = Object.keys(this.getValue())

        if (value_keys.includes("messages")){
            this.type = "messages"
        }else if (value_keys.includes("status")){
            this.type = "statuses"
        }else if (value_keys.includes("contacts")){
            this.type = "contacts"
        }
    }

    getMediaLinks(id: string | number){
        // Use the media api to fetch image data 



    }

    processMessage(m:Message){

        let possible_media = [
            "image",
            "video",
            "audio",
            "document",
            "sticker"
        ]

        let message_keys = Object.keys(m)
        if (message_keys.includes("location")){
            m.type = "location"
        }

        if (message_keys.includes("contacts")){
            m.type = "contacts"
        }

        if (message_keys.includes("referral")){
            m.type = "referral"
        }

        m.has_media = false

        for (const key of message_keys){
            if (possible_media.includes(key)){
                m.has_media = true
                break
            }
        }

        return m
    }

    getMessages(){
        let raw_messages =  this.data.entry[0].changes[0].value.messages

        let messages:Message[] = raw_messages.map(m => {
            let processed_message = this.processMessage(m)
            return processed_message
        })

        return messages
    }

    getStatuses(){
        return this.data.entry[0].changes[0].value?.statuses
    }

    getContacts(){
        return this.data.entry[0].changes[0].value?.contacts
    }

    getErrors(){
        return this.data.entry[0].changes[0].value?.errors
    }

    getMetadata(){
        return this.data.entry[0].changes[0].value?.metadata
    }
}

export default ProcessPayload