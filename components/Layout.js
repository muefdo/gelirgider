import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

import finance from "../public/finance.png";
import Image from "next/image";

const Layout = ({ children, title = "Crypto Tracker" }) => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  const { user, logout } = UserAuth();
  const navigate = useRouter();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate.push("/");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div >
      <Head>
        <title>Gelir Gider Online</title>
        <meta
          name="description"
          content="Online olarak gelir giderini takip et hesabında açık kalmasın her cihazda kontrol et harcamalarıı düzenle"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>
      <header className="text-center h-full text-black overflow-hidden border-b">
        <div className="  flex items-center justify-between h-20 font-bold over">
          <Link href="/" passHref legacyBehavior>
            <a className="md:pl-11 pl-2 flex justify-center items-center bg-gradient-to-r text-transparent bg-clip-text from-black to-red-500">
              <Image
                src={finance}
                alt="finance"
                className="h-12 w-14 hidden md:block mr-6"
              />
              Gelir Gider Online
            </a>
          </Link>

          <div>
            <Link href="/account" passHref legacyBehavior>
              <a className="p-4 mr-6 hover:text-slate-500 hidden md:block  ">
                Gelir ve Giderlerini Yaz Kolayca Hesapla.
              </a>
            </Link>
          </div>
          
          {user?.email ? (
            <div className="flex">
              <Link href="/managment" passHref legacyBehavior>
                <a className="p-4 mr-3 hover:text-slate-500 hidden md:block hover:text-xl hover:shadow-2xl ease-out duration-300">
                  Hesapla
                </a>
                
              </Link>
              
              <Link href="/account" passHref legacyBehavior>
                <a className="p-4 mr-6 px-8 text-white bg-red-500 rounded-md hover:text-xl hover:shadow-2xl ease-out duration-300 hidden md:block">
                  Hesabım
                </a>
              </Link>
             
            </div>
          ) : (
            <div className="hidden md:block pr-7">
              <Link href="/signIn" passHref legacyBehavior>
                <a className="p-4 hover:text-slate-500 ">Giriş Yap</a>
              </Link>
              <Link href="/signUp" passHref legacyBehavior>
                <a className="bg-red-400 rounded-2xl text-white shadow-xl hover:shadow-2xl ml-2 py-4 px-6 hover:px-9 hover:py-6 ease-in duration-150">
                  Üye Ol
                </a>
              </Link>
            </div>
          )}
          <div
            onClick={handleNav}
            className="block md:hidden cursor-pointer z-10 mr-4 duration-100"
          >
            {nav ? <></> : <AiOutlineMenu size={20} />}
          </div>

          {/*mobile menu */}
          <div
            className={
              nav
                ? "md:hidden fixed left-0 top-0 flex flex-col justify-between w-full bg-slate-50 h-[100%] ease-in duration-100 z-50 overflow-hidden"
                : "fixed left-[-100%] h-[100%] flex flex-col items-center justify-between ease-in duration-100"
            }
          >
            <ul>
              <div
                onClick={handleNav}
                className=" md:hidden cursor-pointer py-6 flex justify-end mr-2"
              >
                {nav ? (
                  <>
                    Kapat
                    <AiOutlineClose size={25} />
                  </>
                ) : (
                  <></>
                )}
              </div>
              <Link href="/">
                <li onClick={handleNav} className="border-b py-6 flex text-white px-4 bg-blue-400 m-3 rounded">
                  Anasayfa
                </li>
              </Link>
              <Link href="/account">
                <li onClick={handleNav} className="border-b py-6 flex text-white px-4 bg-red-400 m-3 rounded">
                  Hesabım
                </li>
              </Link>
              <Link href="/managment">
                <li onClick={handleNav} className="border-b py-6 flex text-white px-4 bg-orange-400 m-3 rounded">
                  Hesapla
                </li>
              </Link>
              
              
            </ul>
            {user?.email ? (
              <div className="font-thin mb-2">
                Developed by <a href="https://bradi.tech/">bradi.tech</a>
              </div>
            ) : (
              <div className="flex flex-col mb-10">
                <ul>
                  <li>
                    <Link href="/signIn">
                      {" "}
                      <button
                        onClick={handleNav}
                        className="w-[95%] my-2 p-3 bg-red-400 rounded-md shadow-xl text-zinc-50 "
                      >
                        Giriş Yap
                      </button>{" "}
                    </Link>
                  </li>

                  <li>
                    <Link href="/signUp">
                      <button
                        onClick={handleNav}
                        className="w-[95%] p-3 bg-slate-300 rounded-md shadow-xl "
                      >
                        Üye Ol
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="h-full z-20">{children}</main>
      <footer class="text-gray-200 border-t-2">
        <div class="container px-5 py-20  mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col ">
          <Image
            src={finance}
            alt="finance"
            className="h-[10%] w-[10%] mr-6 md:block hidden"
          />
          <div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left mt-4 ">
            <a class=" flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <span class="text-xl">Gelir Gider Online</span>
            </a>
            <p class="mt-2 text-sm text-gray-500">
              Online olarak internete bağlı her cihazınızda bütçenizi takip
              edin.
            </p>
          </div>
          <div class="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">
            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>
              <nav class="list-none mb-10">
                <li>
                  <a class="text-gray-600 hover:text-gray-800">First Link</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Second Link</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Third Link</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
                </li>
              </nav>
            </div>
            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>
              <nav class="list-none mb-10">
                <li>
                  <a class="text-gray-600 hover:text-gray-800">First Link</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Second Link</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Third Link</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
                </li>
              </nav>
            </div>
            {/**
            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>
              <nav class="list-none mb-10">
                <li>
                  <a class="text-gray-600 hover:text-gray-800">First Link</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Second Link</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Third Link</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
                </li>
              </nav>
            </div>
             */}
            {/**
             <div class="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>
              <nav class="list-none mb-10">
                <li>
                  <a class="text-gray-600 hover:text-gray-800">First Link</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Second Link</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Third Link</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
                </li>
              </nav>
            </div> 
            */}
          </div>
        </div>
        <div class="bg-gray-100">
          <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p class="text-gray-500 text-sm text-center sm:text-left">
              © 2023 Tüm Hakları Saklıdır. —
              <a
                href="https://bradi.tech/"
                rel="noopener noreferrer"
                class="text-gray-600 ml-1"
                target="_blank"
              >
                bradi.tech
              </a>
            </p>
            <span class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <a class="text-gray-700 hover:text-gray-400" href="">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a class="ml-3 text-gray-700 hover:text-gray-400" href="">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a class="ml-3 text-gray-700 hover:text-gray-400" href="">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a class="ml-3 text-gray-700 hover:text-gray-400" href="">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                  ></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
