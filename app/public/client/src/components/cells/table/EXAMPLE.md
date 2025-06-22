```tsx
import { InputText } from "primereact/inputtext";
import Table from "./components/cells/table/table";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

export const App = () => {
  return (
    <>
      <Table
        title="Products"
        items={[
          {
            name: "Bamboo Watch",
            image: "bamboo-watch.jpg",
          },
        ]}
        columns={[
          {
            name: "Name",
            field: "name",
          },
          {
            name: "Image",
            field: "image",
            template: (product) => (
              <img
                src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
                alt={product.image}
                className="w-6rem shadow-2 border-round"
              />
            ),
          },
        ]}
        filters={
          <div>
            <IconField iconPosition="left">
              <InputIcon className="pi pi-search"> </InputIcon>
              <InputText placeholder="Buscar" />
            </IconField>
          </div>
        }
        onAddNewItem={() => {
          alert("add");
        }}
        onEditItem={() => {
          alert("edit");
        }}
        onDeleteItem={() => {
          alert("delete");
        }}
        onNextPage={() => {
          alert("next");
        }}
        onPreviousPage={() => {
          alert("previous");
        }}
        showPagination={true}
        showLastPageButton={true}
      />
    </>
  );
};

```