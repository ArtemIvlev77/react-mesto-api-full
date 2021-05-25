import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

function Login(props) {
  const [data, setData] = useState({
    currentEmail: "",
    currentPassword: "",
  });
  const [popupMessage, setPopupMessage] = useState("");
  const [isLoginPopup, setIsLoginPopup] = useState(false);
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
    setIsLoginPopup(false);
    if (submitStatus) {
      props.checkToken();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    props
      .onLogin(data.currentEmail, data.currentPassword)
      .then(() => {
        setSubmitStatus(true);
        setPopupMessage("Вы вошли!");
      })
      .catch(() => {
        setPopupMessage("Что-то не получилось. Попробуйте снова.");
      })
      .finally(() => {
        setIsLoginPopup(true);
      });
  }

  return (
    <div className="registration">
      <h2 className="registration__heading">Вход</h2>
      <form className="registration__form" onSubmit={handleSubmit}>
        <input
          className="registration__input"
          type="email"
          name="currentEmail"
          placeholder="email"
          value={data.currentEmail}
          onChange={onChange}
          autoComplete="email"
        />
        <input
          className="registration__input"
          type="password"
          name="currentPassword"
          placeholder="password"
          value={data.currentPassword}
          onChange={onChange}
          autoComplete="current-password"
        />
        <button type="submit" className="registration__submitBtn">
          Войти
        </button>
      </form>

      <InfoTooltip
        isOpen={isLoginPopup}
        onClose={onClose}
        name="login"
        status={submitStatus}
      >
        {popupMessage}
      </InfoTooltip>
    </div>
  );
}

export default Login;
