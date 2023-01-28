import express from "express";
import cors from "cors";

import http from "http";
import * as socketIO from "socket.io";

const app = express();
app.use(cors());

const httpServer = http.createServer(app);

const io = new socketIO.Server(httpServer, {
  cors: {
    origin: "*",
    methods: "*",
  },
});
// Create a new Express app

// Set up a route that responds to a GET request at the root path
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

io.on("connection", (socket) => {
  console.log('socket.id', socket.id)
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on(
    "callUser",
    ({
      userToCall,
      signalData,
      from,
      name,
    }: Partial<{
      userToCall: string;
      signalData: string;
      from: string;
      name: string;
    }>) => {
      io.to(userToCall!).emit("callUser", { signal: signalData, from, name });
    }
  );

  socket.on("answerCall", ({ to, signal }: { signal: any; to: string }) => {
    io.to(to).emit("callAccepted", 
      signal,
    );
  });
});

// Start the server on port 3000
httpServer.listen(5000, () => {
  console.log("Server listening on port 5000");
});
