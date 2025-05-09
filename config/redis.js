const { createClient } = require("redis");

const client = createClient({
  username: "default",
  password: "mitmTF6uDBXjoP0w4njDYFHLoSb1xr1P",
  socket: {
    host: "redis-12116.crce176.me-central-1-1.ec2.redns.redis-cloud.com",
    port: 12116,
  },
});

client.on("error", (err) => console.error("Redis Client Error:", err));

(async () => {
  await client.connect();
  console.log("Connected to Redis");
})();

module.exports = client;
