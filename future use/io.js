// io.on("connection", async (socket) => {
//   online++;
//   console.log(`Socket ${socket.id} connected.`);
//   console.log(`Online: ${online}`);
//   io.emit("visitor enters", online);

//   stats();
//   startAll();

//   convert("./api.txt").then((res) => {
//     io.emit("file", res);
//   });

//   socket.on("disconnect", () => {
//     online--;
//     console.log(`Socket ${socket.id} disconnected.`);
//     console.log(`Online: ${online}`);
//     io.emit("visitor exits", online);
//   });
// });

// let online = 0;

// function convert(file) {
//   return new Promise((resolve, reject) => {
//     const stream = fs.createReadStream(file);
//     // Handle stream error (IE: file not found)
//     stream.on("error", reject);

//     const reader = readline.createInterface({
//       input: stream,
//     });

//     const array = [];

//     reader.on("line", (line) => {
//       array.push(line);
//     });

//     reader.on("close", () => resolve(array));
//   });
// }

// function stats() {
//   let system = osutils.platform();
//   let cpu = osutils.cpuCount();
//   let cpuUse = osutils.cpuUsage(function (v) {
//     cpuUse = v;
//   });
//   let loadAverage = osutils.loadavg(5).toFixed(2);
//   let totalMem = osutils.totalmem().toFixed(2);
//   let freeMem = osutils.freemem().toFixed(2);
//   let freeMemPercentage = osutils.freememPercentage().toFixed(2);
//   let uptime = new Date(os.uptime() * 1000).toISOString().substr(11, 8);

//   io.emit("stats", {
//     system,
//     cpu,
//     loadAverage,
//     totalMem,
//     freeMem,
//     freeMemPercentage,
//     uptime,
//     cpuUse,
//   });
// }