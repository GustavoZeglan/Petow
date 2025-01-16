import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource
  ) { }

  async getActiveConnections(): Promise<number> {
    try {
      const result = await this.dataSource.query(`
          SELECT
            count(*) AS active_connections
          FROM
            pg_stat_activity
          WHERE
            state = 'active';
        `);
      return result[0].active_connections;
    } catch (error) {
      console.error('Error fetching active connections', error);
      throw new Error('Failed to fetch active connections');
    }
  }

  async getPoolConnections(): Promise<number> {
    try {
      const result = await this.dataSource.query(`
          SELECT
            datname,
            numbackends AS active_connections
          FROM
            pg_stat_database
          WHERE
            datname = current_database();
        `);
      return result[0].active_connections; // Retorna o número de conexões no pool
    } catch (error) {
      console.error('Error fetching pool connections', error);
      throw new Error('Failed to fetch pool connections');
    }
  }

}
