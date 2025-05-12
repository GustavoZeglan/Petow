import { registerAs } from "@nestjs/config";

export default registerAs("minio", () => ({
  endpoint: process.env.MINIO_ENDPOINT,
  port: Number(process.env.MINIO_PORT),
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
  useSSL: process.env.MINIO_USE_SSL === "true",
  bucketName: process.env.MINIO_BUCKET_NAME,
}));
