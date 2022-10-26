import Menu from "../../assets/menu.svg";
import Arrow from "../../assets/arrow.svg";

import "./index.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <div className="header-content item">
          <img src={Menu} alt="menu" />
        </div>
        <div className="header-content item">
          <img src={Arrow} alt="arrow" />
        </div>
        <div className="header-content item header__title_active">Просмотр</div>

        <div className="header-content item header__title">Управление</div>
      </div>
    </div>
  );
};
export default Header;
