/* eslint-disable @next/next/no-img-element */

import React from "react";
import Link from "next/link";
import { Page } from "../../types/types";

const NotFoundPage: Page = () => {
  return (
    <div className="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
      <div className="flex flex-column align-items-center justify-content-center">
        <img
          src="/demo/images/notfound/logo-blue.svg"
          alt="Sakai logo"
          className="mb-5 w-6rem flex-shrink-0"
        />
        <div
          style={{
            borderRadius: "56px",
            padding: "0.3rem",
            background:
              "linear-gradient(180deg, rgba(33, 150, 243, 0.4) 10%, rgba(33, 150, 243, 0) 30%)",
          }}
        >
          <div
            className="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center"
            style={{ borderRadius: "53px" }}
          >
            <span className="text-blue-500 font-bold text-3xl">404</span>
            <h1 className="text-900 font-bold text-5xl mb-2">
              Página não encontrada
            </h1>
            <Link href="/">
              <div className="text-600 mb-5 underline">
                Voltar para a página inicial
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

NotFoundPage.getLayout = function getLayout(page) {
  return <React.Fragment>{page}</React.Fragment>;
};

export default NotFoundPage;
