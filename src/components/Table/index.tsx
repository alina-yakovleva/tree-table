import TreeView from "@mui/lab/TreeView";

import TreeItem from "@mui/lab/TreeItem";

import "./index.scss";

import { FC, useState } from "react";
import { IRow, IRowData } from "../../types";
import Icon1 from "../../assets/icon1.svg";
import Icon2 from "../../assets/icon2.svg";
import articleIcon from "../../assets/articleIcon.svg";
import DeleteIcon from "../../assets/delete.svg";
import { minWidth } from "@mui/system";
import { createRowInEntity, deleteRow, getRows } from "../../api";

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

const Buttos: React.FC<{
  row: IRow;
  depth: number;
  parentId: number | null;
}> = ({ row, depth, parentId }) => {
  return (
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
            <img onClick={() => createRowInEntity(parentId)} src={Icon1} />
          </>
        )}
        {(depth === 0 || depth === 1) && (
          <>
            <img onClick={() => createRowInEntity(row.id)} src={Icon2} />
          </>
        )}
        <img src={articleIcon} />
        <img src={DeleteIcon} onClick={() => deleteRow(row.id)} />

        {depth !== 0 && (
          <>
            <div className="line line_horizontal" />
            <div className="line line_vertical" />
          </>
        )}
      </div>
    </div>
  );
};

interface ITableProps {
  rows: IRow[];
}

const styles = {
  width: "100%",
};

const Row: FC<{
  row: IRow;
  depth: number;
  parentId: number | null;
}> = ({ row, depth, parentId }) => {
  return (
    <TreeItem
      nodeId={row.id.toString()}
      label={
        <div className="row">
          {cells.map((cell) => (
            <div
              style={{ minWidth: cell.minWidth, flex: cell.flex }}
              className="cell"
              key={cell.field}
            >
              {cell.field === "buttons" ? (
                <Buttos row={row} depth={depth} parentId={parentId} />
              ) : (
                row[cell.field].toString()
              )}
            </div>
          ))}
        </div>
      }
      key={row.id}
    >
      {row.child.map((r) => (
        <Row row={r} key={r.id} depth={depth + 1} parentId={row.id} />
      ))}
    </TreeItem>
  );
};
const Table: FC<ITableProps> = ({ rows }) => {
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

        <TreeView sx={styles} defaultExpanded={["1", "2", "3"]}>
          {rows.map((row, index) => (
            <Row row={row} depth={0} parentId={null} key={row.id} />
          ))}
        </TreeView>
      </div>
    </div>
  );
};
export default Table;
