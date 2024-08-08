import express, { request, response } from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

const messages = [
  { id: 0, message: "first message" },
  { id: 1, message: "some other message" },
  { id: 2, message: "third message in the list" },
  { id: 3, message: "and another message" },
  { id: 4, message: "the last message" },
];

const logMiddleware = (request: any, response: any, next: any) => {
  console.log(request.method, request.url);
  next();
};

const restrictionMiddleware = (request: any, response: any, next: any) => {
  const id = request.params.id;
  if (id != 3) {
    response
      .status(400)
      .send("the middleware is blocking access to this endpoint");
  } else {
    next();
  }
};

app.use(logMiddleware);

app.use(cors(), express.json());

app.listen(PORT, () => {
  console.log("hello, backend server is running on port " + PORT);
});

app.get("/api/restricted/:id", restrictionMiddleware, (request, response) => {
  const id = request.params.id;
  response
    .status(200)
    .send(
      "congratulations, you entered id: " + id + " and got in. it is accepted.",
    );
});

app.get("/", (request, response) => {
  response.send("hello from backend server..");
});

app.get("/api/sample-data", (request, response) => {
  response.send("this is some sample text from backend..");
});

app.get("/api/messages", (request, response) => {
  response.send(messages);
});

app.post("/api/messages", (request, response) => {
  const message = { id: messages.length + 1, message: request.body.message };
  messages.push(message);
  response.status(201).json(message);
});
