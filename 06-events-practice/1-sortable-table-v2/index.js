import SortableTableV1 from '../../05-dom-document-loading/2-sortable-table-v1/index.js';

export default class SortableTable extends SortableTableV1 {
  element;
  headerElement;

  subElements = {};

  constructor(headerConfig = [], {
    data = [],
    sorted = {}
  } = {}) {
    super(headerConfig);
    this.data = data;
    this.sorted = sorted;
    this.element = this.getElement();
    this.onHeaderPointerdown = this.onHeaderPointerdown.bind(this);

    this.selectSubElements();

    this.headingCellElements = this.subElements.header.querySelectorAll(`.sortable-table__cell`);
    this.subElements.header.addEventListener('pointerdown', this.onHeaderPointerdown);

    this.setDefaultSort();
  }

  setDefaultSort() {
    if (this.sorted) {
      this.subElements.header.querySelector(`[data-id="${this.sorted.id}"]`).dataset.order = this.sorted.order;
    }
  }

  clearAttribute() {
    this.headingCellElements.forEach(item => item.dataset.order = ``);
  }

  onHeaderPointerdown(event) {
    const target = event.target;
    const requiredTarget = target.closest(`.sortable-table__cell`);

    if (requiredTarget) {

      let order;

      switch (requiredTarget.dataset.order) {
      case ``:
        this.clearAttribute();
        order = `desc`;
        break;
      case `asc`:
        order = `desc`;
        break;
      case `desc`:
        order = `asc`;
        break;
      }

      requiredTarget.dataset.order = order;
      this.sort(requiredTarget.dataset.id, requiredTarget.dataset.order);
    }
  }
}
