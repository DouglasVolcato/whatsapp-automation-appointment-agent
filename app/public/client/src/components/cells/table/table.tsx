import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { JSX, useRef } from "react";

type Props = {
  title: string;
  filters?: JSX.Element;
  items: any[];
  columns: {
    name: string;
    field: string;
    template?: (item: any) => JSX.Element;
  }[];
  onAddNewItem?: () => void;
  onEditItem?: (item: any) => void;
  onDeleteItem?: (item: any) => void;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
  showPagination?: boolean;
  showLastPageButton?: boolean;
};

export default function Table({
  title,
  items,
  filters,
  columns,
  onAddNewItem,
  onEditItem,
  onDeleteItem,
  onNextPage,
  onPreviousPage,
  showPagination,
  showLastPageButton,
}: Props) {
  const dt = useRef<any>(null);

  const header = (
    <div className="flex align-items-center justify-content-between gap-3 flex-wrap">
      <span className="text-xl text-900 font-bold">{title}</span>
      {onAddNewItem && (
        <Button
          icon="pi pi-plus"
          rounded
          raised
          severity="info"
          onClick={onAddNewItem}
        />
      )}
      {filters}
    </div>
  );

  return (
    <div className="card">
      <DataTable
        ref={dt}
        emptyMessage="Sem dados para mostrar."
        value={items}
        header={header}
        footer={
          <div className="flex flex-wrap justify-content-center gap-4">
            {showPagination && (
              <>
                {showLastPageButton && (
                  <Button
                    icon="pi pi-arrow-left"
                    severity="secondary"
                    onClick={onPreviousPage}
                  />
                )}
                <Button
                  icon="pi pi-arrow-right"
                  severity="secondary"
                  onClick={onNextPage}
                />
              </>
            )}
          </div>
        }
        tableStyle={{ minWidth: "50rem" }}
      >
        {columns.map((column, index) => (
          <Column
            key={index}
            field={column.field}
            header={column.name}
            body={column.template}
          ></Column>
        ))}
        {(onEditItem || onDeleteItem) && (
          <Column
            header=""
            body={(item) => (
              <div className="flex flex-wrap justify-content-start gap-2">
                {onEditItem && (
                  <Button
                    icon="pi pi-pencil"
                    rounded
                    raised
                    onClick={() => onEditItem(item)}
                  />
                )}
                {onDeleteItem && (
                  <Button
                    icon="pi pi-trash"
                    rounded
                    raised
                    severity="danger"
                    onClick={() => onDeleteItem(item)}
                  />
                )}
              </div>
            )}
          ></Column>
        )}
      </DataTable>
    </div>
  );
}
