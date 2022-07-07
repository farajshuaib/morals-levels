import React, { useEffect, useState } from "react";
import LoadingScreen from "../components/utils/LoadingScreen";
import NavBar from "../components/utils/NavBar";
import { Student } from "../types";

import Table from "../components/utils/Table";
import { useStoreActions, useStoreState } from "easy-peasy";
import Safe from "../components/utils/Safe";
import Modal from "../components/utils/Modal";
import StudentForm from "../components/StudentForm";
import DeleteModal from "../components/utils/DeleteModal";

const Students: React.FC = () => {
  const [modalContent, setModalContent] = useState<React.ReactNode>();
  const [deleteItem, setDeleteItem] = useState<Student | null>();

  const [data, setData] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getValues = useStoreActions<any>(
    (actions) => actions.students.getStudents
  );
  const Student: Student[] = useStoreState<any>(
    (state) => state.students.get_students
  );
  const deleteStudent = useStoreActions<any>(
    (actions) => actions.morals.deleteStudent
  );

  const getData = async () => {
    await getValues();
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData(Student);
  }, [Student]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="Student">
      <NavBar />

      <main className="container mx-auto px-5 md:px-8 py-12">
        <div className="flex items-center justify-between my-5">
          <h1 className="text-2xl text-gray-800">الطلبة المسجلين </h1>
          <button
            onClick={() => {
              setModalContent(<StudentForm />);
            }}
            className="btn btn-primary"
          >
            اضافة طالب
          </button>
        </div>

        <Safe data={data}>
          <Table th={["رقم القيد", "الاسم", "البريد الالكتروني", ""]}>
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
                <td className="px-6 py-3 whitespace-nowrap flex items-center gap-5  text-2xl">
                  <button onClick={() => setDeleteItem(item)}>
                    <i className="bx bx-trash-alt text-red-600"></i>
                  </button>
                  <button
                    onClick={() => {
                      setModalContent(<StudentForm editItem={item} />);
                    }}
                  >
                    <i className="bx bxs-edit text-green-500"></i>
                  </button>
                </td>
              </tr>
            ))}
          </Table>
        </Safe>
      </main>

      <Modal isVisible={!!modalContent} close={() => setModalContent(null)}>
        <div className="bg-white w-full md:w-1/2 p-8 rounded-lg relative overflow-auto">
          <button
            className="float-left bg-light-opacity rounded-full h-8 w-8 flex items-center justify-center"
            onClick={() => setModalContent(null)}
          >
            <i className="bx bx-x text-4xl "></i>
          </button>
          <div className="clear-both"></div>
          {modalContent}
        </div>
      </Modal>

      <DeleteModal
        visible={!!deleteItem}
        hide={() => setDeleteItem(null)}
        submit={async () => {
          await deleteStudent(deleteItem?.id);
          setDeleteItem(null);
        }}
      />
    </div>
  );
};

export default Students;
