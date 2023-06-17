interface PoolType<T> {
  timeoutID?: NodeJS.Timeout;
  data: T;
}

export class DataPool<T> {
  private connections: Map<string, PoolType<T>> = new Map();
  private readonly timeout?: number;

  public constructor(timeout?: number) {
    this.timeout = timeout;
  }

  public add(id: string, data: T) {
    const poolData: PoolType<T> = { data, timeoutID: undefined };

    this.defineTimeout(poolData, id);

    this.connections.set(id, poolData);
  }

  public delete(id: string) {
    this.connections.delete(id);
  }

  private defineTimeout(poolData: PoolType<T>, id: string) {
    if (this.timeout) {
      poolData.timeoutID = setTimeout(() => {
        this.connections.delete(id);
      }, this.timeout);
    }
  }

  public get(id: string) {
    const poolData = this.connections.get(id);
    if (poolData) {
      clearTimeout(this.timeout);
      this.defineTimeout(poolData, id);
    }
    return this.connections.get(id);
  }

  get connectionsNumber() {
    return this.connections.size;
  }
}
