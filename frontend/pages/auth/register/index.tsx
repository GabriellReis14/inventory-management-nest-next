import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Page } from "../../../types/layout";
import { ApolloProvider, useMutation } from "@apollo/client";
import client from "../../api/apolloClient";
import * as Yup from "yup";
import { FormikValues, useFormik } from "formik";
import { classNames } from "primereact/utils";
import { CREATE_USERS_MUTATION } from "../../api/graphQL/mutations/users";
import { Toast } from "primereact/toast";
import { useRouter } from "next/router";

const Register: Page = () => {
  const toastRef = useRef<Toast>(null);
  const [createUser] = useMutation(CREATE_USERS_MUTATION);
  const [registering, setRegistering] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (values: FormikValues) => {
    const { email, password, isAdmin } = values;
    try {
      setRegistering(true);
      await createUser({
        variables: {
          input: {
            email,
            password,
            isAdmin,
          },
        },
      });

      toastRef?.current?.show({
        severity: "success",
        summary: "Sucesso!",
        detail: "Usuário cadastrado com sucesso!",
        life: 2000,
      });

      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (error: any) {
      toastRef?.current?.show({
        severity: "error",
        summary: "Erro!",
        detail: `Ocorreu um erro! \n ${error?.message}`,
        life: 2000,
      });
      setRegistering(false);
    }
  };

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email("E-mail inválido")
      .required("E-mail é obrigatório.")
      .nullable(),
    password: Yup.string().required("Senha é obrigatório.").nullable(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      isAdmin: false,
    },
    onSubmit: handleSubmit,
    validationSchema: formSchema,
  });

  return (
    <div className="flex align-items-center h-screen justify-content-center">
      <div className="surface-card p-4 shadow-2 border-round w-full lg:w-4">
        <div className="text-center mb-5">
          <div className="text-900 text-3xl font-medium mb-3">
            Seja bem-vindo!
          </div>
          <span className="text-600 font-medium line-height-3">
            Registre sua conta para continuar!
          </span>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email" className="block text-900 font-medium my-2">
            E-mail
          </label>
          <InputText
            id="email"
            type="text"
            placeholder="E-mail"
            className={classNames("w-full", {
              "p-invalid": formik?.errors?.email,
            })}
            value={formik?.values?.email}
            onChange={formik.handleChange}
          />
          {formik?.errors?.email && (
            <small className="p-error">{formik?.errors?.email}</small>
          )}

          <label htmlFor="password" className="block text-900 font-medium my-2">
            Senha
          </label>
          <InputText
            id="password"
            type="password"
            placeholder="Senha"
            className={classNames("w-full", {
              "p-invalid": formik?.errors?.password,
            })}
            value={formik?.values?.password}
            onChange={formik.handleChange}
          />
          {formik?.errors?.password && (
            <small className="p-error">{formik?.errors?.password}</small>
          )}

          <div className="flex align-items-center justify-content-between mt-3 mb-6">
            <div className="flex align-items-center">
              <Checkbox
                id="isAdmin"
                onChange={formik.handleChange}
                checked={formik?.values?.isAdmin}
                className="mr-2"
              />
              <label htmlFor="isAdmin" className="text-900">
                É administrador?
              </label>
            </div>
          </div>

          <Button
            type="submit"
            disabled={registering}
            label="CADASTRAR"
            icon="pi pi-user"
            className="w-full"
          >
            {registering && (
              <i
                className="pi pi-spin pi-spinner"
                style={{ fontSize: "2rem" }}
              ></i>
            )}
          </Button>
        </form>
      </div>
      <Toast ref={toastRef} position="top-right" />
    </div>
  );
};

Register.getLayout = function getLayout(page) {
  return (
    <ApolloProvider client={client}>
      <React.Fragment>{page}</React.Fragment>
    </ApolloProvider>
  );
};

export default Register;
