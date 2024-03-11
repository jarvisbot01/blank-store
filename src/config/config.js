import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 9090,
  secret_key: process.env.SECRET_KEY,
  microsoft_client_id: process.env.MICROSOFT_CLIENT_ID,
  microsoft_client_secret: process.env.MICROSOFT_CLIENT_SECRET,
};
