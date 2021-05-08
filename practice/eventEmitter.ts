class EventEmitter {
  _maxLimit: number;
  emit: (type: any, ...args: any[]) => void;
  addListener: (type: any, fn: any) => void;
  _events: Map<unknown, unknown>;
  constructor(options: { events: any[]; maxLimit: number }) {
    let events = options.events || [];
    let maxLimit = options.maxLimit || 10;

    let eventsArr = [];
    for (let key in events) {
      eventsArr.push(key, events[key]);
    }

    this._events = new Map(eventsArr);
    this._maxLimit = maxLimit;
  }
}

EventEmitter.prototype.emit = function (type, ...args) {
  let handler = this._events.get(type);
  if (handler != null && handler.length > 0) {
    handler.forEach((fn) => {
      fn.apply(this, ...args);
    });
    return true;
  }
  return false;
};
EventEmitter.prototype.addListener = function (type, fn) {
  let fnArr = this._events.get(type) || [];
  fnArr.push(fn);
  this._events.set(type, fnArr);
};
