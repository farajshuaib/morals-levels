import React, { useEffect, useState } from "react";
import { MoralValue } from "../types";
import Safe from "./utils/Safe";
import SearchForm from "./SearchForm";
import Table from "./utils/Table";
import { useStoreActions, useStoreState } from "easy-peasy";

interface props {
  setDeleteItem: (data: MoralValue) => void;
  setEditItem: (data: MoralValue) => void;
}

const DataValuesSection: React.FC<props> = ({ setDeleteItem, setEditItem }) => {
  const [data, setData] = useState<MoralValue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getValues = useStoreActions<any>((actions) => actions.morals.getValues);
  const values: MoralValue[] = useStoreState<any>(
    (state) => state.morals.get_values
  );

  const getData = async () => {
    await getValues();
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData(values);
  }, [values]);

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
            "تمت الاضافة بواسطة",
            "",
          ]}
        >
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-50 even:bg-gray-50 text-gray-900"
            >
              <td className="px-6 py-3 whitespace-nowrap">
                {item.data.DerelictionValueName}
              </td>
              <td className="px-6 py-3 whitespace-nowrap font-bold">
                {item.data.valueName}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                {item.data.ExaggerateValueName}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                {item.data.StandardValue}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                {item.data.SourcedValue}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                {item.data.LevelValue}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                {item.data.LadderValue}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                {item.data.SchoolValue}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                {item.data.TypedValue}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                {item.data.ActivationValue}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                {item.data?.student_id || "استاذ المادة"}
              </td>
              <td className="px-6 py-3 whitespace-nowrap flex items-center gap-5  text-2xl">
                <button onClick={() => setDeleteItem(item)}>
                  <i className="bx bx-trash-alt text-red-600"></i>
                </button>
                <button onClick={() => setEditItem(item)}>
                  <i className="bx bxs-edit text-green-500"></i>
                </button>
              </td>
            </tr>
          ))}
        </Table>
      </Safe>
    </div>
  );
};

export default DataValuesSection;
