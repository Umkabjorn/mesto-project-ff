// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "../pages/index.css";
import { initialCards } from "../components/cards.js";
import { createCard, like, deleteItem, openImageModal } from '../components/card.js';
import { openProfilePopup, closeProfilePopup, closeCardPopup, openImageModal, closeImageModal, handleKeyPress } from "../components/modal.js";

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


// function createCard(name, link, alt, callback, likeCallback) {
//   const template = document.querySelector("#card-template");
//   const templateElement = template.content.cloneNode(true);

//   const cardImage = templateElement.querySelector(".card__image");
//   cardImage.src = link;
//   cardImage.alt = alt;

//   templateElement.querySelector(".card__image").src = link;
//   templateElement.querySelector(".card__title").textContent = name;
//   templateElement.querySelector(".card__image").alt = alt;

//   const deleteButton = templateElement.querySelector(".card__delete-button");

//   deleteButton.addEventListener("click", callback);

//   cardImage.addEventListener("click", () => {
//     openImageModal(link, alt, name);
//   });

//   likeCallback(templateElement);

//   return templateElement;
// }

// function like(templateElement) {
//   const cardLikeButton = templateElement.querySelector(".card__like-button");
//   cardLikeButton.addEventListener("click", () => {
//     cardLikeButton.classList.toggle("card__like-button_is-active");
//   });
// }

// function deleteItem(evt) {
//   const eventTarget = evt.target;
//   eventTarget.setAttribute("disabled", true);
//   eventTarget.closest(".places__item").remove();
// }

initialCards.forEach((n) => {
const newItem = createCard(n.name, n.link, n.alt, deleteItem, like);
cardsContainer.append(newItem);
});

// function openProfilePopup() {
//   popupProfile.classList.add("popup_is-animated");
//   popupProfile.classList.add("popup_is-opened");
//   profileNameInput.value = profileName.textContent;
//   profileDescriptionInput.value = profileDescription.textContent;
// }

popupProfileButtonOpen.addEventListener("click", openProfilePopup);

// function closeProfilePopup(evt) {
//   if (evt.target === popupProfile || evt.target === popupProfileButtonClose) {
//     popupProfile.classList.remove("popup_is-opened");
//   }
// }

popupProfile.addEventListener("click", closeProfilePopup);

cardButtonOpen.addEventListener("click", (evt) => {
  cardModal.classList.add("popup_is-animated");
  cardModal.classList.add("popup_is-opened");
});

// function closeCardPopup(evt) {
//   if (evt.target === cardModal || evt.target === cardModalClose) {
//     cardModal.classList.remove("popup_is-opened");
//   }
// }

cardModal.addEventListener("click", closeCardPopup);

// function openImageModal(src, alt, caption) {
//   imageModalImage.src = src;
//   imageModalImage.alt = alt;
//   imageModalCaption.textContent = caption;
//   imageModal.classList.add("popup_is-animated");
//   imageModal.classList.add("popup_is-opened");
// }

// function closeImageModal(evt) {
//   if (evt.target === imageModal || evt.target === imageModalClose) {
//     imageModal.classList.remove("popup_is-opened");
//   }
// }

// function handleKeyPress(evt) {
//   if (evt.key === "Escape" || evt.keyCode === 27) {
//     imageModal.classList.remove("popup_is-opened");
//     popupProfile.classList.remove("popup_is-opened");
//     cardModal.classList.remove("popup_is-opened");
//   }
// }

imageModal.addEventListener("click", closeImageModal);
imageModalClose.addEventListener("click", closeImageModal);
document.addEventListener("keyup", handleKeyPress);

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  popupProfile.classList.remove("popup_is-opened");
}

profileForm.addEventListener("submit", handleFormProfileSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const cardName = cardNameInput.value;
  const cardLink = cardUrlInput.value;

  const newCard = createCard(cardName, cardLink, cardName, deleteItem, like);

  cardsContainer.prepend(newCard);

  cardModal.classList.remove("popup_is-opened");

  cardForm.reset();
}

cardForm.addEventListener("submit", handleCardFormSubmit);
