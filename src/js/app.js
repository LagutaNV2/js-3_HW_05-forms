import Popover from "./popover.js";

const popover = new Popover();

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("#toggle-popover");
  button.addEventListener("click", () => {
    popover.togglePopover(
      "Popover title",
      "And here's some amazing content. It's very engaging. Right?",
    );
  });
});
