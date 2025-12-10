import bodyParser from "body-parser"
import express from "express"

import { Request, Response } from 'express'
import { NotificationPayload } from "../types/event"
import ProcessPayload from "./processPayload"

class Server {
    port:number | string
    verifyToken:string

    constructor(port:number|string, verifyToken:string){
        this.port = port
        this.verifyToken = verifyToken
    }

    start(notificationCallback: (rawData: NotificationPayload, processedPayload: ProcessPayload) => Promise<any>){
        const app = express()
        // Middleware 
        app.use(bodyParser.urlencoded({ extended: false}))
        app.use(bodyParser.json())

        app.get('/', this.handleVerification)
        app.post("/", async (req: Request, res:Response) => {
            let data: NotificationPayload = req.body
        
            let ppayload = new ProcessPayload(data)
            let resp = await notificationCallback(data, ppayload)

            return res.json(resp)
        })

        app.listen(this.port, () => {
            // console.log(`Example app listening on port ${this.port}`)
        })

        return app
    }

    handleVerification = (req: Request, res:Response) => {
        // console.log("Request Data: ", req.query)
    
        // Handle Verification
        if (req.query["hub.verify_token"]){
            let hub:any = req.query
            console.log("Hub: ", hub)
            let verify_token = req.query["hub.verify_token"]
    
            if (verify_token == process.env.VERIFY_TOKEN){
              return res.send(req.query["hub.challenge"])
            }
            return res.send("Invalid verification token")
        }
    
        return res.send("This is a default response")
    }

}

export default Server