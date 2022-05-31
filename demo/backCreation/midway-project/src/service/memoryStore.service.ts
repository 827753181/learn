import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';

@Provide()
@Scope(ScopeEnum.Singleton)
export class MemoryStore extends Map {
  save(key: string, value: any) {
    this.set(key, value);
  }
  fetch(key: string) {
    return this.get(key);
  }
}
