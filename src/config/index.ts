import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  dbUrl: process.env.NEXT_PUBLIC_DATABASE_URL,
};

export default config;
