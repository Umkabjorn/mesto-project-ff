const config = {
  baseUrl: "https://nomoreparties.co/v1/pwff-cohort-1",
  headers: {
    authorization: "0f4c8a12-5fd1-41e2-b4b3-fd1dd84f74fa",
    "Content-Type": "application/json",
  },
};

const handleResponse = (response) => {
  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status}`);
  }
  return response.json();
};

const getProfileInfo = async () => {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
    .then(handleResponse)
    .catch((error) => {
      console.error("Ошибка при загрузке информации профиля:", error.message);
      throw error;
    });
};

const getCards = async () => {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers })
    .then(handleResponse)
    .catch((error) => {
      console.error("Ошибка при загрузке карточек:", error.message);
      throw error;
    });
};

const updateProfile = ({ name, description }) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about: description,
    }),
  })
    .then(handleResponse)
    .catch((error) => {
      console.error("Ошибка при обновлении профиля:", error.message);
      throw error;
    });
};

const APICreateCard = ({ name, link }) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  })
    .then(handleResponse)
    .catch((error) => {
      console.error("Ошибка при добавлении карточки:", error.message);
      throw error;
    });
};

const getCardLikes = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'GET',
        headers: config.headers,
    })
    .then(handleResponse)
    .catch(error => {
        console.error('Ошибка при получении количества лайков:', error.message);
        throw error;
    });
}

const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(handleResponse)
    .catch(error => {
        console.error('Ошибка при удалении карточки:', error.message);
        throw error;
        });
       }

const likeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`), {
        method: 'PUT',
        headers: config.headers,
    }
    .then(handleResponse)
    .catch(error => {
        console.error('Ошибка при постановке лайка:', error.message);
        throw error;
        });
}

const unlikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(handleResponse)
    .catch(error => {
        console.error('Ошибка при удалении лайка:', error.message);
        throw error;
        });

}

const updateAvatar = (url) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: url,
          }),
    })
    .then(handleResponse)
    .catch(error => {
        console.error('Ошибка при добавлении аватара:', error.message);
        throw error;
        });

}
export { handleResponse, getProfileInfo, getCards, updateProfile, APICreateCard, getCardLikes, deleteCard, likeCard, unlikeCard, updateAvatar }