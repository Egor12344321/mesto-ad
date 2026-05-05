export const updateLike = (likeButton, likeCounter, newLikeCount) => {
  likeButton.classList.toggle("card__like-button_is-active");
  likeCounter.textContent = newLikeCount;
};

export const deleteCard = (cardElement) => {
  cardElement.remove();
};

const getCardTemplate = () => {
  return document
    .getElementById("card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

export const createCardElement = (
  cardData,
  { onPreviewPicture, onLikeIcon, onDeleteCard, onInfoClick, ownerID }
) => {
  const card = getCardTemplate();
  const likeButton = card.querySelector(".card__like-button");
  const deleteButton = card.querySelector(".card__control-button_type_delete");
  const infoButton = card.querySelector(".card__control-button_type_info");
  const cardImage = card.querySelector(".card__image");
  const cardLikeCounter = card.querySelector(".card__like-count");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  card.querySelector(".card__title").textContent = cardData.name;
  cardLikeCounter.textContent = cardData.likes.length;

  if (cardData.likes.some(like => like._id === ownerID)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (onLikeIcon) {
    likeButton.addEventListener("click", () => onLikeIcon(likeButton, cardLikeCounter));
  }

  if (onDeleteCard) {
    deleteButton.addEventListener("click", () => onDeleteCard(card, cardData._id));
  }

  if (onInfoClick) {
    infoButton.addEventListener("click", () => onInfoClick(cardData._id));
  }

  if (onPreviewPicture) {
    cardImage.addEventListener("click", () => onPreviewPicture({ name: cardData.name, link: cardData.link }));
  }

  if (cardData.owner._id !== ownerID) deleteButton.remove();

  return card;
};