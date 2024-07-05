export type TableDataType = {
  head: {
    id: string;
    label: string;
  }[];
  body: TableBodyRowType[];
}

export type TableBodyRowType = {
  rowData: {
    value: string;
    type: 'text' | 'options' | 'actions';
    id?: string;
    onSelected?: (id: string) => void;
    variant?: { id: string; label: string, bgColor?: string, textColor?: string }[];
    actions?: { name: string, action: any }[];
  }[]
}