import { FC, useState, useEffect } from "react";

import { createRowInEntity, deleteRow, getRows } from "../../api";
import { IRow } from "../../types";

import { CELLS } from "./constants";
import { Row } from "./Row";

import "./index.scss";

const Table: FC = () => {
  const [rows, setRows] = useState<IRow[]>([]);

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
          {CELLS.map((cell) => (
            <div
              style={{ minWidth: cell.minWidth, flex: cell.flex }}
              className="cell cell_head"
              key={cell.field}
            >
              {cell.name}
            </div>
          ))}
        </div>

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
      </div>
    </div>
  );
};
export default Table;
