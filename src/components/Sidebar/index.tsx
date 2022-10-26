import SideBarIcon from "../../assets/sidebar-icon.svg";

import ArrowDown from "../../assets/arrow-down.svg";

import "./index.scss";

const sidebar = [
  { id: 1, name: "По проекту" },
  { id: 2, name: "Объекты" },
  { id: 3, name: "РД" },
  { id: 4, name: "МТО" },
  { id: 5, name: "СМР" },
  { id: 6, name: "График" },
  { id: 7, name: "МиМ" },
  { id: 8, name: "Рабочие" },
  { id: 9, name: "Капвложения" },
  { id: 10, name: "Бюджет" },
  { id: 11, name: "Финансирование" },
  { id: 12, name: "Панорамы" },
  { id: 13, name: "Камеры" },
  { id: 14, name: "Поручения" },
  { id: 15, name: "Контрагенты" },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-column">
        <div className="sidebar-header">
          <div>
            <div className="content-name">Название проекта</div>
            <div className="content-text">Аббревиатура</div>
          </div>
          <div>
            <img src={ArrowDown} alt="arrow" />
          </div>
        </div>
        {sidebar.map((item) => (
          <div className="sidebar-item">
            <img src={SideBarIcon}  alt="sidebar-icon"  />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Sidebar;
