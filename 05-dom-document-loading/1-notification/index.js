export default class NotificationMessage {
  element;
  message;
  duration;
  type;

  constructor(message, options = {}) {
    this.message = message ? message : ``;
    this.type = options.type ? options.type : ``;
    this.duration = options.duration ? options.duration : 2000;

    if (this.element) {
      this.destroy();
    }

    this.element = this.getElement();
  }

  getElement() {
    const wrapElement = document.createElement(`div`);

    wrapElement.innerHTML = this.getElementTemplate();

    return wrapElement.firstChild;
  }

  getElementTemplate() {
    return `<div class="notification ${this.type}" style="--value:${this.duration}ms">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${this.type}</div>
      <div class="notification-body">${this.message}</div>
    </div>
  </div>`;
  }

  show(parent) {
    const notificationParentElement = parent ? parent : document.body;

    notificationParentElement.append(this.element);

    setTimeout(() => {
      this.destroy();
    }, this.duration);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

}
