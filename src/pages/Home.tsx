import React from "react";
import { useState } from "react";
import { cards } from "../components/CardList";
import Modal from "../components/utils/Modal";
import DataValuesSection from "../components/DataValuesSection";
import { MoralValue } from "../types";
import DeleteModal from "../components/utils/DeleteModal";
import ValueForm from "../components/ValueForm";
import { useStoreActions } from "easy-peasy";
import NavBar from "../components/utils/NavBar";

const Home = () => {
  const [modalContent, setModalContent] = useState<React.ReactNode>();
  const [deleteItem, setDeleteItem] = useState<MoralValue | null>();
  const deleteValue = useStoreActions<any>(
    (actions) => actions.morals.deleteValue
  );

  return (
    <div className="Home">
      <NavBar />

      <main className="container mx-auto px-5 md:px-8 py-12">
        {/*  cards  */}
        <section
          id="cards"
          className="grid items-center justify-center grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-8 md:gap-12 lg:gap-16"
        >
          {cards.map((item, index) => (
            <button
              key={index}
              id={item.id}
              onClick={() => setModalContent(item.modalContent)}
              className={`${item.bg} p-8 md:p-16 rounded-md shadow-sm hover:shadow-2xl transition-all duration-150 transform hover:scale-105 flex flex-wrap-reverse lg:flex-nowrap items-start justify-center text-lg sm:text-xl md:text-2xl text-white font-medium`}
            >
              <h3 className="mx-1 w-full">{item.title}</h3>
              <span className="text-4xl">{item.icon}</span>
            </button>
          ))}
        </section>

        {/* divider */}
        <span className="block w-3/4 mx-auto h-1 bg-slate-100 my-12 rounded-lg"></span>

        <DataValuesSection
          setDeleteItem={(item: MoralValue) => {
            setDeleteItem(item);
          }}
          setEditItem={(item: MoralValue) => {
            setModalContent(<ValueForm editItem={item} />);
          }}
        />
      </main>

      <footer className="bg-gray-800 p-8">
        <img
          src="https://uot.edu.ly/resources/img/logo/it-logo_1583787298.png"
          loading="lazy"
          alt="جامعة طرابلس - كلية تقينة المعلومات "
          className="mx-auto"
        />
        <h6 className="text-center text-transparent bg-opacity-40  bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 uppercase">
          <span className="font-bold text-2xl sm:text-3xl lg:text-5xl block text-white">
            IT - UOT{" "}
          </span>
          <span className="font-bold text-2xl sm:text-3xl lg:text-5xl block text-white">
            Software engineering
          </span>
          <span className="font-extrabold tracking-widest leading-relaxed text-3xl sm:text-4xl md:text-5xl lg:text-8xl">
            moralities
          </span>
        </h6>
      </footer>

      <Modal isVisible={!!modalContent} close={() => setModalContent(null)}>
        <div className="bg-white w-full md:w-1/2 p-8 rounded-lg relative max-h-3/4 overflow-auto">
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
          await deleteValue(deleteItem?.id);
          setDeleteItem(null)
        }}
      />
    </div>
  );
};

export default Home;
