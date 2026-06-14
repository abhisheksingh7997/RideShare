class NativeSocket {
  constructor(url) {
    this.url = url;
    this.listeners = {};
    this.connected = false;
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log("WebSocket connected to", this.url);
      this.connected = true;
      this.trigger("connect");
    };

    this.ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload && payload.event) {
          this.trigger(payload.event, payload.data);
        }
      } catch (e) {
        console.error("Failed to parse WebSocket message:", event.data, e);
      }
    };

    this.ws.onclose = () => {
      console.log("WebSocket disconnected. Reconnecting in 3 seconds...");
      this.connected = false;
      this.trigger("disconnect");
      setTimeout(() => this.connect(), 3000);
    };

    this.ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (!this.listeners[event]) return;
    if (callback) {
      this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
    } else {
      delete this.listeners[event];
    }
  }

  emit(event, data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ event, data }));
    } else {
      console.warn("WebSocket not open. Message not sent:", event, data);
    }
  }

  trigger(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => {
        try {
          callback(data);
        } catch (e) {
          console.error("Error executing callback for event:", event, e);
        }
      });
    }
  }
}

const socket = new NativeSocket("ws://localhost:5000/socket");
export default socket;