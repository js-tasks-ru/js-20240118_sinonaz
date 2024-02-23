export default class ColumnChart {
  element;

  chartHeight = 50;

  constructor(data) {
    this.data = data;

    this.element = this.getElement();
  }

  getColumnProps(data) {
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;

    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0),
        value: String(Math.floor(item * scale))
      };
    });
  }

  getElement() {
    const wrapElement = document.createElement(`div`);

    wrapElement.innerHTML = this.getColumnChartTemplate(this.data);

    return wrapElement.firstChild;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

  update(data) {
    const bodyElement = this.element.querySelector(`.column-chart__chart`);

    bodyElement.innerHTML = ``;

    bodyElement.insertAdjacentHTML(`beforeend`, this.getColumnsTemplate(data));
  }

  createTemplate(data) {
    return `<div class="column-chart" style="--chart-height: 50">
    <div class="column-chart__title">
      ${data.label ? data.label : ``}
      ${data.link ? `<a href="${data.link}" class="column-chart__link">View all</a>` : ``}
    </div>
    <div class="column-chart__container">
      <div data-element="header" class="column-chart__header">${data.formatHeading ? data.formatHeading(data.value) : data.value}</div>
      <div data-element="body" class="column-chart__chart">
      ${!data.data ? `` : this.getColumnsTemplate(data.data)}
      </div>
    </div>
  </div>`;
  }

  getLoadingElementTemplate() {
    return `<div class="column-chart column-chart_loading" style="--chart-height: 50">
    <div class="column-chart__title"></div>
    <div class="column-chart__container">
      <div data-element="header" class="column-chart__header"></div>
      <div data-element="body" class="column-chart__chart"></div>
    </div>
  </div>`;
  }

  getColumnsTemplate(data) {
    return `${this.getColumnProps(data).map((item) => `<div style="--value: ${item.value}" data-tooltip="${item.percent}%"></div>`).join(``)}`;
  }


  getColumnChartTemplate(data) {
    return data ? this.createTemplate(data) : this.getLoadingElementTemplate();
  }
}
