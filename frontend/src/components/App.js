import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import * as auth from "../utils/auth";

function App() {
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [value, setValue] = useState({
    submit: "Сохранить",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({
    _id: null,
    avatar: "",
  });

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api
        .getUserInfo(jwt)
        .then((user) => {
          setLoggedIn(true);
          history.push("/");
          setCurrentUser(user.data);
        })
        .catch((e) => console.error(e.message));
      api
        .getInitialCards(jwt)
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
  }

  function handleCardClick(card) {
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api
        .toggleLikeCardStatus(card._id, !isLiked, jwt)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCardDelete = (card) => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api
        .deleteCard(card._id, jwt)
        .then(() => {
          const newCard = cards.filter((c) => c._id !== card._id);
          setCards(newCard);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function handleAddPlaceSubmit({ name, link }) {
    setValue({ ...value, submit: "Сохраняю данные..." });
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api
        .addPlace(name, link, jwt)
        .then((card) => setCards([card.data, ...cards]))
        .then(() => {
          closeAllPopups();
          setValue({ ...value, submit: "Сохранить" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleUpdateUser({ name, about }) {
    setValue({
      ...value,
      submit: "Сохранение...",
    });
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api
        .editUserInfo(name, about, jwt)
        .then(() => {
          setCurrentUser({
            ...currentUser,
            name: name,
            about: about,
          });
        })
        .then(() => {
          closeAllPopups();
          setValue({
            ...value,
            submit: "Сохранить",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleAvatarUpdate({ avatar }) {
    setValue({
      ...value,
      submit: "Сохраняю данные...",
    });
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api
        .editUserAvatar(avatar, jwt)
        .then(() => {
          setCurrentUser({
            ...currentUser,
            avatar: avatar,
          });
        })
        .then(() => {
          closeAllPopups();
          setValue({
            ...value,
            submit: "Сохранить",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    const handleCloseOnEsc = (event) => {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    };
    const handleCloseOnOverlay = (event) => {
      if (event.target.classList.contains("popup_is-opened")) {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", handleCloseOnEsc);
    document.addEventListener("click", handleCloseOnOverlay);

    return () => {
      document.removeEventListener("keydown", handleCloseOnEsc);
      document.removeEventListener("click", handleCloseOnOverlay);
    };
  }, []);

  const handleRegister = (email, password) => {
    return auth
      .register(email, password)
      .then((res) => {
        if (!res || res.statusCode === 400)
          throw new Error("Что-то пошло не так");
        return res;
      })
      .catch();
  };

  function handleLogin(email, password) {
    return auth.login(email, password).then((res) => {
      localStorage.setItem("jwt", res.jwt);
    });
  }

  function handleSignout() {
    setLoggedIn(false);
    setCurrentUser({ _id: null, avatar: "" });
    localStorage.removeItem("jwt");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <div className="page__container">
            <Header
              loggedIn={loggedIn}
              email={currentUser.email}
              onSignOut={handleSignout}
            />
            <Route path="/signup">
              <Register onRegister={handleRegister} loggedIn={loggedIn} />
            </Route>
            <Route path="/signin">
              <Login
                onLogin={handleLogin}
                loggedIn={loggedIn}
                checkToken={checkToken}
              />
            </Route>
            <Switch>
              <ProtectedRoute
                loggedIn={loggedIn}
                exact
                path="/"
                component={Main}
                card={cards}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
              />
            </Switch>
            <Footer />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              value={value.submit}
              onUpdateUser={handleUpdateUser}
            />

            <AddPlacePopup
              onClose={closeAllPopups}
              isOpen={isAddPlacePopupOpen}
              onAddPlacePopup={handleAddPlaceSubmit}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              value={value.submit}
              onUpdateAvatar={handleAvatarUpdate}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
