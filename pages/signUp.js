import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { IoAccessibilityOutline } from "react-icons/io5";
import Layout from "@/components/Layout";
import { React, useState, useEffect } from "react";
import { UserAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  arrayUnion,
} from "firebase/firestore";

import { AiOutlineClose } from "react-icons/ai";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { signUp, user } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Sign up the user
      await signUp(email, password);

      // Update the user's name in Firestore
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        name: name,
      });

      // Redirect the user to the account page
      router.push("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <Layout>
      <div className="flex h-screen items-center bg-gray-100">
        <div className="max-w-[400px] mx-2 md:mx-auto min-h-[600px] bg-white px-4 py-20 w-full h-96 border-2 rounded-xl">
          <h1 className="text-2xl font-bold">Kayıt Ol</h1>
          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <label className="font-semibold text-xl">İsim</label>
              <div className="my-2 w-full relative">
                <input
                  className="w-full p-2 border rounded-sm"
                  type="name"
                  placeholder="İsim Soyisim"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <IoAccessibilityOutline className="absolute right-2 top-2 w-6 h-6" />
              </div>
            </div>
            <div className="my-4">
              <label className="font-semibold text-xl">E-Mail</label>
              <div className="my-2 w-full relative">
                <input
                  className="w-full p-2 border rounded-sm"
                  type="email"
                  placeholder="mail@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <AiOutlineMail className="absolute right-2 top-2 w-6 h-6" />
              </div>
            </div>
            <div className="my-4">
              <label className="font-semibold text-xl">Şifre</label>
              <div className="my-2 w-full relative">
                <input
                  className="w-full p-2 border rounded-sm"
                  type="password"
                  placeholder="*******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <AiFillLock className="absolute right-2 top-2 w-6 h-6" />
              </div>
            </div>
            <div>
              <button className="w-full my-2 p-3 bg-amber-300 rounded-sm text-xl font-bold">
                Kaydol
              </button>
            </div>
          </form>
          <p>
            Zaten Üye Misin?{" "}
            <Link href="/signIn" className="text-orange-600">
              Giriş Yap
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SignUpPage;
