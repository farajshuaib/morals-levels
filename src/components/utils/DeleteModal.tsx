import React from "react";
import Modal from "./Modal";

interface props {
  submit: () => void;
  hide: () => void;
  visible: boolean;
}

const DeleteModal: React.FC<props> = ({ visible, hide, submit }) => {
  return (
    <Modal isVisible={visible} close={hide}>
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="p-8 flex items-center">
          <div className="bg-red-50 h-16 w-16 rounded-full flex items-center justify-center">
            <i className="bx bx-trash text-3xl text-red-600"></i>
          </div>
          <div className="mx-5">
            <h4 className="text-3xl text-gray800">
              هل انت متأكد من حذف هذا العنصر
            </h4>
            <p className="text-lg text-gray700">
              سيتم حذف هذا العنصر من القائمة
            </p>
          </div>
        </div>
        <div className="p-5 bg-gray50 flex items-center justify-end">
          <button
            onClick={submit}
            className="btn-primary bg-red-600 border border-red-600 py-3 mx-5 px-8"
          >
            <span>حذف</span>
          </button>
          <button
            onClick={hide}
            className="bg-transparent mx-5 shadow-none border-0 text-gray700"
          >
            <span>إلغاء</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
