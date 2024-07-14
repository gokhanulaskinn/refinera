export type TableDataType = {
  head: {
    id: string;
    label: string;
  }[];
  body: TableBodyRowType[];
}

export type TableBodyRowType = {
  rowData: TableRowCellType[]
}

export type TableRowCellType = {
  value: string | string[];
  type: 'text' | 'options' | 'actions' | 'badge';
  id?: string;
  onSelected?: (id: string) => void;
  variant?: { id: string; label: string, bgColor?: string, textColor?: string }[];
  actions?: { name: string, action: any }[];
}