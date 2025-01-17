// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const template = document.querySelector("#card-template");
const cardsContainer = document.querySelector(".places__list");


function createCard(name, link, alt, callback) {
  const template = document.querySelector("#card-template");
  const templateElement = template.content.cloneNode(true);

  templateElement.querySelector(".card__image").src = link;
  templateElement.querySelector(".card__title").textContent = name;
  templateElement.querySelector(".card__image").alt = alt;

  const deleteButton = templateElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", callback);

  return templateElement;
}

function deleteItem(evt) {
  const eventTarget = evt.target;
  eventTarget.setAttribute("disabled", true);
  eventTarget.closest('.places__item').remove();
}

initialCards.forEach((n) => {
  const newItem = createCard(n.name, n.link, n.alt, deleteItem);
  cardsContainer.append(newItem);
});


