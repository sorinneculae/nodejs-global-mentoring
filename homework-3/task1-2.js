import fetch from 'node-fetch';

// --------------------------------------
// ------------------------------- Task 1
// --------------------------------------

class EventEmitter {
  listeners = {};

  on(eventName, fn) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(fn);
  }

  addListener(eventName, fn) {
    this.on(eventName, fn)
  }

  off(eventName, fn) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter(
        (listener) => listener !== fn
      );
    }
  }

  removeListener(eventName, fn) {
    this.off(eventName, fn);
  }

  once(eventName, fn) {
    const onceFn = (...args) => {
      fn(...args);
      this.off(eventName, onceFn);
    };
    this.on(eventName, onceFn);
  }

  emit(eventName, ...args) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((listener) => listener(...args));
    }
  }

  listenerCount(eventName) {
    return this.listeners[eventName] ? this.listeners[eventName].length : 0;
  }

  rawListeners(eventName) {
    return this.listeners[eventName] || [];
  }
}

// Test EventEmitter

const myEmitter = new EventEmitter();

function c1() {
    console.log('an event occurred!');
}

function c2() {
    console.log('yet another event occurred!');
}

myEmitter.on('eventOne', c1); // Register for eventOne
myEmitter.on('eventOne', c2); // Register for eventOne

// Register eventOnce for one time execution
myEmitter.once('eventOnce', () => console.log('eventOnce once fired'));
myEmitter.once('init', () => console.log('init once fired'));

// Register for 'status' event with parameters
myEmitter.on('status', (code, msg)=> console.log(`Got ${code} and ${msg}`));


myEmitter.emit('eventOne');

// Emit 'eventOnce' -> After this the eventOnce will be
// removed/unregistered automatically
myEmitter.emit('eventOnce');

myEmitter.emit('eventOne');
myEmitter.emit('init');
myEmitter.emit('init'); // Will not be fired
myEmitter.emit('eventOne');
myEmitter.emit('status', 200, 'ok');

// Get listener's count
console.log(myEmitter.listenerCount('eventOne'));

// Get array of rawListeners//
// Event registered with 'once()' will not be available here after the
// emit has been called
console.log(myEmitter.rawListeners('eventOne'));

// Get listener's count after remove one or all listeners of 'eventOne'
myEmitter.off('eventOne', c1);
console.log(myEmitter.listenerCount('eventOne'));
myEmitter.off('eventOne', c2);
console.log(myEmitter.listenerCount('eventOne'));

// --------------------------------------
// ------------------------------- Task 2
// --------------------------------------

class WithTime extends EventEmitter {
  async execute(asyncFunc, ...args) {
    try {
      this.emit('begin');
      console.time('asyncFuncTimeRun');
      const data = await asyncFunc(args[0]);
      this.emit('end');
      console.timeEnd('asyncFuncTimeRun');
      this.emit('data', data);
    } catch (error) {
      this.emit('error', error);
    }
  }
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));
withTime.on('data', (data) => console.log('JSON data:', data));

const url = 'https://jsonplaceholder.typicode.com/posts/1';
withTime.execute(fetchData, url);

async function fetchData(_url) {
  try {
    const response = await fetch(_url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

console.log(withTime.rawListeners("end"));
