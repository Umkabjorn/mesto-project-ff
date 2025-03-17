
function createCard(name, link, handleDeleteCard, openImageModal, owner, currentId) {
  const template = document.querySelector("#card-template");
  const templateElement = template.content.cloneNode(true);

  const cardImage = templateElement.querySelector(".card__image");
  cardImage.src = link;

  templateElement.querySelector(".card__image").src = link;
  templateElement.querySelector(".card__title").textContent = name;
 

  const deleteButton = templateElement.querySelector(".card__delete-button");


  if (owner === currentId) {
    deleteButton.classList.add('card__delete-button_is-active');
    deleteButton.addEventListener('click', () => {
    });
  } else {
    deleteButton.remove();
  }

  deleteButton.addEventListener("click", handleDeleteCard);

  cardImage.addEventListener("click", () => {
    openImageModal(link, name);
  });

  // handleLikeCard(templateElement);

  return templateElement;
}

function like(templateElement, onLike) {
  const cardLikeButton = templateElement.querySelector(".card__like-button");
  const counter = templateElement.querySelector('.card__like-counter');

  if (likes.length) {
    counter.classList.add('card__like-counter_is-active');
    counter.textContent = likes.length;
  }

  if (likes.some((like) => like['_id'] === currentId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener("click", () => {
    like({
      cardId: cardId,
      buttonElement: cardLikeButton,
      counterElement: counter,
    });
  });
}

function deleteItem(evt) {
  const eventTarget = evt.target;
  eventTarget.setAttribute("disabled", true);
  eventTarget.closest(".places__item").remove();
}

export { createCard, like, deleteItem };

