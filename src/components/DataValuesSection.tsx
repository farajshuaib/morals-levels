import React, { useEffect, useState } from "react";
import { MoralValue } from "../types";
import Safe from "./utils/Safe";
import SearchForm from "./SearchForm";
import Table from "./utils/Table";
import { useStoreActions, useStoreState } from "easy-peasy";
import {
  updateAllVisibility,
  updateValueVisibility,
} from "../services/moralsCRUD";

interface props {
  setDeleteItem: (data: MoralValue) => void;
  setEditItem: (data: MoralValue) => void;
}

const DataValuesSection: React.FC<props> = ({ setDeleteItem, setEditItem }) => {
  const [data, setData] = useState<MoralValue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userData = useStoreState<any>((actions) => actions.userData.get);
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
      {!userData.data.student_id && (
        <div className="flex items-center my-5 gap-5">
          <button
            onClick={async () => {
              setLoading(true);
              await updateAllVisibility(true);
              setLoading(false);
            }}
            className="bg-primary px-5 py-2 rounded-lg text-lg text-white"
          >
            عرض كل القيم للطلبة
          </button>
          <button
            onClick={async () => {
              setLoading(true);
              await updateAllVisibility(false);
              setLoading(false);
            }}
            className="bg-green-500 px-5 py-2 rounded-lg text-lg text-white"
          >
            اخفاء كل القيم عن الطلبة
          </button>
        </div>
      )}

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
            <>
              {(userData.data.student_id ? item.data.visible : true) && (
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
                    {!userData.data.student_id && (
                      <>
                        <button onClick={() => setDeleteItem(item)}>
                          <i className="bx bx-trash-alt text-red-600"></i>
                        </button>
                        <button onClick={() => setEditItem(item)}>
                          <i className="bx bxs-edit text-green-500"></i>
                        </button>
                        <button
                          onClick={async () => {
                            setLoading(true);
                            await updateValueVisibility(
                              item,
                              item.data.visible ? false : true
                            );
                            setLoading(false);
                          }}
                        >
                          {!!item.data.visible ? (
                            <i className="bx bx-hide"></i>
                          ) : (
                            <i className="bx bx-show"></i>
                          )}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              )}
            </>
          ))}
        </Table>
      </Safe>
    </div>
  );
};

export default DataValuesSection;
