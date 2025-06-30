import { AccessCredentialsStorage, AccessCredentialsType } from "@/utils/access-credentials-storage";
import { FloatDiv } from "@/components/atoms/floating-div/floating-div";
import { ValidationEnum } from "@/components/cells/form/validate-value";
import { FieldSizeEnum, Form } from "@/components/cells/form/form";
import { useRequestSender } from "@/hooks/use-request-sender";
import { IconEnum } from "@/enums/icon-enum";
import { useNavigate } from "react-router";
import { Env } from "@/config/env";

export default function LoginPage() {
  const navigate = useNavigate();
  const { post } = useRequestSender();
  const { API_URL } = Env;

  return (
    <FloatDiv>
      <Form
        title="Área do Administrador"
        onSubmit={async (data: any) => {
          await post(
            `${API_URL}/auth/login`,
            {
              email: data.email.trim(),
              password: data.password.trim(),
            },
            {}
          ).then((data: AccessCredentialsType) => {
            if (data && 'token' in data) {
              AccessCredentialsStorage.set({
                token: data.token,
              });
              navigate("/session/general-dashboard");
            }
          });
        }}
        inputs={[
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Digite seu email",
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
            size: FieldSizeEnum.full,
            value: "",
          },
          {
            name: "password",
            label: "Senha",
            type: "password",
            placeholder: "Digite sua senha",
            validators: [
              {
                type: ValidationEnum.required,
                message: "O campo senha é obrigatório",
              },
              {
                type: ValidationEnum.minLength5,
                message: "O campo senha deve ter no mínimo 5 caracteres",
              },
            ],
            size: FieldSizeEnum.full,
            value: "",
          },
        ]}
        anchors={[]}
        buttons={[
          {
            text: "Acessar",
            type: "submit",
            color: "primary",
            icon: IconEnum.send,
          },
        ]}
      />
    </FloatDiv>
  );
}
