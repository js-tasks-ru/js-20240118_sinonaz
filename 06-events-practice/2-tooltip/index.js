class Tooltip {
  static instance;
  element;

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }

    Tooltip.instance = this;
    this.element = this.createElement();
  }

  initialize () {
    this.addListeners();
  }

  createElement() {
    const wrapElement = document.createElement('div');

    wrapElement.innerHTML = this.getTooltipTemplate();

    return wrapElement.firstElementChild;
  }

  getTooltipTemplate() {
    return `<div class="tooltip"></div>`;
  }

  render(message) {
    this.element.textContent = message;
    document.body.append(this.element);
  }

  addListeners() {
    document.addEventListener('pointerover', this.onDocumentPointerover);
    document.addEventListener('pointerout', this.onDocumentPointerout);
  }

  removeListeners() {
    document.removeEventListener('pointerover', this.onDocumentPointerover);
    document.removeEventListener('pointerout', this.onDocumentPointerout);
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.removeListeners();
  }

  onDocumentPointerover = (event) => {
    const target = event.target;

    if (!target.dataset.tooltip) {
      return;
    }

    this.render(target.dataset.tooltip);
    document.addEventListener('pointermove', this.onDocumentPointermove);
  }

  onDocumentPointerout = (event) => {
    const target = event.target;

    if (target.dataset.tooltip) {
      this.remove();
      document.removeEventListener('pointermove', this.onDocumentPointermove);
    }
  }

  onDocumentPointermove = (event) => {
    this.element.style.top = `${event.clientY}px`;
    this.element.style.left = `${event.clientX}px`;
  }
}

export default Tooltip;
