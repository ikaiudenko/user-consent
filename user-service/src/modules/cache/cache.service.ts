import { CACHE_MANAGER, Inject } from "@nestjs/common";
import { Cache } from "cache-manager";
import { ConfigService } from "../core/config/config.service";

export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private readonly config: ConfigService) {}

  get<T>(key: string): Promise<T | null> {
    try {
      return this.cacheManager.get(key);
    } catch (err) {
      return null;
    }
  }

  set<T>(key: string, value: T, ttl: number = this.config.cacheTtl): Promise<T> | T {
    try {
      return this.cacheManager.set(key, value, { ttl });
    } catch (err) {
      return value;
    }
  }

  del<T>(key: string): Promise<T | null> {
    try {
      return this.cacheManager.del(key);
    } catch (err) {
      return null;
    }
  }
}
