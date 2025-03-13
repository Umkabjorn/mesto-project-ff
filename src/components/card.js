
function createCard(name, link, alt, data, onDelete, handleDeleteCard, handleLikeCard, openImageModal) {
  const template = document.querySelector("#card-template");
  const templateElement = template.content.cloneNode(true);

  const cardImage = templateElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = alt;

  templateElement.querySelector(".card__image").src = link;
  templateElement.querySelector(".card__title").textContent = name;
  templateElement.querySelector(".card__image").alt = alt;

  const deleteButton = templateElement.querySelector(".card__delete-button");

  if (data.owner['_id'] === currentUserId) {
    deleteButton.classList.add('card__delete-button_is-active');
    deleteButton.addEventListener('click', () => {
      onDelete({
        cardId: data['_id'],
        cardElement: templateElement,
        buttonElement: deleteButton,
      });
    });
  } else {
    deleteButton.remove();
  }

  deleteButton.addEventListener("click", handleDeleteCard);

  cardImage.addEventListener("click", () => {
    openImageModal(link, alt, name);
  });

  handleLikeCard(templateElement);

  return templateElement;
}

function like(templateElement, onLike) {
  const cardLikeButton = templateElement.querySelector(".card__like-button");
  const counter = templateElement.querySelector('.card__like-counter');

  if (data.likes.length) {
    counter.classList.add('card__like-counter_is-active');
    counter.textContent = data.likes.length;
  }

  if (data.likes.some((like) => like['_id'] === currentUserId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener("click", () => {
    onLike({
      cardId: data['_id'],
      buttonElement: cardLikeButton,
      counterElement: counter,
    });
  });
}

function deleteItem(evt) {
  const eventTarget = evt.target;
  eventTarget.setAttribute("disabled", true);
  eventTarget.closest(".places__item").remove();
  cardElement.remove();
}

export { createCard, like, deleteItem };

