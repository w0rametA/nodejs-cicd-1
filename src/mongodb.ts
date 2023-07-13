export interface MongoDBConnection {
  host?: string;
  port?: number;
  username?: string;
  password?: string;
}

export const defaultConn: MongoDBConnection = {
  host: "localhost",
  port: 27017,
  username: "root",
  password: "password",
};

export function defaultValues(conn: MongoDBConnection): MongoDBConnection {
  return {
    host: conn.host || defaultConn.host,
    port: conn.port || defaultConn.port,
    username: conn.username || defaultConn.username,
    password: conn.password || defaultConn.password,
  };
}

export function mongoDbUrl(conn: MongoDBConnection) {
  // Substitute default values
  conn = defaultValues(conn);

  // https://www.mongodb.com/docs/manual/reference/connection-string/
  return `mongodb://${conn.username}:${conn.password}@${conn.host}:${conn.port}`;
}
