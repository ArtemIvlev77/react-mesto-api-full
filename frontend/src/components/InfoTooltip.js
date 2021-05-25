import Popup from "./Popup";
import regOk from "../image/regOk.svg";
import regError from "../image/regError.svg";

function InfoToolTip(props) {
  return (
    <Popup isOpen={props.isOpen} onClose={props.onClose} name={props.name}>
      <img
        src={props.status ? regOk : regError}
        alt=""
        className="popup__reg-image"
      />
      <p className="popup__reg-message">{props.children}</p>
    </Popup>
  );
}

export default InfoToolTip;
