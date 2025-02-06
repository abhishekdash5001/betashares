export class MockWebSocket {
    private listeners: { [event: string]: Function[] } = {};
  
    connect() {
      setInterval(() => {
        const priceUpdate = {
          symbol: "AAPL",
          price: Math.random() * 1000,
        };
        console.log("calling")
        this.emit("priceUpdate", priceUpdate);
      }, 1000);
    }
  
    on(event: string, callback: Function) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(callback);
    }
  
    private emit(event: string, data: any) {
      if (this.listeners[event]) {
        console.log(this.listeners)
        this.listeners[event].forEach(callback => callback(data));
      }
    }
  }