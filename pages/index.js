import Layout from "@/components/Layout";
import React, { useEffect } from "react";
import wave from "../public/waves.svg";
import Image from "next/image";
import { UserAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";

const Index = () => {
  const router = useRouter();
  const { user } = UserAuth();

  if (!user) {
    return (
      <div>
        <Layout>
          <div className="items-center flex justify-center h-screen">
            <p className="font-semibold text-xl">
              Hemen üye olun ve Gelir ve giderlerinizi kolayca takip edin
            </p>
          </div>
        </Layout>
      </div>
    );
  } else {
    return (
      <Layout>
        <div className="max-w-[1140px] mx-auto mb-8 h-screen">
          <div className="flex justify-start  my-12 py-8 rounded-xl w-[95%] mx-2 border-b shadow-lg px-5">
            <p className="font-semibold text-xl">
              Üye Oldunuz Şimdi Gelir Gider Ekleyebilirsiniz.
            </p>
          </div>
          <div className="items-center flex pb-10 justify-between w-[95%] mx-2 flex-col md:flex-row">
            <Link
              href="/account"
              className="bg-red-500 w-[95%] md:w-[20%] py-5 md:px-10  rounded-lg text-white hover:text-2xl text-xl font-bold ease-in-out duration-300 shadow-xl mb-4 md:mb-0 flex justify-center"
            >
              <button>Hesabım</button>
            </Link>
            <Link
              href="/managment"
              className="bg-blue-500 w-[95%] md:w-[20%] py-5 md:px-10  rounded-lg text-white hover:text-2xl text-xl font-bold ease-in-out duration-300 shadow-xl mb-4 md:mb-0 flex justify-center"
            >
              <button>Hesapla</button>
            </Link>
            <Link href="/account"  className="bg-orange-500 w-[95%] md:w-[20%] py-5 md:px-10  rounded-lg text-white hover:text-2xl text-xl font-bold ease-in-out duration-300 shadow-xl mb-4 md:mb-0 flex justify-center">
              <button >
                Toplam
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
};

export default Index;
