export default class Popover {
  constructor() {
    this._currentPopover = null; // тек. активный popover
    this._originalButtonMargin = null; // ориг. отступ кнопки
  }

  togglePopover(title, content) {
    if (this._currentPopover) {
      this._removePopover();
      return;
    }

    this._createPopover(title, content);
  }

  _createPopover(title, content) {
    const button = document.querySelector("#toggle-popover");

    // Удаляем предыдущий popover, если он есть (на случай повторного вызова)
    // if (this._currentPopover) {
    //   this._removePopover();
    // }

    // Сохраняем изначальное значение отступа кнопки
    if (this._originalButtonMargin === null) {
      this._originalButtonMargin = window.getComputedStyle(button).marginTop;
    }

    // Создаём popover элемент
    const popoverElement = document.createElement("div");
    popoverElement.classList.add("popover");

    const headerElement = document.createElement("div");
    headerElement.classList.add("popover-header");
    headerElement.textContent = title;

    const bodyElement = document.createElement("div");
    bodyElement.classList.add("popover-body");
    bodyElement.textContent = content;

    // Срелка popover
    const arrowElement = document.createElement("div");
    arrowElement.classList.add("popover-arrow");

    // Собираем popover
    popoverElement.appendChild(headerElement);
    popoverElement.appendChild(bodyElement);
    popoverElement.appendChild(arrowElement);

    document.body.appendChild(popoverElement);

    // Используем setTimeout, чтобы дать popover отрисоваться в DOM перед расчетами
    setTimeout(() => {
      // Рассчитываем позиции
      const { left, top, width } = button.getBoundingClientRect();
      const popoverWidth = popoverElement.offsetWidth;
      const popoverHeight = popoverElement.offsetHeight;

      // Перемещаем кнопку вниз, если не хватает места над кнопкой
      const popoverTop = top - popoverHeight - 10;
      if (popoverTop < 0) {
        button.style.marginTop = `${popoverHeight + 20}px`;
      }

      // Центрируем по горизонтали относительно кнопки
      popoverElement.style.left = `${left + width / 2 - popoverWidth / 2}px`;

      // Пересчитываем top после перемещения кнопки
      popoverElement.style.top = `${button.getBoundingClientRect().top - popoverHeight - 10}px`;

      this._currentPopover = popoverElement;
    }, 0);
  }

  _removePopover() {
    const button = document.querySelector("#toggle-popover");
    if (this._currentPopover) {
      // Даем время DOM обновиться перед удалением
      setTimeout(() => {
        this._currentPopover.remove();
      }, 0);
      this._currentPopover = null;
    }

    // Восстанавливаем `marginTop`, если он был изменен
    if (this._originalButtonMargin !== null) {
      // button.style.marginTop = this._originalButtonMargin;
      button.style.marginTop = "10px";
    }
  }
}
