// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCard(name, link, callbackMalbek) {
  const template = document.querySelector("#card-template");
  const templateElement = template.content.cloneNode(true);

  templateElement.querySelector(".card__image").src = link;
  templateElement.querySelector(".card__title").textContent = name;

  const deleteButton = templateElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", callbackMalbek);

  return templateElement;
}

function deleteItem(evt) {
  const eventTarget = evt.target;
  eventTarget.setAttribute("disabled", true);
  eventTarget.parentElement.remove();
}

initialCards.forEach((n) => {
  const newItem = createCard(n.name, n.link, deleteItem);
  document.querySelector(".places__list").append(newItem);
});
