import { Inject } from "@nestjs/common";

export const MINIO_TOKEN = "minio-token";

export function InjectMinio(): ParameterDecorator {
  return Inject(MINIO_TOKEN);
}
