import crypto, { randomUUID } from "crypto";

const API_SECRET_KEY = process.env.API_SECRET_KEY || "developer_secret";

const hash = (value) => {
  const algorithm = "sha512";
  const secret = API_SECRET_KEY;
  return crypto.createHmac(algorithm, secret).update(value).digest("hex");
};

const key = crypto.randomUUID();
console.log(key);
console.log(hash(key));
