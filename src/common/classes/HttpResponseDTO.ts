export class HttpResponseDTO {
  status: number;
  message?: string;
  data?: any;

  constructor
    (
      status: number,
      message?: string,
      data?: any,
    ) {
    this.status = status;
    if (message) this.message = message;
    if (data) this.data = data;
  }

}