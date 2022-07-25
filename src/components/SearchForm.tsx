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
          item.data.valueName.match(searchValue) ||
          item.data.ActivationValue.match(searchValue) ||
          item.data.DerelictionValueName.match(searchValue) ||
          item.data.ExaggerateValueName.match(searchValue) ||
          item.data.LadderValue.match(searchValue) ||
          item.data.LevelValue.match(searchValue) ||
          item.data.SchoolValue.match(searchValue) ||
          item.data.StandardValue.match(searchValue) ||
          item.data.TypedValue.match(searchValue) ||
          item.data.SourcedValue.match(searchValue) ||
          item.data.student_id?.match(searchValue) 
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
