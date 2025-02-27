// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "../pages/index.css";
import { initialCards } from "../components/cards.js";
import { createCard, like, deleteItem } from "../components/card.js";
import {
  openModal,
  closeModal,
  handleModalClose,
} from "../components/modal.js";

const template = document.querySelector("#card-template");
const cardsContainer = document.querySelector(".places__list");

const popupProfileButtonOpen = document.querySelector(".profile__edit-button");
const popupProfileButtonClose = document.querySelector(".popup__close");
const popupProfile = document.querySelector(".popup");

const cardButtonOpen = document.querySelector(".profile__add-button");
const cardModal = document.querySelector(".popup_type_new-card");
const cardModalClose = document.querySelector(
  ".popup_type_new-card .popup__close"
);

const imageModal = document.querySelector(".popup_type_image");
const imageModalClose = document.querySelector(
  ".popup_type_image .popup__close"
);
const imageModalImage = document.querySelector(
  ".popup_type_image .popup__image"
);
const imageModalCaption = document.querySelector(
  ".popup_type_image .popup__caption"
);

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileNameInput = document.querySelector(".popup__input_type_name");
const profileDescriptionInput = document.querySelector(
  ".popup__input_type_description"
);
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardUrlInput = document.querySelector(".popup__input_type_url");

const profileForm = document.querySelector(".popup__form[name='edit-profile']");
const cardForm = document.querySelector(".popup__form[name='new-place']");

initialCards.forEach((item) => {
  const newItem = createCard(
    item.name,
    item.link,
    item.alt,
    deleteItem,
    like,
    openImageModal
  );
  cardsContainer.append(newItem);
});

function openProfilePopup() {
  openModal(popupProfile);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

popupProfileButtonOpen.addEventListener("click", openProfilePopup);

cardButtonOpen.addEventListener("click", () => {
  openModal(cardModal);
});

popupProfile.addEventListener("click", handleModalClose);
cardModal.addEventListener("click", handleModalClose);
imageModal.addEventListener("click", handleModalClose);

function openImageModal(src, alt, caption) {
  imageModalImage.src = src;
  imageModalImage.alt = alt;
  imageModalCaption.textContent = caption;
  openModal(imageModal);
}

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(popupProfile);
}

profileForm.addEventListener("submit", handleFormProfileSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const cardName = cardNameInput.value;
  const cardLink = cardUrlInput.value;

  const newCard = createCard(cardName, cardLink, cardName, deleteItem, like);

  cardsContainer.prepend(newCard);

  closeModal(cardModal);

  cardForm.reset();
}

cardForm.addEventListener("submit", handleCardFormSubmit);
