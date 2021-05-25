import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

const Register = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [popupMessage, setPopupMessage] = useState("");
  const [isRegisteredPopup, setIsRegisteredPopup] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (props.loggedIn) history.push("/");
  }, [props.loggedIn, history]);

  function onChange(event) {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function onClose() {
    setIsRegisteredPopup(false);
    if (submitStatus) {
      history.push("/signin");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    props
      .onRegister(data.email, data.password)
      .then(() => {
        setSubmitStatus(true);
        setPopupMessage("Вы успешно зарегистрировались.");
      })
      .catch(() => {
        setPopupMessage(
          "Зарегистрироваться не получилось. Попробуйте еще раз "
        );
      })
      .finally(() => {
        setIsRegisteredPopup(true);
      });
  }

  return (
    <div className="registration">
      <h2 className="registration__heading">Регистрация</h2>
      <form onSubmit={handleSubmit} className="registration__form">
        <input
          name="email"
          type="email"
          value={data.email}
          onChange={onChange}
          className="registration__input"
          placeholder="Email"
          autoComplete="email"
        />
        <input
          name="password"
          type="password"
          value={data.password}
          onChange={onChange}
          className="registration__input"
          placeholder="Password"
          autoComplete="password"
        />
        <button type="submit" className="registration__submitBtn">
          Зарегистрироваться
        </button>
      </form>
      <p className="registration__title">
        Уже зарегистрировались ?
        <Link className="registration__link" to="/signin">
          Войти
        </Link>
      </p>
      <InfoTooltip
        isOpen={isRegisteredPopup}
        onClose={onClose}
        name="registration"
        status={submitStatus}
      >
        {popupMessage}
      </InfoTooltip>
    </div>
  );
};

export default Register;
