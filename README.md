
# [Whatsapp Cloud API](https://npmjs.com/package/@phoscoder/whatsapp-cloud-api)

[![Made in Zimbabwe🇿🇼](https://img.shields.io/badge/ported%20in-zimbabwe%20%F0%9F%87%BF%F0%9F%87%BC-blue)](https://github.com/phoscoder)
![NPM](https://img.shields.io/npm/l/@phoscoder/whatsapp-cloud-api)
![npm](https://img.shields.io/npm/v/@phoscoder/whatsapp-cloud-api)
![npm](https://img.shields.io/npm/dw/@phoscoder/whatsapp-cloud-api)


Unofficial javascript wrapper to [WhatsApp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api). It was first ported from [heyoo](https://github.com/Neurotech-HQ/heyoo) but now I will be maintaining it and adding more features.

## Features supported

✅ Sending messages  <br>
✅ Sending  Media (images, audio, video and documents) <br>
✅ Sending location <br>
✅ Sending interactive buttons <br>
✅ Sending template messages <br>

## Getting started

To get started with **whatsapp-cloud-api**, you have to firstly install the libary either directly or using *npm*.

### Installing from npm

```bash
# For Windows, Linux & Mac

npm install @phoscoder/whatsapp-cloud-api
```

## Setting up

To get started using this package, you will need **TOKEN** and **TEST WHATSAPP NUMBER** which you can get by from [Facebook Developer Portal](https://developers.facebook.com/)

Here are steps to follow for you to get started

1. [Go to your apps](https://developers.facebook.com/apps)
2. [create an app](https://developers.facebook.com/apps/create/)
3. Select Bussiness >> Bussiness
4. It will prompt you to enter basic app informations
5. It will ask you to add products to your app
    a. Add WhatsApp Messenger
6. Right there you will see a your **TOKEN** and **TEST WHATSAPP NUMBER** and its phone_number_id
7. Lastly verify the number you will be using for testing on the **To** field.

Once you're follow the above procedures, now you're ready to start hacking with the Wrapper.

## Authentication

Here how you authenticate your application, you need to specofy two things the ```TOKEN``` and ```phone_number_id``` of your test number

```javascript
import {WhatsApp} from '@phoscoder/whatsapp-cloud-api'
let messenger = new WhatsApp('TOKEN',  phone_number_id='104xxxxxx')
```

Once you have authenticated your app, now you can start using the above mentioned feature as shown above;

## Sending Messanges

Here how to send messages;

```javscript
messenger.sendMessage('Your message ', 'Mobile eg: 255757xxxxx')
```

### Example

Here an example

```javascript
messenger.sendMessage('Hi there just testiing', '255757902132')
```

## Sending Images

When sending media(image, video, audio, gif and document ), you can either specify a link containing  the media or specify object id, you can do this using the same method.

By default all media methods assume you're sending link containing media but you can change this by specifying the ```link=False```.

Here an example;

```javascript
messenger.sendImage(
        image="https://i.imgur.com/Fh7XVYY.jpeg",
        recipient_id="255757xxxxxx",
)
```

## Sending Video

Here an example;

```javascript

messenger.sendVideo(
        video="https://www.youtube.com/watch?v=K4TOrB7at0Y",
        recipient_id="255757xxxxxx",
)
```

## Sending Audio

Here an example;

```javascript
messenger.sendAudio(
        audio="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        recipient_id="255757xxxxxx",
)
```

## Sending Document

Here an example;

```javascript
messenger.sendDocument(
        document="http://www.africau.edu/images/default/sample.pdf",
        recipient_id="255757xxxxxx",
)
```

## Sending Location

Here an example;

```javascript
messenger.sendLocation(
        lat=1.29,
        long=103.85,
        name="Singapore",
        address="Singapore",
        recipient_id="255757xxxxxx",
    )
```

## Sending Interactive buttons

Here an example;

```javascript
messenger.sendButton(
        recipient_id="255757xxxxxx",
        button={
            "header": "Header Testing",
            "body": "Body Testing",
            "footer": "Footer Testing",
            "action": {
                "button": "Button Testing",
                "sections": [
                    {
                        "title": "iBank",
                        "rows": [
                            {"id": "row 1", "title": "Send Money", "description": ""},
                            {
                                "id": "row 2",
                                "title": "Withdraw money",
                                "description": "",
                            },
                        ],
                    }
                ],
            },
        },
)
```

## Sending a Template Messages

Here how to send a pre-approved template message;

```javascript
messenger.sendTemplate("hello_world", "255757xxxxxx")
```

## Sending a Template Messages with Components
You can now specify components like this

```javascript
let components = [ 
  // Your components here
]

messenger.sendTemplate("hello_world", "255757xxxxxx", components)
```

For moreabout components: https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-message-templates

## Webhook

Webhooks are useful incase you're wondering how to respond to incoming message send by user, but I have created a [starter webhook](https://github.com/JS-Hub-ZW/heyooh/blob/main/src/hook.ts) which you can then customize it according to your own plans.

To learn more about webhook and how to configure in your Facebook developer dashboard please [have a look here](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/set-up-webhooks).



### Notification Payload Structure

This is the structure of the notifications that you will recieve from Whatsapp when a certain event is triggered


<table>
<tr>
<td> Example Notification Payload </td> <td> Nested Structure of the Payload </td>
</tr>
<tr>
<td>

```bash
{
  "object": "whatsapp_business_account",
  "entry": [{
    "id": "WHATSAPP-BUSINESS-ACCOUNT-ID",
    "changes": [{
      "value": {
         "messaging_product": "whatsapp",
         "metadata": {
           "display_phone_number": "PHONE-NUMBER",
           "phone_number_id": "PHONE-NUMBER-ID"
         },
      # Additional arrays and objects
         "contacts": [{...}]
         "errors": [{...}]
         "messages": [{...}]
         "statuses": [{...}]
      },
      "field": "messages"
    }]
  }]
}
```
</td>
<td>
    
<image src="https://scontent.fhre1-1.fna.fbcdn.net/v/t39.8562-6/279222632_734660030860914_6012822392536302447_n.png?_nc_cat=102&ccb=1-7&_nc_sid=6825c5&_nc_ohc=6JRg8jSurMkAX96mfPU&_nc_ht=scontent.fhre1-1.fna&oh=00_AT-ijPsejf2Ys89V08c7qqC3I8wy1ppmk5RedBKakjDe8Q&oe=628FFFB6">

</td>
</tr>
</table>



### Recieving notifications (Method #1)
To receive notifications such as customer messages, alerts and other callbacks from WhatsApp you can start a server that listens and handles notifications from Whatsapp

```javascript
import Server from './classes/server'
import 'dotenv/config'

let notificationServer = new Server(
    process.env.LISTEN_PORT,
    process.env.VERIFY_TOKEN
)

let app = notificationsServer.start(async (rawData ,processedPayload) => {
  // Do your stuff here
  let messages = processedPayload.getMessages()
  let metadata = processedPayload.getContacts()
  let contacts = processedPayload.getContacts()
  let status = processedPayload.getStatuses()

  // Do other stuff here
})
```

`rawData` -> This is raw data straight from WhatsApp
`processedPayload` -> This is an object of `ProcessPayload` it gives access to the raw_data plus helper methods

**Note:** Beginners should work more with processed since it saves you time and minimizes errors

**Tip:** You can refactor it to look more presentable

```javascript
import handleNotifications from 'path/to/file'

let app = notificationServer.start(handleNotifications)
```
### Recieving notifications (Method #2 > Existing server)
To receive notifications such as customer messages, alerts and other callbacks from WhatsApp on an existing server, take the following steps

```javascript
import Server from './classes/server'


  app.post("/", async (req: Request, res:Response) => {
      let data: NotificationPayload = req.body
  
      let processedPayload = new ProcessPayload(data)
      let resp = await notificationCallback(data, payload)
      
      // Do your stuff here
      let messages = processedPayload.getMessages()
      let metadata = processedPayload.getContacts()
      let contacts = processedPayload.getContacts()
      let status = processedPayload.getStatuses()

      return res.json("Notification recieved!")
  })
```


### Getting media links 

To retrive actual media link

```javascript
let message = processedPayload.getMessages()[0]
let mediaData = await messenger.getMedia(message.image.id)
```

**NOTE:** The URL you get is only available for a 5 minutes, so you may need to download it and store it somewhere, or use it as quick as possible

For more info check [Notification Payload refernce](https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/components) and [Notification Payload Examples](https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples)

## Issues

If you will face any issue with the usage of this package please raise one so as we can quickly fix it as soon as possible;

## Contributing

This is an opensource project under ```MIT License``` so any one is welcome to contribute from typo, to source code to documentation, ```JUST FORK IT```.

## All the credit

1. [kalebu](https://github.com/Kalebu)
2. [takunda](https://github.com/takumade)
3. Contribute to get added here

</samp>
