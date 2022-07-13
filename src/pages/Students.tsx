import React, { useEffect, useState } from "react";
import LoadingScreen from "../components/utils/LoadingScreen";
import NavBar from "../components/utils/NavBar";
import { User, userStatus } from "../types";

import Table from "../components/utils/Table";
import { useStoreActions, useStoreState } from "easy-peasy";
import Safe from "../components/utils/Safe";
import { toast } from "react-toastify";

const Users: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getValues = useStoreActions<any>((actions) => actions.users.getUsers);
  const User: User[] = useStoreState<any>((state) => state.users.get_users);
  const updateStudent = useStoreActions<any>(
    (actions) => actions.users.updateStudent
  );

  const getData = async () => {
    await getValues();
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData(User);
  }, [User]);

  const setUserStatus = async (User: User, status: userStatus) => {
    try {
      setLoading(true);
      await updateStudent({ ...User, data: { ...User.data, status } });
      toast.success("تم تحديث حالة الطالب بنجاح");
      setLoading(false);
    } catch (err) {
      toast.error("حدث خطأ ما الرجاء اعاةدة المحاولة او الاتصال بالدعم");
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="User">
      <NavBar />

      <main className="container mx-auto px-5 md:px-8 py-12">
        <div className="flex items-center justify-between my-5">
          <h1 className="text-2xl text-gray-800">الطلبة المسجلين </h1>
          <button className=" btn-primary">
            <span>اضافة طالب</span>
          </button>
        </div>

        <Safe data={data}>
          <Table th={["رقم القيد", "الاسم", "البريد الالكتروني", "الحالة", ""]}>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-50 even:bg-gray-50 text-gray-900"
              >
                <td className="px-6 py-3 whitespace-nowrap">
                  {item.data.student_id}
                </td>
                <td className="px-6 py-3 whitespace-nowrap">
                  {item.data.name}
                </td>
                <td className="px-6 py-3 whitespace-nowrap">
                  {item.data.email}
                </td>
                <td className="px-6 py-3 whitespace-nowrap">
                  {item.data.status || "unknown"}
                </td>
                <td className="px-6 py-3 whitespace-nowrap flex items-center gap-5  text-2xl">
                  {item.data.status === "waiting" && (
                    <>
                      <button
                        className="btn-primary bg-green-600"
                        onClick={() => {
                          setUserStatus(item, "approved");
                        }}
                      >
                        <span className="text-sm">الموافقة</span>
                      </button>
                      <button
                        className="btn-primary bg-red-600"
                        onClick={() => {
                          setUserStatus(item, "rejected");
                        }}
                      >
                        <span className="text-sm">رفض</span>
                      </button>
                    </>
                  )}
                  {item.data.status === "approved" && (
                    <button
                      className="btn-primary bg-red-600"
                      onClick={() => {
                        setUserStatus(item, "suspended");
                      }}
                    >
                      <span className="text-sm">ايقاف</span>
                    </button>
                  )}
                  {item.data.status === "rejected" ||
                    (item.data.status === "suspended" && (
                      <button
                        className="btn-primary "
                        onClick={() => {
                          setUserStatus(item, "approved");
                        }}
                      >
                        <span className="text-sm">اعادة تفعيل</span>
                      </button>
                    ))}
                </td>
              </tr>
            ))}
          </Table>
        </Safe>
      </main>
    </div>
  );
};

export default Users;
