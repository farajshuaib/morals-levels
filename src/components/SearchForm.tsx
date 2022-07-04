import React, { useEffect, useState } from "react";
import { MoralValue } from "../types";

interface props {
  values: MoralValue[];
  setData: (val: MoralValue[]) => void;
}

const SearchForm: React.FC<props> = ({ values, setData }) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // now should set data values
  };

  useEffect(() => {
    setData(
      values.filter(
        (item: MoralValue) =>
          item.valueName.match(searchValue) ||
          item.ActivationValue.match(searchValue) ||
          item.DerelictionValueName.match(searchValue) ||
          item.ExaggerateValueName.match(searchValue) ||
          item.LadderValue.match(searchValue) ||
          item.LevelValue.match(searchValue) ||
          item.SchoolValue.match(searchValue) ||
          item.StandardValue.match(searchValue) ||
          item.TypedValue.match(searchValue) ||
          item.SourcedValue.match(searchValue)
      )
    );
  }, [searchValue]);
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
        aria-label="search"
        className="bg-blue-500 text-white text-3xl px-5 py-3 rounded-l-lg flex item-center justify-center"
      >
        <i className="bx bx-search"></i>
      </button>
    </form>
  );
};

export default SearchForm;
