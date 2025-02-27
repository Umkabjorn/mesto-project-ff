export function openModal(modalElement) {
  modalElement.classList.add("popup_is-animated");
  modalElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleKeyPress);
}

export function closeModal(modalElement) {
  modalElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleKeyPress);
}

export function handleKeyPress(evt) {
  if (evt.key === "Escape" || evt.keyCode === 27) {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

