// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "../pages/index.css";
import { createCard, like, deleteItem } from "../components/card.js";
import {
  openModal,
  closeModal,
  handleModalClose,
} from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import {
  getProfileInfo,
  getCards,
  updateProfile,
  APICreateCard,
  getCardLikes,
  deleteCard,
  likeCard,
  unlikeCard,
  updateAvatar,
} from "../components/api.js";

const template = document.querySelector("#card-template");
const cardsContainer = document.querySelector(".places__list");

const popupProfileButtonOpen = document.querySelector(".profile__edit-button");
const popupProfileButtonClose = document.querySelector(".popup__close");
const popupProfile = document.querySelector(".popup_type_edit");

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
const profileFormSubmitButton = profileForm.querySelector('.popup__button');

const profileNameInput = document.querySelector(".popup__input_type_name");
const profileDescriptionInput = document.querySelector(
  ".popup__input_type_description"
);
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardUrlInput = document.querySelector(".popup__input_type_url");

const profileForm = document.querySelector(".popup__form[name='edit-profile']");
const cardForm = document.querySelector(".popup__form[name='new-place']");

const profileAvatar = document.querySelector(".profile__image");
const profileAvatarForm = document.querySelector(
  ".popup__form[name='edit-avatar']"
);
const popupProfileAvatar = document.querySelector(".popup_type_edit-avatar");
const avatarPopupButton = document.querySelector(".profile__image-edit");
const profileImageFormSubmitButton = profileAvatarForm.querySelector(".popup__button");
const profileAvatarInput = document.querySelector(
  ".popup__input_type_avatar_url"
);

const profileData = ({ name, description, avatar }) => {
  profileName.textContent = name;
  profileDescription.textContent = description;
  profileAvatar.style.backgroundImage = `url(${avatar})`;
};

const renderLoading = ({ buttonElement, isLoading }) => {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
    buttonElement.disabled = true;
  } else {
    buttonElement.textContent = "Сохранить";
    buttonElement.disabled = false;
  }
};

let initialCards = {};
let profileInfo = {};

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

const requests = [getProfileInfo(), getCards()];
Promise.all(requests).then((result) => {
  profileInfo = result[0];
  console.log(profileInfo);
  initialCards = result[1];
  initialCards.forEach((item) => {
    const newItem = createCard(
      item.name,
      item.link,
      deleteItem,
      // like,
      openImageModal,
      item.owner._id,
      profileInfo._id
    );
    cardsContainer.append(newItem);
  });
});

function openProfilePopup() {
  openModal(popupProfile);

  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  clearValidation(profileForm, validationConfig);
}

popupProfileButtonOpen.addEventListener("click", openProfilePopup);

popupProfile.addEventListener("click", handleModalClose);
cardModal.addEventListener("click", handleModalClose);
imageModal.addEventListener("click", handleModalClose);

cardButtonOpen.addEventListener("click", () => {
  openModal(cardModal);

  clearValidation(profileForm, validationConfig);
});

function openAvatarPopup() {
  openModal(popupProfileAvatar);

  clearValidation(profileAvatarForm, validationConfig);
}

avatarPopupButton.addEventListener("click", openAvatarPopup);
popupProfileAvatar.addEventListener("click", handleModalClose);

function handleFormAvatarSubmit(evt) {
  evt.preventDefault();

  renderLoading({
    buttonElement: profileImageFormSubmitButton,
    isLoading: true,
  });

  updateAvatar(profileAvatarInput.value)
    .then(({ avatar }) => {
      profileData({
        avatar,
      });
      closeModal(popupProfileAvatar);
    })
    .finally(() => {
      renderLoading({
        buttonElement: profileImageFormSubmitButton,
        isLoading: false,
      });
    });
}

function openImageModal(src, caption) {
  imageModalImage.src = src;
  imageModalCaption.textContent = caption;
  openModal(imageModal);
}

function handleFormProfileSubmit(evt) {
  evt.preventDefault();

  updateProfile({
    name: profileNameInput.value,
    description: profileDescriptionInput.value,
  }).then(({ name, about }) => {
    profileData({
      name,
      description: about,
    });

    closeModal(popupProfile);
  })
  .finally(() => {
    renderLoading({
      buttonElement: profileFormSubmitButton,
      isLoading: false,
    });
  });
}

profileForm.addEventListener("submit", handleFormProfileSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const cardName = cardNameInput.value;
  const cardLink = cardUrlInput.value;

  renderLoading({
    buttonElement: cardForm.querySelector(".popup__button"),
    isLoading: true,
  });

  APICreateCard({
    name: cardName,
    link: cardLink,
  }).then((card) => {
    const newCard = createCard(
      name,
      template,
      like,
      openImageModal,
      deleteItem,
      owner._id
    );
  });

  const newCard = createCard(cardName, cardLink, cardName, deleteItem, like);

  cardsContainer.prepend(newCard);

  closeModal(cardModal);

  cardForm.reset();
}

cardForm.addEventListener("submit", handleCardFormSubmit);
profileAvatarForm.addEventListener("submit", handleFormAvatarSubmit);
