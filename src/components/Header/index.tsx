import React from "react";
import Menu from "../../assets/menu.svg";
import Arrow from "../../assets/arrow.svg";
import "./index.scss";
import { Box } from "@mui/system";
const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <div className="header-content item">
          <img src={Menu} />
        </div>
        <div className="header-content item">
          <img src={Arrow} />
        </div>
        <div className="header-content item header__title_active">Просмотр</div>

        <div className="header-content item header__title">Управление</div>
      </div>
    </div>
  );
};
export default Header;
