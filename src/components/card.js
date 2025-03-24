import  { likeCard, unlikeCard } from "../components/api.js";


function createCard(
  name,
  link,
  handleDeleteCard,
  openImageModal,
  likes,
  owner,
  currentId,
  cardId
) {
  console.log(owner);
  const template = document.querySelector("#card-template");
  const templateElement = template.content.cloneNode(true);


  const cardImage = templateElement.querySelector(".card__image");
  cardImage.src = link;

  templateElement.querySelector(".card__image").src = link;
  templateElement.querySelector(".card__title").textContent = name;

  const deleteButton = templateElement.querySelector(".card__delete-button");
 
  const likesCount = templateElement.querySelector('.card__like-button');
  const likeButton = templateElement.querySelector('.card__like-counter');


  likesCount.textContent = likes.length;

  if (owner === currentId) {
    deleteButton.classList.add("card__delete-button_is-active");
    deleteButton.addEventListener("click", () => {});
  } else {
    deleteButton.remove();
  }


  deleteButton.addEventListener("click", handleDeleteCard);
  
  const isLiked = likes.some((like) => like._id === currentId)
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", () => {
    likeCard(likeButton, likeCounter, cardId);
  });

   likeButton.addEventListener('click', () => {
    handleLike({
      cardId: cardId,
      buttonElement: likeButton,
      counterElement: likesCount,
    });
  });
 
  cardImage.addEventListener("click", () => {
    openImageModal(link, name);
  });

  return templateElement;
}

function addLikeCard(likeButton, likesCount, cardId) {
  let likeChecker;

  if (likeButton.classList.contains("card__like-button_is-active")) {
    likeChecker = unlikeCard;
  } else {
    likeChecker = likeCard;
  }

  likeChecker(cardId)
    .then((result) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likesCount.textContent = result.likes.length;
    })
    .catch((error) => {
      console.log(error);
    });
}


function deleteItem(evt) {
  const eventTarget = evt.target;
  eventTarget.setAttribute("disabled", true);
  eventTarget.closest(".places__item").remove();
}

export { createCard, addLikeCard, deleteItem };
