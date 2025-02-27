
function createCard(name, link, alt, callback, likeCallback, openImageModal) {
  const template = document.querySelector("#card-template");
  const templateElement = template.content.cloneNode(true);

  const cardImage = templateElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = alt;

  templateElement.querySelector(".card__image").src = link;
  templateElement.querySelector(".card__title").textContent = name;
  templateElement.querySelector(".card__image").alt = alt;

  const deleteButton = templateElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", callback);

  cardImage.addEventListener("click", () => {
    openImageModal(link, alt, name);
  });

  likeCallback(templateElement);

  return templateElement;
}

function like(templateElement) {
  const cardLikeButton = templateElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  });
}

function deleteItem(evt) {
  const eventTarget = evt.target;
  eventTarget.setAttribute("disabled", true);
  eventTarget.closest(".places__item").remove();
}

export { createCard, like, deleteItem };

