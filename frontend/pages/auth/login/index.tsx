/* eslint-disable @next/next/no-img-element */

import { useRouter } from 'next/router';
import React, { useContext, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Page } from ',,/../../types/types';
import { Toast } from 'primereact/toast';

import { useFormik, FormikValues } from 'formik';
import * as Yup from "yup";
import { SIGN_IN_MUTATION } from '../../api/graphQL/mutations/auth';
import { ApolloProvider, useMutation } from '@apollo/client';
import { CREATE_PRODUCT_MUTATION } from '../../api/graphQL/mutations/products';
import client from '../../api/apolloClient';
import { setAuthenticationCookie } from '../../../utils/auth';
import Link from 'next/link';

const LoginPage: Page = () => {
	const toastRef = useRef<Toast>(null);
	const { layoutConfig } = useContext(LayoutContext);
	const router = useRouter();
	const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

	const [signing, setSigning] = useState<boolean>(false)
	const [signIn] = useMutation(SIGN_IN_MUTATION);

	const handleSubmit = async (values: FormikValues) => {
		const { email, password } = values;

		try {
			setSigning(true);
			const response = await signIn({
				variables: {
					signIn: {
						email,
						password
					}
				}
			});

			setAuthenticationCookie(response?.data?.signIn?.token);

			router.push('/');
		} catch (error: any) {
			toastRef.current?.show({
				severity: "warn",
				summary: "Atenção!",
				detail: error?.message ?? "Ocorreu algum erro",
				life: 2000,
			});
			setSigning(false);
		};
	};

	const formSchema = Yup.object().shape({
		email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório.").nullable(),
		password: Yup.string().required("Senha é obrigatório.").nullable(),
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			password: ""
		},
		validationSchema: formSchema,
		onSubmit: handleSubmit
	});

	return (
		<div className={containerClassName}>
			<div className="flex flex-column align-items-center justify-content-center">
				<img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
				<div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
					<div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
						<div className="text-center mb-5">
							<div className="text-900 text-3xl font-medium mb-3">Bem vindo ao atualiza estoque!</div>
							<span className="text-600 font-medium">Faça login para continuar</span>
						</div>

						<form onSubmit={formik.handleSubmit}>
							<label htmlFor="email" className="block text-900 text-xl font-medium mb-2">
								E-mail
							</label>
							<div className='mb-5'>
								<InputText
									id="email"
									type="text"
									placeholder="Endereço de e-mail"
									className={`w-full ${formik.errors.email && "p-invalid"}`}
									style={{ padding: '1rem' }}
									value={formik.values.email}
									onChange={formik.handleChange}
								/>
								{formik.errors.email && <small className="p-error text-lg">{formik.errors.email}</small>}
							</div>
							<label htmlFor="password" className="block text-900 font-medium text-xl mb-2">
								Senha
							</label>
							<div className='mb-5'>
								<Password
									inputId="in_password"
									name="password"
									value={formik.values.password}
									onChange={(e) => formik.setFieldValue('password', e.target.value)}
									placeholder="Digite sua senha"
									toggleMask
									className={`w-full ${formik.errors.password && "p-invalid"}`}
									inputClassName="w-full p-3"
								/>
								{formik.errors.password && <small className="p-error text-lg">{formik.errors.password}</small>}

							</div>

							<Button label="ENTRAR" type="submit" disabled={signing} className="w-full p-3 text-xl">
								{signing && <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>}
							</Button>
							<div className='flex justify-content-center mt-3'>
								<Button disabled={signing} text onClick={() => router.push("/auth/register")} className="font-medium no-underline text-blue-500 text-center cursor-pointer">Registrar</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<Toast ref={toastRef} position="top-right" />
		</div>
	);
};

LoginPage.getLayout = function getLayout(page) {
	return (
		<ApolloProvider client={client}>
			<React.Fragment>
				{page}
			</React.Fragment>
		</ApolloProvider>
	);
};
export default LoginPage;