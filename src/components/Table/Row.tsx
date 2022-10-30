import { FC, useState } from "react";

import { createRowInEntity, deleteRow, updateRow } from "../../api";
import { CELLS } from "./constants";
import { IRow } from "../../types";

import { Input } from "./Input";
import { Buttons } from "./Buttons";

interface IRowProps {
  row: IRow;
  depth: number;
  onClick?: () => void;
  onDelete?: () => void;
  isLastParent?: boolean;
  additionalLine?: boolean;
}

export const Row: FC<IRowProps> = ({
  row,
  depth,
  onClick,
  additionalLine,
  isLastParent,
  onDelete,
}) => {
  const [localRow, setLocalRow] = useState(row);
  const [editable, setEditable] = useState(false);

  return (
    <>
      <div onDoubleClick={() => setEditable(true)} className="row">
        {CELLS.map((cell) => (
          <div
            style={{ minWidth: cell.minWidth, flex: cell.flex }}
            className="cell"
            key={cell.field}
          >
            {cell.field === "buttons" ? (
              <Buttons
                additionalLine={additionalLine}
                depth={depth}
                onFirstFolderClick={onClick}
                onSecondFolderClick={() =>
                  createRowInEntity(row.id).then(({ current }) =>
                    setLocalRow((state) => ({
                      ...state,
                      child: [...state.child, { ...current, child: [] }],
                    }))
                  )
                }
                onDelete={onDelete}
              />
            ) : editable ? (
              <Input
                value={localRow[cell.field].toString()}
                numberOnly={cell.field !== "rowName"}
                onChange={(value) =>
                  setLocalRow((state) => ({
                    ...state,
                    [cell.field]: value,
                  }))
                }
                onSubmit={() => {
                  const invalid = CELLS.some((c) =>
                    c.field !== "buttons"
                      ? localRow[c.field] === 0
                        ? false
                        : !localRow[c.field]
                      : false
                  );

                  if (invalid) {
                    return;
                  }

                  setEditable(false);
                  const { id, child, ...data } = localRow;

                  updateRow(localRow.id, data as any);
                }}
              />
            ) : (
              <div className="cell-content">
                {localRow[cell.field].toString()}
              </div>
            )}
          </div>
        ))}
      </div>
      {localRow.child.map((r, index, arr) => (
        <Row
          row={r}
          key={r.id}
          depth={depth + 1}
          onDelete={() =>
            deleteRow(r.id).then(() =>
              setLocalRow((state) => ({
                ...state,
                child: state.child.filter((i) => i.id !== r.id),
              }))
            )
          }
          isLastParent={arr.length - 1 === index}
          additionalLine={depth + 1 === 2 && !isLastParent}
        />
      ))}
    </>
  );
};
