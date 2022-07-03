import React, { useEffect, useState } from "react";
import MoralValues from "../models/moralValue";
import Values from "../models/Values";

const showValues: React.FC = () => {
  const [values, setValues] = useState<MoralValues[]>([]);
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

  console.log(values)

  if (loading) {
    return (
      <div className="flex items-start justify-center h-full w-full text-primary">
        <i className="bx bx-loader-alt bx-spin text-6xl "></i>
      </div>
    );
  }

  return <div>showValues</div>;
};

export default showValues;
