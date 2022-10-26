import { TreeView, TreeItem } from "@mui/lab";

import { FC, useState, useMemo, useEffect } from "react";
import { IRow } from "../../types";

import Icon1 from "../../assets/icon1.svg";
import Icon2 from "../../assets/icon2.svg";
import articleIcon from "../../assets/articleIcon.svg";
import DeleteIcon from "../../assets/delete.svg";

import { createRowInEntity, deleteRow, getRows, updateRow } from "../../api";

import "./index.scss";

const cells: {
  field: keyof IRow | "buttons";
  name: string;
  minWidth: number;
  flex?: number;
}[] = [
  { field: "buttons", name: "Уровень", minWidth: 120 },
  { field: "rowName", name: "Наименование работ", minWidth: 200, flex: 1 },
  { field: "salary", name: "Основная зп", minWidth: 200 },
  { field: "equipmentCosts", name: "Оборудование", minWidth: 200 },
  { field: "overheads", name: "Накладные расходы", minWidth: 200 },
  { field: "estimatedProfit", name: "Сметная прибыль", minWidth: 200 },
];

const onPreventNotNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = ["Delete", "Backspace", "ArrowLeft", "ArrowRight"];

  if (allowedKeys.includes(e.key)) {
    return;
  }

  const isNumber = /[0-9]/.test(e.key);

  if (!isNumber) {
    e.preventDefault();
  }
};

const styles = {
  width: "100%",
};

const Row: FC<{
  row: IRow;
  depth: number;
  onClick?: () => void;
  onDelete?: () => void;
  isLastParent?: boolean;
  additionalLine?: boolean;
}> = ({ row, depth, onClick, additionalLine, isLastParent, onDelete }) => {
  const [localRow, setLocalRow] = useState(row);
  const [editable, setEditable] = useState(false);

  return (
    <TreeItem
      nodeId={row.id.toString()}
      label={
        <div onDoubleClick={() => setEditable(true)} className="row">
          {cells.map((cell) => (
            <div
              style={{ minWidth: cell.minWidth, flex: cell.flex }}
              className="cell"
              key={cell.field}
            >
              {cell.field === "buttons" ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <div
                    className="icons"
                    style={{
                      zIndex: 1000 - depth,
                    }}
                  >
                    {depth === 0 && (
                      <>
                        <img onClick={onClick} src={Icon1} alt="folder" />
                      </>
                    )}
                    {(depth === 0 || depth === 1) && (
                      <>
                        <img
                          onClick={() =>
                            createRowInEntity(row.id).then(({ current }) =>
                              setLocalRow((state) => ({
                                ...state,
                                child: [
                                  ...state.child,
                                  { ...current, child: [] },
                                ],
                              }))
                            )
                          }
                          src={Icon2}
                          alt="folder"
                        />
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
                    {additionalLine && (
                      <div className="line line_vertical folder" />
                    )}
                  </div>
                </div>
              ) : editable ? (
                <input
                  value={localRow[cell.field].toString()}
                  onChange={(e) =>
                    setLocalRow((state) => ({
                      ...state,
                      [cell.field]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (cell.field !== "rowName") {
                      onPreventNotNumber(e);
                    }

                    if (e.key === "Enter") {

                      const invalid = cells.some((c) =>
                        c.field !== "buttons"
                          ? localRow[c.field] === 0 ? false : !localRow[c.field]
                          : false
                      );

                      if (invalid) {
                        return;
                      }

                      setEditable(false);
                      const { id, child, ...data } = localRow;

                      updateRow(localRow.id, data as any);
                    }
                  }}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  {localRow[cell.field].toString()}
                </div>
              )}
            </div>
          ))}
        </div>
      }
      key={row.id}
    >
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
    </TreeItem>
  );
};

const getRowIds = (rows: IRow[]): string[] =>
  rows.reduce<string[]>(
    (acc, row) => [...acc, row.id.toString(), ...getRowIds(row.child)],
    []
  );

const Table: FC = () => {
  const [rows, setRows] = useState<IRow[]>([]);

  const expanded = useMemo(() => getRowIds(rows), [rows]);

  useEffect(() => {
    getRows().then(setRows);
  }, []);

  return (
    <div className="t-content">
      <div className="t-content-header">
        <div className="t-content-header_title">
          Строительно-монтажные работы
        </div>
      </div>
      <div className="body">
        <div className="row">
          {cells.map((cell) => (
            <div
              style={{ minWidth: cell.minWidth, flex: cell.flex }}
              className="cell"
              key={cell.field}
            >
              {cell.name}
            </div>
          ))}
        </div>

        <TreeView sx={styles} expanded={expanded} defaultExpanded={expanded}>
          {rows.map((row) => (
            <Row
              row={row}
              depth={0}
              onClick={() =>
                createRowInEntity(null).then(({ current }) =>
                  setRows((state) => [...state, { ...current, child: [] }])
                )
              }
              onDelete={() =>
                deleteRow(row.id).then(() =>
                  setRows((state) => state.filter((i) => i.id !== row.id))
                )
              }
              key={row.id}
            />
          ))}
        </TreeView>
      </div>
    </div>
  );
};
export default Table;
