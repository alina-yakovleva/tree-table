import { FC } from "react";

import Icon1 from "../../assets/icon1.svg";
import Icon2 from "../../assets/icon2.svg";
import articleIcon from "../../assets/articleIcon.svg";
import DeleteIcon from "../../assets/delete.svg";

interface IButtonsProps {
  depth: number;
  onFirstFolderClick?: () => void;
  onSecondFolderClick?: () => void;
  onDelete?: () => void;
  additionalLine?: boolean;
}

export const Buttons: FC<IButtonsProps> = ({
  depth,
  onFirstFolderClick,
  onSecondFolderClick,
  onDelete,
  additionalLine,
}) => {
  return (
    <div className="icons-wrapper">
      <div
        className="icons"
        style={{
          zIndex: 1000 - depth,
        }}
      >
        {depth === 0 && (
          <>
            <img onClick={onFirstFolderClick} src={Icon1} alt="folder" />
          </>
        )}
        {(depth === 0 || depth === 1) && (
          <>
            <img onClick={onSecondFolderClick} src={Icon2} alt="folder" />
          </>
        )}
        <img src={articleIcon} alt="doc" />
        <img src={DeleteIcon} onClick={onDelete} alt="trash" />

        {depth !== 0 && (
          <>
            <div className="line line_horizontal" />
            <div className="line line_vertical" />
          </>
        )}
        {additionalLine && <div className="line line_vertical folder" />}
      </div>
    </div>
  );
};
