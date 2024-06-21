const COOKIE_SECRET = process.env.COOKIE_SECRET || "cookie_secret";
const SESSION_SECRET = process.env.SESSION_SECRET || "session_secret";
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/tasksync";
const HOST = process.env.HOST || "http://localhost:3000";
module.exports = {
  FRONTEND_ORIGIN,
  SESSION_SECRET,
  COOKIE_SECRET,
  MONGO_URI,
  HOST,
};
