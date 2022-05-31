import { DataListener } from '@midwayjs/core';
import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';

@Provide()
@Scope(ScopeEnum.Singleton)
export class MemoryDataListener extends DataListener<string> {
  private timer;
  onData(setData: (data: string) => void) {
    this.timer = setInterval(() => {
      setData('hello' + Date.now());
    }, 1000);
  }
  initData(): string {
    return 'hello' + Date.now();
  }
  protected async destroyListener(): Promise<void> {
    clearInterval(this.timer);
  }
}
