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

// DOM узлы
const template = document.querySelector("#card-template");
const cardsContainer = document.querySelector(".places__list");

const popupProfileButtonOpen = document.querySelector(".profile__edit-button");
const popupProfileButtonClose = document.querySelector(".popup__close");
const popupProfile = document.querySelector(".popup_type_edit");
const deletePopup = document.querySelector(".popup_type_delete");
const closeDeleteButton = deletePopup.querySelector(".popup__close");
const deleteForm = document.querySelector('form[name="delete-card"');


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
const profileFormSubmitButton = profileForm.querySelector('.popup__button');
const cardForm = document.querySelector(".popup__form[name='new-place']");

const profileAvatar = document.querySelector(".profile__image");
const profileAvatarForm = document.querySelector(
  ".popup__form[name='edit-avatar']"
);
const popupProfileAvatar = document.querySelector(".popup_type_edit-avatar");
const avatarPopupButton = document.querySelector(".profile__image-edit");
const profileImageFormSubmitButton = profileAvatarForm.querySelector(
  ".popup__button"
);
const profileAvatarInput = document.querySelector(
  ".popup__input_type_avatar_url"
);

// Функция для обновления данных профиля на странице
const profileData = ({ name, description, avatar }) => {
  profileName.textContent = name;
  profileDescription.textContent = description;
  profileAvatar.style.backgroundImage = `url(${avatar})`;
};


// Функция для управления состоянием кнопки (индикатор загрузки)
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
let likes = {};

// Конфигурация валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Включение валидации
enableValidation(validationConfig);

// Загрузка данных профиля и карточек
const requests = [getProfileInfo(), getCards()];
Promise.all(requests)
.then((result) => {
  profileInfo = result[0];
  initialCards = result[1];
  profileData(profileInfo);
  

  initialCards.forEach((item) => {
    const newItem = createCard(
      item.name,
      item.link,
      deleteItem,
      item.likes,
      like,
      openImageModal,
      item.owner._id,
      profileInfo._id,
      item._id
    );
    cardsContainer.append(newItem);
  });
  
});




// Функция для открытия попапа редактирования профиля
function openProfilePopup() {
  openModal(popupProfile);

  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  clearValidation(profileForm, validationConfig);
}

// Обработчики событий для открытия попапов
popupProfileButtonOpen.addEventListener("click", openProfilePopup);
cardButtonOpen.addEventListener("click", () => {
  openModal(cardModal);
  clearValidation(profileForm, validationConfig);
});
avatarPopupButton.addEventListener("click", openAvatarPopup);

// Обработчики событий для закрытия попапов
popupProfile.addEventListener("click", handleModalClose);
cardModal.addEventListener("click", handleModalClose);
imageModal.addEventListener("click", handleModalClose);
popupProfileAvatar.addEventListener("click", handleModalClose);

// Функция для открытия попапа редактирования аватара
function openAvatarPopup() {
  openModal(popupProfileAvatar);
  clearValidation(profileAvatarForm, validationConfig);
}

// Функция для обработки отправки формы аватара
function handleFormAvatarSubmit(evt) {
  evt.preventDefault();

  renderLoading({
    buttonElement: profileImageFormSubmitButton,
    isLoading: true,
  });

  updateAvatar(profileAvatarInput.value)
    .then(({ name, about, avatar }) => {
      profileData({
        name,
        description: about,
        avatar,
      });
      closeModal(popupProfileAvatar);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении аватара:", error);
    })
    .finally(() => {
      renderLoading({
        buttonElement: profileImageFormSubmitButton,
        isLoading: false,
      });
    });
}

// Функция для открытия попапа с изображением
function openImageModal(src, caption) {
  imageModalImage.src = src;
  imageModalCaption.textContent = caption;
  openModal(imageModal);
}

// Функция для обработки отправки формы профиля
function handleFormProfileSubmit(evt) {
  evt.preventDefault();

  renderLoading({
    buttonElement: profileFormSubmitButton,
    isLoading: true,
  });

  updateProfile({
    name: profileNameInput.value,
    description: profileDescriptionInput.value,
  })
    .then(({ name, about }) => {
      profileData({
        name,
        description: about,
      });
      closeModal(popupProfile);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении профиля:", error);
    })
    .finally(() => {
      renderLoading({
        buttonElement: profileFormSubmitButton,
        isLoading: false,
      });
    });
}

// Функция для обработки отправки формы карточки
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
  })
    .then((card) => {
      const newCard = createCard(
        card.name,
        card.link,
        deleteItem,
        like,
        openImageModal,
        card.owner._id,
        profileInfo._id
      );
      cardsContainer.prepend(newCard);
      closeModal(cardModal);
      cardForm.reset();
    })
    .catch((error) => {
      console.error("Ошибка при создании карточки:", error);
    })
    .finally(() => {
      renderLoading({
        buttonElement: cardForm.querySelector(".popup__button"),
        isLoading: false,
      });
    });
}

const openDeletePopup = () => {
  openModal(deletePopup);
};

const closeDeletePopup = () => {
  closeModal(deletePopup);
};

closeDeleteButton.addEventListener("click", closeDeletePopup);

function deleteThisCard({cardId, deleteButton}) {
  deleteCard(cardId)
  .then(() => {
    const deleteItem = deleteButton.closest(".places__item");
    deleteItem.remove();
    closeDeletePopup();
  });
}

function handleDeleteForm(evt) {
  evt.preventDefault();
  deleteThisCard(getCardForDeletion());
}

deleteForm.addEventListener("submit", handleDeleteForm);

// Обработчики событий для форм
profileForm.addEventListener("submit", handleFormProfileSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
profileAvatarForm.addEventListener("submit", handleFormAvatarSubmit);