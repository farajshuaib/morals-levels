import { useState } from "react";
import Safe from "./components/Safe";
import SearchForm from "./components/SearchForm";
import Table from "./components/Table";
import { cards } from "./components/CardList";
import Modal from "./components/Modal";
import { useRegisterSW } from "virtual:pwa-register/react";
import { registerSW } from "virtual:pwa-register";

if ("serviceWorker" in navigator) {
  // && !/localhost/.test(window.location)) {
  registerSW({
    onNeedRefresh() {
      console.log("onNeedRefresh");
    },
    onOfflineReady() {
      console.log("onOfflineReady");
    },
    onRegisterError(error) {
      console.log("onRegisterError", error);
    },
  });
} else {
  console.log("browser does not support service worker");
}

const intervalMS = 60 * 60 * 1000;

function App() {
  const [data, setData] = useState<string>();
  const [modalContent, setModalContent] = useState<React.ReactNode>();

  useRegisterSW({
    onRegistered(r) {
      r &&
        setInterval(() => {
          r.update();
        }, intervalMS);
    },
  });

  return (
    <div className="App">
      <nav className=" bg-primary">
        <div className="container mx-auto p-5 md:p-8">
          <h1 className="text-3xl text-white font-bold">
            مستويات القيم الأخلاقية
          </h1>
        </div>
      </nav>

      <main className="container mx-auto px-5 md:px-8 py-12">
        {/*  cards  */}
        <section
          id="cards"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8 md:gap-12"
        >
          {cards.map((item, index) => (
            <button
              key={index}
              id={item.id}
              onClick={() => setModalContent(item.modalContent)}
              className={`${item.bg} p-8 md:p-16 rounded-md shadow-sm hover:shadow-2xl transition-all duration-150 transform hover:scale-105 flex items-start justify-center text-lg md:text-2xl text-white font-medium`}
            >
              <h3 className="mx-1">{item.title}</h3>
              <span className="text-4xl">{item.icon}</span>
            </button>
          ))}
        </section>

        {/* divider */}
        <span className="block w-3/4 mx-auto h-1 bg-slate-100 my-12 rounded-lg"></span>

        {/* search form */}
        <SearchForm setData={(value: string) => setData(value)} />

        {/* search result */}
        <Safe data={data}>
          <Table th={[""]}>
            <tr>
              <td></td>
            </tr>
          </Table>
        </Safe>
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
        <div className="bg-white w-full p-8 rounded-lg relative">
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
    </div>
  );
}

export default App;
