import React from "react";

interface props {
  th: string[];
  children: React.ReactNode;
}

const Table: React.FC<props> = ({ children, th }) => {
  return (
    <div className=" relative sm:rounded-lg overflow-x-auto overflow-y-visible border border-gray-200 ">
      <table className="w-full bg-white rounded-md text-right">
        <thead>
          <tr className="border-b border-gray150 p-4">
            {th.map((item, index) => (
              <td
                key={index}
                className="px-6 py-3 whitespace-nowrap text-gray800 bg-gray-200 font-bold"
              >
                {item}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
