import { IRow, IRowData } from "./types";

const eID = 241;
const ROW_NAME = "a09c8198-c6dc-4842-979e-d71abd23e13b";

type IGetRowsResponse = IRow[];

export const getRows = (): Promise<IGetRowsResponse> =>
  fetch(`/v1/outlay-rows/entity/${eID}/row/list`).then((response) =>
    response.json()
  );

export const createRowInEntity = (parentId: number | null) =>
  fetch(`/v1/outlay-rows/entity/${eID}/row/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      equipmentCosts: 0,
      estimatedProfit: 0,
      machineOperatorSalary: 0,
      mainCosts: 0,
      materials: 0,
      mimExploitation: 0,
      overheads: 0,
      parentId,
      rowName: "",
      salary: 0,
      supportCosts: 0,
    }),
  }).then((response) => response.json());

export const updateRow = (rID: number, item: IRowData) =>
  fetch(`/v1/outlay-rows/entity/${eID}/row/${rID}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(item),
  }).then((response) => response.json());

export const deleteRow = (rID: number) =>
  fetch(`/v1/outlay-rows/entity/${eID}/row/${rID}/delete`, {
    method: "DELETE",
  }).then((response) => response.json());
