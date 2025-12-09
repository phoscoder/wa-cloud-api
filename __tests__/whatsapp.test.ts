import WhatsApp from "../src/classes/whatsapp";
import "dotenv/config";

let messenger = new WhatsApp(process.env.TOKEN, process.env.PHONE_NUMBER_ID);
let test_number = process.env.TEST_NUMBER;

describe("Test Messages", () => {
  test("Send a message to a whatsapp number", async () => {
    try {
      let resp = await messenger.sendMessage(
        "Hello man this is a test message",
        test_number as string,
      );

      expect(resp.status).toBe(200);
      expect(resp.statusText).toBe("OK");
    } catch (e) {
      // console.log(e)
    }
  });

  test("Send a template to a whatsapp number", async () => {
    try {
      let resp = await messenger.sendTemplate("hello_world", test_number as string);

      expect(resp.status).toBe(200);
      expect(resp.statusText).toBe("OK");
    } catch (e) {
      // console.log(e)
    }
  });
});

describe("Test Media", () => {
  test("Send a image to a whatsapp number", async () => {
    try {
      let resp = await messenger.sendImage(
        "https://i.imgur.com/Fh7XVYY.jpeg",
        test_number as string,
      );

      expect(resp.status).toBe(200);
      expect(resp.statusText).toBe("OK");
    } catch (e) {
      // console.log(e)
    }
  });

  test("Send a video to a whatsapp number", async () => {
    try {
      let resp = await messenger.sendVideo(
        "https://www.youtube.com/watch?v=K4TOrB7at0Y",
        test_number,
      );

      expect(resp.status).toBe(200);
      expect(resp.statusText).toBe("OK");
    } catch (e) {
      // console.log(e)
    }
  });

  test("Send a audio to a whatsapp number", async () => {
    try {
      let resp = await messenger.sendAudio(
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        test_number,
      );

      expect(resp.status).toBe(200);
      expect(resp.statusText).toBe("OK");
    } catch (e) {
      // console.log(e)
    }
  });

  test("Send a document to a whatsapp number", async () => {
    try {
      let resp = await messenger.sendDocument(
        "http://www.africau.edu/images/default/sample.pdf",
        test_number,
      );

      expect(resp.status).toBe(200);
      expect(resp.statusText).toBe("OK");
    } catch (e) {
      // console.log(e)
    }
  });
});

describe("Test Location", () => {
  test("Send a location to a whatsapp number", async () => {
    try {
      let resp = await messenger.sendLocation(
        1.29,
        103.85,
        "Singapore",
        "Singapore",
        test_number as string,
      );

      expect(resp.status).toBe(200);
      expect(resp.statusText).toBe("OK");
    } catch (e) {
      // console.log(e)
    }
  });
});

describe("Test buttons", () => {
  test("Send an interative button to a whatsapp number", async () => {
    try {
      let resp = await messenger.sendButton({
        header: "Header Testing",
        body: "Body Testing",
        footer: "Footer Testing",
        action: {
          button: "Button Testing",
          sections: [
            {
              title: "iBank",
              rows: [
                { id: "row 1", title: "Send Money", description: "" },
                {
                  id: "row 2",
                  title: "Withdraw money",
                  description: "",
                },
              ],
            },
          ],
        },
      }, test_number as string);

      expect(resp.status).toBe(200);
      expect(resp.statusText).toBe("OK");
    } catch (e) {
      // console.log(e)
    }
  });
});
