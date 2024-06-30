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
    type: string;
    variant?: { id: string; label: string, bgColor?: string, textColor?: string }[];
    actions?: { name: string, action: any }[];
  }[]
}