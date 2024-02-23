const DURATION = 2000;

export default class NotificationMessage {
  element;
  message;
  duration;
  type;
  lastMessage;

  constructor(message, options = {}) {
    this.message = message ? message : ``;
    this.type = options.type ? options.type : ``;
    this.duration = options.duration ? options.duration : DURATION;

    this.element = this.getElement();
  }

  getElement() {
    const wrapElement = document.createElement(`div`);

    wrapElement.innerHTML = this.createTemplate();

    return wrapElement.firstChild;
  }

  createTemplate() {
    return `<div class="notification ${this.type}" style="--value:${this.duration}ms">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${this.type}</div>
      <div class="notification-body">${this.message}</div>
    </div>
  </div>`;
  }

  show(parent = document.body) {
    const notificationParentElement = parent;

    if (this.lastMessage) {
      this.lastMessage.destroy();
    }

    this.lastMessage = this.element;
    notificationParentElement.append(this.element);

    setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

}
