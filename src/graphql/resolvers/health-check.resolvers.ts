export interface HealthCheckResponse {
  msg: string;
}

export default {
  Query: {
    ping: (): HealthCheckResponse => ({ msg: 'pong' }),
  },
};
