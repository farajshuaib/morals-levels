import React, { useEffect, useState } from "react";
import Values from "../models/Values";
import { MoralValue } from "../types";
import Safe from "./Safe";
import SearchForm from "./SearchForm";
import Table from "./Table";

const DataValuesSection = () => {
  const [values, setValues] = useState<MoralValue[]>([]);
  const [data, setData] = useState<MoralValue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    const valuesInstance = new Values();
    await valuesInstance.getValuesFromStorage();
    setValues(valuesInstance.getValues());
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-start justify-center h-full w-full text-primary">
        <i className="bx bx-loader-alt bx-spin text-6xl "></i>
      </div>
    );
  }

  return (
    <div>
      {/* search form */}
      <SearchForm
        values={values}
        setData={(value: MoralValue[]) => setData(value)}
      />

      {/* search result */}
      <Safe data={data}>
        <Table
          th={[
            "التقصير",
            "القيمة",
            "المبالغة",
            "القيم بمعايير رقي المجتمع",
            "مصدر القيم",
            "مستويات القيم",
            "قيم سلم السعادة",
            "مدرسة القيم",
            "نوع قيم",
            "وقع القيمة",
          ]}
        >
          {data.map((item, index) => (
            <tr key={index} className="border-b border-gray-50 even:bg-gray-50">
              <td className="px-6 py-3 whitespace-nowrap">
                {item.DerelictionValueName}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">{item.valueName}</td>
              <td className="px-6 py-3 whitespace-nowrap">
                {item.ExaggerateValueName}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                {item.StandardValue}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                {item.SourcedValue}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">{item.LevelValue}</td>
              <td className="px-6 py-3 whitespace-nowrap">
                {item.LadderValue}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                {item.SchoolValue}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">{item.TypedValue}</td>
              <td className="px-6 py-3 whitespace-nowrap">
                {item.ActivationValue}
              </td>
            </tr>
          ))}
        </Table>
      </Safe>
    </div>
  );
};

export default DataValuesSection;
