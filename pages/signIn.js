import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from "@/components/Layout";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import Link from "next/link";
import { UserAuth, signIn } from "../context/AuthContext";
import { useState } from "react";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn, user } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to account page if user is already signed in
    if (user) {
      router.push('/account');
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signIn(email, password);
      router.push("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <Layout>
      <div className="flex h-screen items-center bg-gray-100">
        <div className="max-w-[400px] md:mx-auto mx-2 min-h-[600px] bg-white px-4 py-20 w-full h-96 border-2 rounded-xl">
          <h1 className="text-2xl font-bold">Giriş Yap</h1>
          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <label className="font-semibold text-xl">E-Mail</label>
              <div className="my-2 w-full relative">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded-sm"
                  type="email"
                  placeholder="mail@gmail.com"
                />
                <AiOutlineMail className="absolute right-2 top-2 w-6 h-6" />
              </div>
            </div>
            <div className="my-4">
              <label className="font-semibold text-xl">Şifre</label>
              <div className="my-2 w-full relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded-sm"
                  type="password"
                  placeholder="***********"
                />
                <AiFillLock className="absolute right-2 top-2 w-6 h-6" />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full my-2 p-3 bg-amber-300 rounded-sm text-xl font-bold"
              >
                Giriş Yap
              </button>
            </div>
          </form>
          <p>
            Hesabın yok mu{" "}
            <Link href="/signUp" className="text-orange-600">
              Kaydol.
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SignInPage;
