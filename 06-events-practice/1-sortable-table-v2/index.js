export default class SortableTable {
  element;
  headerConfig;
  data;
  headerElement;

  subElements = {};

  constructor(headersConfig, {
    data = [],
    sorted = {}
  } = {}) {
    this.headerConfig = headersConfig;
    this.data = data;
    this.sorted = sorted;

    this.element = this.getElement();
    this.headerElement = this.element.querySelector(`.sortable-table__header`);
    this.headingCellElements = this.headerElement.querySelectorAll(`.sortable-table__cell`);

    this.onElementClick = this.onElementClick.bind(this);

    this.selectSubElements();
    this.setDefaultSort();

    this.element.addEventListener(`click`, this.onElementClick);
  }


  selectSubElements() {
    this.element.querySelectorAll('[data-element]').forEach(element => {
      this.subElements[element.dataset.element] = element;
    });
  }

  getElement() {
    const wrapElement = document.createElement(`div`);

    wrapElement.innerHTML = this.getElementTemplate();

    return wrapElement.firstChild;
  }

  getElementTemplate() {
    return `<div class="sortable-table">

    <div data-element="header" class="sortable-table__header sortable-table__row">
      ${this.getHeaderTemplate()}
    </div>

      <div data-element="body" class="sortable-table__body">
        ${this.getDataTemplate()}
      </div>

      <div data-element="loading" class="loading-line sortable-table__loading-line"></div>

      <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
        <div>
          <p>No products satisfies your filter criteria</p>
          <button type="button" class="button-primary-outline">Reset all filters</button>
        </div>
      </div>

    </div>`;
  }

  getHeaderTemplate() {
    return `${this.headerConfig.map((item) => `<div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}" data-order="">
    <span>${item.title}</span>
    <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
    </span>
    </div>`).join(``)}`;
  }

  getDataTemplate() {
    return `${this.data.map((item) => `<a href="/products/${item.id}" class="sortable-table__row">
    ${this.headerConfig.template ? this.headerConfig.template(this.data) : ``}
      <div class="sortable-table__cell">${item.title}</div>
      ${item.quantity ? `<div class="sortable-table__cell">${item.quantity}</div>` : ``}
      <div class="sortable-table__cell">${item.price}</div>
      <div class="sortable-table__cell">${item.sales}</div>
    </a>`).join(``)}`;
  }

  sort(field, order) {
    const headerCellElement = this.headerConfig.find(cell => cell.id === field);
    const {sortable, sortType} = headerCellElement;

    if (sortable) {
      this.data = [...this.data].sort(this.compareCallback(sortType, field, order));

      this.subElements.body.innerHTML = this.getDataTemplate();

      this.selectSubElements();
    }
  }

  compareCallback(sortType, fieldValue, orderValue) {
    const getter = this.createGetter(fieldValue);
    const direction = {
      'asc': 1,
      'desc': -1
    };

    switch (sortType) {
    case 'number':
      return (a, b) => direction[orderValue] * (getter(a) - getter(b));
    case 'string':
      return (a, b) => direction[orderValue] * getter(a).localeCompare(getter(b), ['ru', 'en'], { caseFirst: 'upper' });
    }
  }

  createGetter(path) {
    const keys = path.split('.');

    return (obj) => keys.reduce((item, key) => { return item ? item[key] : item; }, obj);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

  setDefaultSort() {
    if (this.sorted) {
      this.headerElement.querySelector(`[data-id="${this.sorted.id}"]`).dataset.order = this.sorted.order;
    }
  }

  clearAttribute() {
    this.headingCellElements.forEach(item => item.dataset.order = ``);
  }

  onElementClick(event) {
    const target = event.target;
    const requiredTarget = target.closest(`[data-sortable="true"]`);

    if (requiredTarget) {

      switch (requiredTarget.dataset.order) {
      case ``:
        this.clearAttribute();
        requiredTarget.dataset.order = `asc`;
        break;
      case `asc`:
        requiredTarget.dataset.order = `desc`;
        break;
      case `desc`:
        requiredTarget.dataset.order = `asc`;
        break;
      }

      this.sort(requiredTarget.dataset.id, requiredTarget.dataset.order);
    }
  }
}
