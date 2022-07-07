import React from "react";

interface props {
  data: any;
  children: React.ReactNode
}

const Safe: React.FC<props> = ({ children, data }) => {
  if (data) {
    return <>{children}</>;
  } else {
    return (
      <div>
        <h5 className="text-center my-12 text-2xl">لا يوجد بيانات لعرضها</h5>
      </div>
    );
  }
};

export default Safe;
