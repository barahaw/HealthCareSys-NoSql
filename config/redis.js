const { createClient } = require("redis");

// General Redis connection config with placeholders
const client = createClient({
  username: "<username>",
  password: "<password>",
  socket: {
    host: "<host>",
    port: 12345, // <port> (replace with your port number)
  },
});

client.on("error", (err) => console.error("Redis Client Error:", err));

(async () => {
  await client.connect();
  console.log("Connected to Redis");
})();

module.exports = client;
