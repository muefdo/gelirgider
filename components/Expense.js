import { UserAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import {
    doc,
    onSnapshot,
    updateDoc,
    setDoc,
    arrayUnion,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import { AiOutlineClose } from "react-icons/ai";

const Expense = () => {

    const { user } = UserAuth();
    const navigate = useRouter();
    const Path = doc(db, "users", `${user?.email}`);
    const [data, setData] = useState({});
    const [savedStatus, setSavedStatus] = useState(null);
    const { number, name, installments } = data;
    const [dataMan, setDataMan] = useState([]);
    const [total , setTotal] = useState(0);


    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setData({ ...data, [id]: value });
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        if (number && name) {
            const parsedNumber = parseInt(number, 10);
            const parsedInstallments = parseInt(installments, 10);
            if (!isNaN(parsedNumber)) {
                try {
                    await updateDoc(Path, {
                        expense: arrayUnion({
                            number: parsedNumber,
                            name: name,
                            installments: parsedInstallments,
                        }),
                    });

                    setData({ number: "", name: "", installments: "" }); // Reset input values to empty strings
                    setSavedStatus(true);
                } catch (error) {
                    setSavedStatus(false);
                    console.error(error);
                }
            }
        }
    };

    const calculateTotal = (array) => {
        if (array && array.length > 0) {
          const sum = array.reduce(
            (accumulator, currentValue) => accumulator + currentValue.number,
            0
          );
          setTotal(sum);
        }
      };
      

    useEffect(() => {
        onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
            setDataMan(doc.data()?.expense);
            calculateTotal(doc.data()?.expense);
        });
    }, [user?.email]);

    const deleteExpense = async (passedId) => {
        try {
            const result = dataMan.filter((item, index) => index !== passedId); // Use the index to filter out the item
            await updateDoc(Path, {
                expense: result,
            });
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div>
            <div className="h-full items-center flex justify-center flex-col overflow-x-hidden mt-10">
                <div className="items-center flex justify-center flex-col columns-1">
                    <h1 className="font-bold text-2xl">Gider Ekle</h1>
                    <div className="mt-2">
                        <form onSubmit={handleAdd}>
                            <input
                                key="name"
                                id="name"
                                className="md:h-16 md:w-52 h-12 w-[95%] mx-2  md:mx-0 md:mr-3 mb-3 bg-gray-200 rounded-sm text-green-900 "
                                placeholder="  Gider İsmi"
                                type="text"
                                onChange={handleInput}
                                value={data.name || ""} // Set input value from state
                            />
                            <input
                                key="number"
                                id="number"
                                className="md:h-16 md:w-52 h-12 w-[95%] mx-2 mb-3 bg-gray-200 rounded-sm text-green-800"
                                placeholder="  Gider Miktarı"
                                type="number"
                                onChange={handleInput}
                                value={data.number || ""} // Set input value from state
                            />
                            <input
                                key="installments"
                                id="installments"
                                className="md:h-16 md:w-52 h-12 w-[95%] mx-2  bg-gray-200 rounded-sm text-green-800"
                                placeholder="  Taksit Sayısı"
                                type="number"
                                onChange={handleInput}
                                value={data.installments || ""} // Set input value from state
                            />
                            <button
                                type="submit"
                                className="bg-orange-300 w-[95%] mx-2  mt-3 md:w-24 md:h-16 h-12 rounded-sm text-slate-800  md:mx-3 font-bold text-lg"
                            >
                                Ekle
                            </button>
                        </form>

                        {savedStatus ? (
                            <p className="text-green-500 ml-3 md:ml-0">Başarıyla eklendi.</p>
                        ) : (
                            <p className="text-gray-500 ml-3 md:ml-0">Henüz değer girilmedi.</p>
                        )}
                    </div>
                </div>
                <div className="items-center flex justify-center mt-8 flex-col overflow-x-hidden">
          <table className="px-3">
            <thead>
              <tr className="border-b md:w-[36rem] w-screen flex justify-between text-sm ">
                <th className="font-light ml-3">Miktar</th>
                <th className=" font-light">İsim</th>
                <th className=" font-light">Taksit</th>
                <th className="font-light mr-3">Kaldır</th>
              </tr>
            </thead>

            {dataMan?.map((data, index) => (
              <tbody key={index}>
                <tr  className="flex justify-between">
                  <td>
                    <p className=" text-red-400 pl-2">
                      -{data?.number.toLocaleString()}TL
                    </p>
                  </td>
                  <td>
                    <p className=" text-gray-400 text-sm">{data?.name}</p>
                  </td>
                  <td>
                    <p className=" text-gray-400 text-sm">{data?.installments}</p>
                  </td>
                  <td>
                    <AiOutlineClose
                      onClick={() => deleteExpense(index)}
                      className="mr-4 mt-1 w-4 h-4"
                    />
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
                <div className="items-center flex justify-center mt-8 flex-col">
                    <p className="border-b flex w-72 justify-center">Total Gider</p>
                    <p className=" text-red-400">-{total.toLocaleString()} TL</p>
                </div>
            </div>

        </div>
    )
}

export default Expense