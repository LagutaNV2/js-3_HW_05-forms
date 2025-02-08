/**
 * @jest-environment jsdom
 */

import Popover from "./popover";

describe("Popover class", () => {
  let button;
  let popoverInstance;

  beforeEach(() => {
    document.body.innerHTML = `<button id="toggle-popover" class="btn">Click to toggle popover</button>`;
    button = document.querySelector("#toggle-popover");
    popoverInstance = new Popover();
  });

  afterEach(() => {
    // Удаляем содержимое DOM после каждого теста и сбрасываем моки
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  it("should create a popover on the first click", async () => {
    popoverInstance.togglePopover("Test Title", "Test Content");

    // Проверяем, что popover был добавлен в DOM
    const popoverElement = document.querySelector(".popover");
    expect(popoverElement).not.toBeNull();

    // Проверяем содержимое popover
    const header = popoverElement.querySelector(".popover-header");
    const body = popoverElement.querySelector(".popover-body");
    expect(header.textContent).toBe("Test Title");
    expect(body.textContent).toBe("Test Content");
  });

  it("should remove the popover on the second click", async () => {
    button.click();
    button.click();
    expect(document.querySelector(".popover")).toBeNull();
  });
});
