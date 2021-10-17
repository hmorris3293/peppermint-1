// Dependencies
const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const socket = require("socket.io");
const fs = require("fs");
const readline = require("readline");
const fileUpload = require("express-fileupload");
const osutils = require("os-utils");
const os = require("os");
const compression = require("compression");
const { prisma } = require("./prisma/prisma");
const Monitor = require("ping-monitor");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

if (process.env.NODE_ENV === "production") {
  url = process.env.MONGO_URI_DOCKER;
} else {
  url = process.env.MONGO_URI_DEV;
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
});

// Routes
const auth = require("./src/routes/auth");
const tickets = require("./src/routes/ticket");
const data = require("./src/routes/data");
const todo = require("./src/routes/todo");
const note = require("./src/routes/notes");
const client = require("./src/routes/client");
const news = require("./src/routes/news");
const uptime = require("./src/routes/uptime");
const { Ping } = require("./src/controller/uptime/ping");
const { error } = require("console");
// const times = require("./src/routes/time");

// Express server libraries
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
  })
);

let accessLogStream = fs.createWriteStream(path.join(__dirname, "api.txt"), {
  flags: "a",
});

// Express API Routes
app.use(
  "/api/v1/auth",
  morgan("tiny", { stream: accessLogStream }),
  limiter,
  auth
);
app.use(
  "/api/v1/tickets",
  morgan("tiny", { stream: accessLogStream }),
  tickets
);
app.use("/api/v1/data", morgan("tiny", { stream: accessLogStream }), data);
app.use("/api/v1/todo", morgan("tiny", { stream: accessLogStream }), todo);
app.use("/api/v1/note", morgan("tiny", { stream: accessLogStream }), note);
app.use("/api/v1/client", morgan("tiny", { stream: accessLogStream }), client);
app.use(
  "/api/v1/newsletter",
  morgan("tiny", { stream: accessLogStream }),
  news
);
// app.use("/api/v1/time", morgan("tiny", { stream: accessLogStream }), times);
app.use("/api/v1/uptime", uptime);

// Express web server PORT
const PORT = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));
app.get("*", function (req, res) {
  res.sendFile("index.html", { root: path.join(__dirname, "build/") });
});

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold
  )
);

// Set up socket.io
const io = socket(server);

async function monitors() {
  try {
    const monitors = await prisma.monitor.findMany();

    monitors.forEach((monitor) => {
      const myWebsite = new Monitor({
        website: monitor.url,
        interval: monitor.interval,

        expect: {
          statusCode: 200,
        },
      });

      myWebsite.on("up", async function (response, state) {
        console.log(
          "Yay!! " +
            response.website +
            " is up with a res time of of " +
            response.responseTime +
            "ms"
        );

        await prisma.monitor.update({
          where: {
            id: monitor.id
          }, 
          data: {
            res: String(response.responseTime),
            up: true
          }
        })
        
      });

      myWebsite.on("down", async function (res) {
        console.log(
          "Oh Snap!! " + res.website + " is down! " + res.statusMessage
        );

        await prisma.monitor.update({
          where: {
            id: monitor.id
          }, 
          data: {
            res: null,
            up: false
          }
        })

      });

      myWebsite.on("stop", function (website) {
        console.log(website + " monitor has stopped.");
      });

      myWebsite.on("error", function (error) {
        console.log(error);
      });
    });

    console.log(monitors)

    io.emit("data", monitors);
  } catch (error) {
    console.log(error);
  }
}

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected.`);
  monitors();
});
