export class StatusDTO {
  updatedAt: string;
  database: {
    connections?: number;
    pools?: number;
  };

  constructor(updatedAt: string, connections?: number, pools?: number) {
    this.updatedAt = updatedAt;
    this.database = {};
    if (connections) this.database.connections = connections;
    if (pools) this.database.pools = pools;
  }

  static toDto(
    updatedAt: string,
    connections?: number,
    pools?: number,
  ): StatusDTO {
    return new StatusDTO(updatedAt, connections, pools);
  }
}
