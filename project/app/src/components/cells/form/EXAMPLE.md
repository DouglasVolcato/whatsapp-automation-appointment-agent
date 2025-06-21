``` tsx
import { ValidationEnum } from "./components/cells/form/validate-value";
import { Form, FieldSizeEnum } from "./components/cells/form/form";
import { IconEnum } from "./enums/icon-enum";

export const App = () => {
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  return (
    <>
      <div style={{ margin: "auto", width: "100%" }}>
        <Form
          title="Formulário"
          inputs={[
            {
              label: "Nome",
              validators: [
                {
                  type: ValidationEnum.required,
                  message: "O campo nome é obrigatório",
                },
                {
                  type: ValidationEnum.minLength5,
                  message: "O campo nome deve ter no mínimo 5 caracteres",
                },
              ],
              name: "name",
              type: "text",
              size: FieldSizeEnum.small,
              value: "Douglas",
              placeholder: "Digite seu nome",
            },
            {
              label: "Email",
              validators: [
                {
                  type: ValidationEnum.required,
                  message: "O campo email é obrigatório",
                },
                {
                  type: ValidationEnum.email,
                  message: "O campo email é inválido",
                },
              ],
              name: "email",
              type: "email",
              size: FieldSizeEnum.medium,
              value: "",
              placeholder: "Digite seu email",
            },
            {
              label: "Senha",
              validators: [
                {
                  type: ValidationEnum.required,
                  message: "O campo senha é obrigatório",
                },
              ],
              name: "password",
              type: "password",
              size: FieldSizeEnum.small,
              value: "",
              placeholder: "Digite sua senha",
            },
            {
              label: "Celular",
              validators: [
                {
                  type: ValidationEnum.required,
                  message: "O campo celular é obrigatório",
                },
                {
                  type: ValidationEnum.number,
                  message: "O campo celular é inválido",
                },
              ],
              name: "phone",
              type: "number",
              size: FieldSizeEnum.small,
              value: "234234",
              placeholder: "Digite seu celular",
            },
            {
              label: "Arquivo",
              validators: [
                {
                  type: ValidationEnum.required,
                  message: "O campo arquivo é obrigatório",
                },
              ],
              name: "file",
              type: "file",
              size: FieldSizeEnum.small,
              value: "",
              placeholder: "Clique para escolher um arquivo",
            },
            {
              label: "Aceito os termos de uso",
              validators: [
                {
                  type: ValidationEnum.required,
                  message: "O campo aceito os termos de uso é obrigatório",
                },
              ],
              name: "terms",
              type: "checkbox",
              size: FieldSizeEnum.small,
              value: "true",
              placeholder: "Marque uma opção",
            },
            {
              label: "Lista",
              validators: [
                {
                  type: ValidationEnum.required,
                  message: "O campo lista é obrigatório",
                },
              ],
              name: "list",
              type: "radio",
              size: FieldSizeEnum.small,
              value: "2",
              placeholder: "Marque uma opção",
              options: [
                {
                  label: "Opção 1",
                  value: "1",
                },
                {
                  label: "Opção 2",
                  value: "2",
                },
                {
                  label: "Opção 3",
                  value: "3",
                },
              ],
            },
            {
              label: "Seleção",
              validators: [
                {
                  type: ValidationEnum.required,
                  message: "O campo seleção é obrigatório",
                },
              ],
              name: "select",
              type: "select",
              size: FieldSizeEnum.small,
              value: "2",
              onFilter: console.log,
              placeholder: "Selecione uma opção",
              options: [
                {
                  label: "Opção 1",
                  value: "1",
                },
                {
                  label: "Opção 2",
                  value: "2",
                },
                {
                  label: "Opção 3",
                  value: "3",
                },
              ],
            },
            {
              label: "Multi Seleção",
              validators: [],
              name: "multiselect",
              type: "multiselect",
              size: FieldSizeEnum.small,
              value: ["1", "4"],
              onFilter: console.log,
              placeholder: "Selecione uma opção",
              options: [
                {
                  label: "Opção 1",
                  value: "1",
                },
                {
                  label: "Opção 2",
                  value: "2",
                },
                {
                  label: "Opção 3",
                  value: "3",
                },
                {
                  label: "Opção 4",
                  value: "4",
                },
                {
                  label: "Opção 5",
                  value: "5",
                },
              ],
            },
            {
              label: "Data",
              validators: [
                {
                  type: ValidationEnum.required,
                  message: "O campo data é obrigatório",
                },
              ],
              name: "date",
              type: "date",
              size: FieldSizeEnum.small,
              value: new Date(),
              placeholder: "Selecione uma data",
            },
            {
              label: "Texto",
              validators: [
                {
                  type: ValidationEnum.required,
                  message: "O campo texto é obrigatório",
                },
                {
                  type: ValidationEnum.maxLength100,
                  message: "O campo texto deve ter no máximo 100 caracteres",
                },
              ],
              name: "textarea",
              type: "textarea",
              size: FieldSizeEnum.full,
              value: "Esse é um textarea",
              placeholder: "Digite seu texto",
            },
          ]}
          anchors={[
            {
              text: "Voltar",
              href: "/",
            },
          ]}
          buttons={[
            {
              text: "Enviar",
              type: "submit",
              color: "primary",
              icon: IconEnum.send,
            },
            {
              text: "Teste",
              type: "button",
              color: "danger",
            },
          ]}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
};

```