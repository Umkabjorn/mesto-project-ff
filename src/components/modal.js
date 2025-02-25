function openProfilePopup() {
    popupProfile.classList.add("popup_is-animated");
    popupProfile.classList.add("popup_is-opened");
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
  }

  function closeProfilePopup(evt) {
    if (evt.target === popupProfile || evt.target === popupProfileButtonClose) {
      popupProfile.classList.remove("popup_is-opened");
    }
  }
  
  function closeCardPopup(evt) {
    if (evt.target === cardModal || evt.target === cardModalClose) {
      cardModal.classList.remove("popup_is-opened");
    }
  }

  function openImageModal(src, alt, caption) {
    imageModalImage.src = src;
    imageModalImage.alt = alt;
    imageModalCaption.textContent = caption;
    imageModal.classList.add("popup_is-animated");
    imageModal.classList.add("popup_is-opened");
  }

  function closeImageModal(evt) {
    if (evt.target === imageModal || evt.target === imageModalClose) {
      imageModal.classList.remove("popup_is-opened");
    }
  }

  function handleKeyPress(evt) {
    if (evt.key === "Escape" || evt.keyCode === 27) {
      imageModal.classList.remove("popup_is-opened");
      popupProfile.classList.remove("popup_is-opened");
      cardModal.classList.remove("popup_is-opened");
    }
  }

  export { openProfilePopup, closeProfilePopup, closeCardPopup, openImageModal, closeImageModal, handleKeyPress }