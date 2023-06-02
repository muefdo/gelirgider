import React from "react";

const Capital = () => {
  return (
    <div className="flex-col md:flex-row md:justify-between flex mt-12 mb-12">
      <form>
        <h1>Ana Para Ekle</h1>

        <input
          key="number"
          id="number"
          className="md:h-16 md:w-52 h-12 w-[95%] bg-gray-200 rounded-sm text-green-800"
          placeholder="  Ana Para Miktarı"
          type="number"
          value={""} // Set input value from state
        />

        <button
          type="submit"
          className="bg-orange-300 w-[95%]  mt-3 md:w-24 md:h-16 h-12 rounded-sm text-slate-800  md:mx-3 font-bold text-lg"
        >
          Ekle
        </button>
      </form>
      <div className="h-[25%] w-[15%] mt-4">
        <p className="font-semibold text-lg">Anapara</p>
        <p>para</p>
      </div>
      <div className="h-[25%] w-[15%] mt-4">
        <p className="font-semibold text-lg">Anapara&apos;dan Kalan</p>
        <p>para</p>
      </div>
    </div>
  );
};

export default Capital;
