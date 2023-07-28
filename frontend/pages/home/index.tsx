/* eslint-disable @next/next/no-img-element */

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Demo } from '../../types/types';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PRODUCT_MUTATION, REMOVE_PRODUCT_MUTATION, UPDATE_PRODUCT_MUTATION } from '../api/graphQL/mutations/products';
import { GET_PRODUCTS_QUERY } from '../api/graphQL/querys';
import { Modal } from '../../components/Modal';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from "yup";
import { checkAuthentication } from '../../utils/auth';
import { NextPage } from 'next';


interface HomeProps {
  isAuthenticated?: boolean;
}
const HomePage: NextPage<HomeProps> = (props) => {


  const route = useRouter();
  useEffect(() => {
    const isAuthenticated = checkAuthentication();
    if (!isAuthenticated) {

      route.push("/auth/login")
      // window.location.href = '/auth/login';

    }
  }, []);

  const toastRef = useRef<Toast>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS_QUERY);

  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION);
  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION);
  const [removeProduct] = useMutation(REMOVE_PRODUCT_MUTATION);

  if (error) {
    toastRef?.current?.show({
      severity: "error",
      summary: "Erro!",
      detail: error?.message ?? "Ocorreu algum erro",
      life: 2000,
    });
  }

  const handleSubmit = async (values: any) => {
    const { id, description, stock } = values;
    try {
      let msg: string = '';

      if (!!id) {
        await updateProduct({
          variables: {
            input: {
              id,
              description: description,
              stock: parseInt(stock),
            },
          },
        });

        msg = "Produto alterado com sucesso!";
      } else {
        await createProduct({
          variables: {
            input: {
              description: description,
              stock: parseInt(stock),
            },
          },
        });

        msg = "Produto cadastrado com sucesso!";
      }

      toastRef?.current?.show({
        severity: "success",
        summary: "Sucesso!",
        detail: msg,
        life: 2000,
      });

      refetch();
      handleCloseModal();
    } catch (error: any) {

      toastRef?.current?.show({
        severity: error?.message ? "warn" : "error",
        summary: "Erro!",
        detail: error?.message ?? "Ocorreu um erro",
        life: 2000,
      });

    };
  };

  const handleDelete = async (id: number) => {
    try {
      await removeProduct({
        variables: { id },
      });

      toastRef?.current?.show({
        severity: "success",
        summary: "Sucesso!",
        detail: "Produto deletado com sucesso!",
        life: 2000,
      });

      refetch();
    } catch (error: any) {
      console.error(error);
      toastRef?.current?.show({
        severity: error?.message ? "warn" : "error",
        summary: "Erro!",
        detail: error?.message ?? "Ocorreu um erro ao deletar o produto.",
        life: 2000,
      });
    }
  };

  const formSchema = Yup.object().shape({
    description: Yup.string().required("Descrição é obrigatório.").nullable(),
    stock: Yup.number().required("Quantidade é obrigatório.").nullable(),
  });

  const formik = useFormik({
    initialValues: {
      description: "",
      stock: 0
    },
    onSubmit: handleSubmit,
    validationSchema: formSchema
  });

  const handleCloseModal = () => {
    setModalVisible(false);
    formik?.resetForm();
  };

  const openModal = (values?: any) => {
    if (values) {

      formik.setValues(values)
    }
    setModalVisible(true);
  }

  const footerContent = (
    <div className="footer">
      <Button label='Cancelar' type="button" onClick={handleCloseModal} severity="danger" text />
      <Button label='Salvar' type="submit" onClick={formik.handleSubmit as any} severity="info" />
    </div>
  );

  const getTotalStock = () => {
    let quantity: number = 0;

    if (data?.products.length > 0) {
      data?.products?.forEach((v: any) => {
        quantity += v?.stock
      })
    }

    return quantity;
  }

  return (
    <div className="grid">
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Total de produtos</span>
              <div className="text-900 font-medium text-xl">{data?.products?.length}</div>
            </div>
            <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
              <i className="pi pi-shopping-cart text-blue-500 text-xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Total estoque</span>
              <div className="text-900 font-medium text-xl">{getTotalStock()}</div>
            </div>
            <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
              <i className="pi pi-box text-green-500 text-xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 xl:col-12">
        <div className="card">
          <h5>Produtos</h5>
          <div className='my-5'>
            <Button severity="success" icon="pi pi-plus" label="Novo" onClick={openModal} />
          </div>
          <DataTable value={data?.products} rows={5} paginator responsiveLayout="scroll">
            <Column field="id" header="Código" sortable />
            <Column field="description" header="Descrição" sortable style={{ width: '35%' }} />
            <Column field="stock" header="Estoque" sortable style={{ width: '35%' }} />
            <Column
              header="View"
              style={{ width: '15%' }}
              body={(rowData) => (
                <>
                  <Button icon="pi pi-pencil" onClick={() => openModal(rowData)} severity="warning" text />
                  <Button icon="pi pi-trash" onClick={() => handleDelete(rowData.id)} severity="danger" text />
                </>
              )}
            />
          </DataTable>
        </div>
        <Modal
          visible={modalVisible}
          style={{ width: '50vw' }}
          header="Novo produto"
          onHide={handleCloseModal}
          footer={footerContent}
        >
          <form className="my-5" onSubmit={formik.handleSubmit}>
            <div className='flex flex-column field col-12'>
              <InputText
                id="description"
                className={`${formik?.errors?.description && "p-invalid"}`}
                placeholder="Descrição"
                value={formik?.values?.description}
                onChange={formik.handleChange}
              />
              {formik?.errors?.description && <small className="p-error">{formik?.errors?.description}</small>}
            </div>
            <div className='flex flex-column field col-3'>
              <InputText
                id="stock"
                type="number"
                className={`${formik?.errors?.stock && "p-invalid"}`}
                placeholder="Quantidade"
                value={formik?.values?.stock?.toString()}
                onChange={formik.handleChange}
              />
              {formik?.errors?.stock && <small className="p-error">{formik?.errors?.stock}</small>}
            </div>
          </form>
        </Modal>
      </div>
      <Toast ref={toastRef} position="top-right" />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const isAuthenticated = checkAuthentication();

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      isAuthenticated,
    },
  };
}

export default HomePage;
