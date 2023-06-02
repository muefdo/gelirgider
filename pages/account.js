import Layout from "@/components/Layout";
import { React, useState, useEffect } from "react";
import { UserAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { db } from "@/firebase";
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  arrayUnion,
} from "firebase/firestore";

import { AiOutlineClose } from "react-icons/ai";
import Capital from "@/components/Capital";

const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useRouter();

  const [data, setData] = useState({});
  const { number, name } = data;
  const [dataIncome, setDataIncome] = useState([]);
  const [dataExpense, setDataExpense] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  const handleSignOut = async () => {
    try {
      await logout();
      navigate.push("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  const calculateTotalExpense = (array) => {
    if (array && array.length > 0) {
      const sum = array.reduce(
        (accumulator, currentValue) => accumulator + currentValue.number,
        0
      );
      setTotalExpense(sum);
    }
  };
  const calculateTotalIncome = (array) => {
    if (array && array.length > 0) {
      const sum = array.reduce(
        (accumulator, currentValue) => accumulator + currentValue.number,
        0
      );
      setTotalIncome(sum);
    }
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setDataIncome(doc.data()?.income);
      calculateTotalIncome(doc.data()?.income);
      calculateTotalExpense(doc.data()?.expense);
      setDataExpense(doc.data()?.expense);
    });
  }, [user?.email]);

  if (user) {
    return (
      <Layout>
        <div className="max-w-[1140px] mx-auto">
          <div className="flex justify-between items-center my-12 py-8 rounded-xl w-[95%] mx-2 border-b shadow-lg px-5 ">
            <div>
              <h1 className="text-2xl font-bold">Account Page</h1>
              <div>
                <p>Hoşgeldin, {user?.email}</p>
              </div>
            </div>
            <div>
              <button
                onClick={handleSignOut}
                className="border px-6 py-2 rounded-2xl hover:text-white hover:bg-red-400 duration-200 font-semibold"
              >
                Çıkış Yap
              </button>
            </div>
          </div>

          <div className="flex items-center my-12 py-8 rounded-md mx-3">
            <div className="w-full min-h-[300px] ">
              <h1 className="text-2xl font-bold py-4 border-b">Toplam Param</h1>
             {/*<Capital /> */}
              <table className="w-full text-center ">
                <thead>
                  <tr className="border-b flex justify-between mx-4">
                    <th className="font-semibold">Toplam Gelir</th>
                    <th className="px-4 font-semibold">Toplam Gider</th>
                    <th className="font-semibold">Kalan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="flex justify-between mx-4">
                    <td className="text-green-500">
                      +{totalIncome.toLocaleString()}TL
                    </td>
                    <td className="text-red-500">
                      -{totalExpense.toLocaleString()}TL
                    </td>
                    {totalIncome - totalExpense > 0 ? (
                      <td className="text-green-500">
                        +{(totalIncome - totalExpense).toLocaleString()}
                      </td>
                    ) : (
                      <td className="text-red-500">
                        {(totalIncome - totalExpense).toLocaleString()}
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    );
  } else {
    navigate.push("/signIn");
    return null; // or show a loading indicator
  }
};

export default Account;
