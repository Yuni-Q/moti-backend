class MemoryCache {
  private cache: { [key: string]: { ttl: number; data: any } } = {};

  public get(cacheKey: string): any {
    if (!cacheKey) {
      return null;
    }
    if ((this.cache[cacheKey]?.ttl || 0) > Date.now()) {
      return this.cache[cacheKey].data;
    }
    delete this.cache[cacheKey];
  }

  public set(cacheKey: string, data: any, ttl?: number): void {
    this.cache[cacheKey] = { data, ttl: Date.now() + (ttl || 60 * 1000) };
  }
}

export default MemoryCache;
