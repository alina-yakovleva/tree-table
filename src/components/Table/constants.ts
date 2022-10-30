import { IRow } from "../../types";

export const CELLS: {
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
