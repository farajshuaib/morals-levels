import React, { useEffect, useState } from "react";
import Values from "../models/Values";
import { MoralValue } from "../types";
import Safe from "./Safe";
import Table from "./Table";

const showValues: React.FC = () => {
  const [values, setValues] = useState<MoralValue[]>([]);
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

  console.log(values);

  if (loading) {
    return (
      <div className="flex items-start justify-center h-full w-full text-primary">
        <i className="bx bx-loader-alt bx-spin text-6xl "></i>
      </div>
    );
  }

  return (
    <div>
      <Safe data={values}>
        <Table th={["id", "القيمة", ""]}>
          {values.map((item, index) => (
            <tr key={index} className="border-b border-gray-50 even:bg-gray-50">
              <td className="px-6 py-3 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-3 whitespace-nowrap">{item.valueName}</td>
              <td className="px-6 py-3 whitespace-nowrap">
                <div>
                  <button className="px-5 py-2 text-sm bg-primary rounded-lg text-white">
                    عرض
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Safe>
    </div>
  );
};

export default showValues;
