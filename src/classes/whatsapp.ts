import axios from "axios";

const VERSION = "v24.0";

export default class WhatsApp{
    phone_number_id: string
    token: string
    headers: { "Content-Type": string; Authorization: string }
    url: string;

    constructor(token:string = "", phone_number_id: string = ""){
        this.token = token 
        this.phone_number_id = phone_number_id
        this.url = `https://graph.facebook.com/${VERSION}/${phone_number_id}/messages`
        this.headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    async send_message(
         message:string, recipient_id:string, recipient_type ="individual", preview_url =true
    ){
        let data = {
            "messaging_product": "whatsapp",
            "recipient_type": recipient_type,
            "to": recipient_id,
            "type": "text",
            "text": {"preview_url": preview_url, "body": message},
        }


        let r = await axios.post(this.url, data, {
            headers: this.headers
        })

        return r 
    }

    async send_template(template:any, recipient_id: string, components: any[] = [], lang:string ="en_US"){
        let data = {
            "messaging_product": "whatsapp",
            "to": recipient_id,
            "type": "template",
            "template": {
                "name": template, 
                "language": {"code": lang},
                "components": [
                    ...components
                ]},
        }
        let  r = await axios.post(this.url, data, {
             headers: this.headers
        })
        return r
    }

    async send_location(lat: any, long: any, name: any, address: any, recipient_id: any){
        let data = {
            "messaging_product": "whatsapp",
            "to": recipient_id,
            "type": "location",
            "location": {
                "latitude": lat,
                "longitude": long,
                "name": name,
                "address": address,
            },
        }
        let  r = await axios.post(this.url, data, {
             headers: this.headers
        })
        return r
    }

    async send_image(
        image: any,
        recipient_id: any,
        recipient_type="individual",
        caption=null,
        link=true,
    ){

        let data
        if (link){
            data = {
                "messaging_product": "whatsapp",
                "recipient_type": recipient_type,
                "to": recipient_id,
                "type": "image",
                "image": {"link": image, "caption": caption},
            }

        }else{
            data = {
                "messaging_product": "whatsapp",
                "recipient_type": recipient_type,
                "to": recipient_id,
                "type": "image",
                "image": {"id": image, "caption": caption},
            }
        }

        let  r = await axios.post(this.url, data, {
             headers: this.headers
        })
        return r
    }

    async send_audio( audio: any, recipient_id: any, link=true){
        let data    
        if (link){
            data = {
                "messaging_product": "whatsapp",
                "to": recipient_id,
                "type": "audio",
                "audio": {"link": audio},
            }
        }else{
            data = {
                "messaging_product": "whatsapp",
                "to": recipient_id,
                "type": "audio",
                "audio": {"id": audio},
            }
        }

        let  r = await axios.post(this.url, data, {
             headers: this.headers
        })
        return r
    }

    async send_video( video: any, recipient_id: any, caption=null, link=true){
        let data
        if (link){
            data = {
                "messaging_product": "whatsapp",
                "to": recipient_id,
                "type": "video",
                "video": {"link": video, "caption": caption},
            }
        }else{
            data = {
                "messaging_product": "whatsapp",
                "to": recipient_id,
                "type": "video",
                "video": {"id": video, "caption": caption},
            }
        }
        let  r = await axios.post(this.url, data, {
             headers: this.headers
        })
        return r
    }

    async send_document(document: any, recipient_id: any, caption=null, link=true){
        let data
        if (link){
            data = {
                "messaging_product": "whatsapp",
                "to": recipient_id,
                "type": "document",
                "document": {"link": document, "caption": caption},
            }
        }else{
            data = {
                "messaging_product": "whatsapp",
                "to": recipient_id,
                "type": "document",
                "document": {"id": document, "caption": caption},
            }
        }

        let  r = await axios.post(this.url, data, {
             headers: this.headers
        })
        return r
    }

    create_button(button: { get: (arg0: string) => any; }){
        // TODO: Investigate
        return {
            "type": "list",
            "header": {"type": "text", "text": button["header"]},
            "body": {"text": button["body"]},
            "footer": {"text": button["footer"]},
            "action": button["action"],
        }
    }

    async send_button(button: any, recipient_id: any){
        let data = {
            "messaging_product": "whatsapp",
            "to": recipient_id,
            "type": "interactive",
            "interactive": this.create_button(button),
        }
        let  r = await axios.post(this.url, data, {
             headers: this.headers
        })
        return r 
    }

    async get_media(id: string | number){
       let media_url = `https://graph.facebook.com/${VERSION}/${id}`

       let r = await axios.get(media_url, {
           headers: this.headers
       })

       return r 
    }

    async delete_media(id: string | number){
       let media_url = `https://graph.facebook.com/${VERSION}/${id}`

       let r = await axios.delete(media_url, {
           headers: this.headers
       })

       return r 
    }

}