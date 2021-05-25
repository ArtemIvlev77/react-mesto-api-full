import { Link, Route, Switch } from "react-router-dom";
import logo from "../image/logo.svg";

function Header(props) {
  return (
    <header className="header section">
      <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
      <Switch>
        <Route exact path="/signin">
          <Link className="header__link" to="/signup">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/signup">
          <Link className="header__link" to="/signin">
            Войти
          </Link>
        </Route>
        <Route path="/">
          <div className="header__nav-block">
            <p className="header__email">{props.email}</p>
            <Link
              className="header__signout"
              to="/signin"
              onClick={props.onSignOut}
            >
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
