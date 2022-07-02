import React, { useState } from "react";

interface props {
  setData: (val:string) => void;
}

const SearchForm: React.FC<props> = ({  setData }) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // now should set data values
  };
  return (
    <form
      onSubmit={handleSearchSubmit}
      className="flex item-center md:w-3/4 mx-auto py-5"
    >
      <input
        type="search"
        className="flex-1 border border-gray-200 rounded-r-lg p-3"
        value={searchValue}
        placeholder="ابحث عن قيمة اخلاقية... (مثلا: الشجاعة)"
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setSearchValue(e.currentTarget.value)
        }
      />
      <button
        type="submit"
        onClick={handleSearchSubmit}
        className="bg-blue-500 text-white text-3xl px-5 py-3 rounded-l-lg flex item-center justify-center"
      >
        <i className="bx bx-search"></i>
      </button>
    </form>
  );
};

export default SearchForm;
