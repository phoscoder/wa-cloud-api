import axios from "axios";
import { AudioMessage, DocumentMessage, ImageMessage, VideoMessage } from "../types/general";

const VERSION = "v24.0";



enum httpMethod {
  POST = "post",
  GET = "get",
  PUT = "put",
  DELETE = "delete",
}


export default class WhatsApp {
  phone_number_id: string;
  token: string;
  headers: { "Content-Type": string; Authorization: string };
  url: string;
  debug: boolean;

  constructor(token: string = "", phone_number_id: string = "", debug: boolean = false) {
    this.token = token;
    this.phone_number_id = phone_number_id;
    this.url = `https://graph.facebook.com/${VERSION}/${phone_number_id}/messages`;
    this.debug = debug;
    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }
  
  buildUrl(path: string) {
    return `https://graph.facebook.com/${VERSION}/${this.phone_number_id}/${path}`;
  }
  
  async networkResponse(method: httpMethod, data: Record<string, any> | undefined, customUrl: string | undefined=undefined){
    try{
      let r 
      
      if (method == httpMethod.POST){  
          r = await axios.post(customUrl || this.url, data, {
            headers: this.headers,
          });
      }else if (method == httpMethod.GET){
          r = await axios.get(customUrl || this.url, {
            headers: this.headers,
          });
      }else if (method == httpMethod.PUT){
          r = await axios.put(customUrl || this.url, data, {
            headers: this.headers,
          });
      }else if (method == httpMethod.DELETE){
          r = await axios.delete(customUrl || this.url, {
            headers: this.headers,
          });
      }else{
        throw new Error(`Invalid method: ${method}`);
      }
      
      if (this.debug){
        return r;
      }
      
      
      return r.data;
    }catch(error){
      console.error(error);
      throw error;
    }
  }

  async sendMessage(
    message: string,
    recipient_id: string,
    recipient_type = "individual",
    preview_url = true,
  ) {
    let data = {
      messaging_product: "whatsapp",
      recipient_type: recipient_type,
      to: recipient_id,
      type: "text",
      text: { preview_url: preview_url, body: message },
    };
    
    return await this.networkResponse(httpMethod.POST, data);
  }
  
  async getTemplates() {
    const customURL = this.buildUrl("message_templates");
    let templates =  await this.networkResponse(httpMethod.GET, undefined, customURL);
    return templates.data || templates
  }

  async sendTemplate(
    template: string,
    recipient_id: string,
    components: any[] = [],
    lang: string = "en_US",
  ) {
    let data = {
      messaging_product: "whatsapp",
      to: recipient_id,
      type: "template",
      template: {
        name: template,
        language: { code: lang },
        components: [...components],
      },
    };
    return await this.networkResponse(httpMethod.POST, data);
  }

  async sendLocation(
    lat: number,
    long: number,
    name: string,
    address: string,
    recipient_id: string,
  ) {
    let data = {
      messaging_product: "whatsapp",
      to: recipient_id,
      type: "location",
      location: {
        latitude: lat,
        longitude: long,
        name: name,
        address: address,
      },
    };
   
    return await this.networkResponse(httpMethod.POST, data);
  }

  async sendImage(
    image: any,
    recipient_id: string,
    recipient_type = "individual",
    caption: string | null = null,
    link: boolean = true,
  ) {
    let data: ImageMessage;
    if (link) {
      data = {
        messaging_product: "whatsapp",
        recipient_type: recipient_type,
        to: recipient_id,
        type: "image",
        image: { link: image, caption: caption },
      };
    } else {
      data = {
        messaging_product: "whatsapp",
        recipient_type: recipient_type,
        to: recipient_id,
        type: "image",
        image: { id: image, caption: caption },
      };
    }

    return await this.networkResponse(httpMethod.POST, data);
  }

  async sendAudio(audio: any, recipient_id: any, link = true) {
    let data: AudioMessage;
    if (link) {
      data = {
        messaging_product: "whatsapp",
        to: recipient_id,
        type: "audio",
        audio: { link: audio },
      };
    } else {
      data = {
        messaging_product: "whatsapp",
        to: recipient_id,
        type: "audio",
        audio: { id: audio },
      };
    }

    return await this.networkResponse(httpMethod.POST, data);
  }

  async sendVideo(video: any, recipient_id: any, caption = null, link = true) {
    let data:VideoMessage;
    if (link) {
      data = {
        messaging_product: "whatsapp",
        to: recipient_id,
        type: "video",
        video: { link: video, caption: caption },
      };
    } else {
      data = {
        messaging_product: "whatsapp",
        to: recipient_id,
        type: "video",
        video: { id: video, caption: caption },
      };
    }
    return await this.networkResponse(httpMethod.POST, data);
  }

  async sendDocument(
    document: any,
    recipient_id: any,
    filename: string = "document",
    caption = null,
    link = true,
  ) {
    let data:DocumentMessage;
    if (link) {
      data = {
        messaging_product: "whatsapp",
        to: recipient_id,
        type: "document",
        document: { link: document, caption: caption, filename: filename },
      };
    } else {
      data = {
        messaging_product: "whatsapp",
        to: recipient_id,
        type: "document",
        document: { id: document, caption: caption, filename: filename },
      };
    }

    return await this.networkResponse(httpMethod.POST, data);
  }

  createButton(button: Record<string, any>) {
    // TODO: Investigate
    return {
      type: "list",
      header: { type: "text", text: button["header"] },
      body: { text: button["body"] },
      footer: { text: button["footer"] },
      action: button["action"],
    };
  }

  async sendButton(button: Record<string, any>, recipient_id: string) {
    let data = {
      messaging_product: "whatsapp",
      to: recipient_id,
      type: "interactive",
      interactive: this.createButton(button),
    };
    return await this.networkResponse(httpMethod.POST, data);
  }

  async getMedia(id: string | number) {
    let mediaUrl = `https://graph.facebook.com/${VERSION}/${id}`;

    
    return await this.networkResponse(httpMethod.GET, undefined, mediaUrl);
  }

  async deleteMedia(id: string | number) {
    let mediaUrl = `https://graph.facebook.com/${VERSION}/${id}`;

    return await this.networkResponse(httpMethod.DELETE, undefined, mediaUrl);
  }
}
