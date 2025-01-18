export class StatusDTO {
  updatedAt: string;
  database: {
    version: string;
    maxConnections: number;
    openedConnections: number;
  };

  constructor(updatedAt: string, version: string, maxConnections: number, openedConnections: number) {
    this.updatedAt = updatedAt;
    this.database = {
      version: version,
      maxConnections: maxConnections,
      openedConnections: openedConnections
    };
  }

  static toDto(
    updatedAt: string,
    version: string,
    maxConnections: number,
    openedConnections: number,
  ): StatusDTO {
    return new StatusDTO(updatedAt, version, maxConnections, openedConnections);
  }
}
