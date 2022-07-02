import { useMemo, useState } from "react";
import logo from "./assets/logo.svg";

function App() {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  const cards = useMemo(() => {
    return [
      {
        title: "مستويات القيم",
        bg: "bg-purple-500",
        icon: <i className="bx bx-layer"></i>,
        onClick: () => {},
      },
      {
        title: "مصدر القيم",
        bg: "bg-orange-500",
        icon: <i className="bx bx-cube-alt"></i>,
        onClick: () => {},
      },
      {
        title: "القيم بمعايير الرقي",
        bg: "bg-blue-400",
        icon: <i className="bx bx-line-chart"></i>,
        onClick: () => {},
      },
      {
        title: "قيم سلم السعادة",
        bg: "bg-yellow-500",
        icon: "",
        onClick: () => {},
      },
      {
        title: "مدرسة القيم",
        bg: "bg-purple-500",
        icon: "",
        onClick: () => {},
      },
      { title: "نوع القيم", bg: "bg-stone-500", icon: "", onClick: () => {} },
      { title: "وقع القيم", bg: "bg-lime-500", icon: "", onClick: () => {} },
      { title: "إضافة قيمة ", bg: "bg-gray-600", icon: "", onClick: () => {} },
      {
        title: "عرض قائمة القيم",
        bg: "bg-slate-500",
        icon: "",
        onClick: () => {},
      },
    ];
  }, []);

  return (
    <div className="App">
      <nav className="fixed z-50 w-full bg-blue-500">
        <div className="container mx-auto p-5 md:p-8">
          <h1 className="text-3xl text-white font-bold">
            مستويات القيم الأخلاقية
          </h1>
        </div>
      </nav>

      <main className="container mx-auto px-5 md:px-8 pt-28">
        {/*  cards  */}
        <section
          id="cards"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8 md:gap-12"
        >
          {cards.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className={`${item.bg} p-8 md:p-16 rounded-md shadow-sm hover:shadow-2xl transition-all duration-150 transform hover:scale-105 flex items-start justify-center text-lg md:text-2xl text-white font-medium`}
            >
              <span className="text-4xl">{item.icon}</span>
              <h3 className="mx-1">{item.title}</h3>
            </button>
          ))}
        </section>

        {/* divider */}
        <span className="block w-3/4 mx-auto h-1 bg-slate-100 my-12 rounded-lg"></span>

        {/* search form */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex item-center md:w-3/4 mx-auto"
        >
          <input
            type="search"
            className="flex-1 border border-gray-200 rounded-r-lg p-3"
            value={searchValue}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setSearchValue(e.currentTarget.value)
            }
          />
          <button
            type="submit"
            onClick={handleSearchSubmit}
            className="bg-blue-500 text-white text-3xl px-5 py-3 rounded-l-lg flex item-center justify-center"
          >
            <i className="bx bx-search"></i>
          </button>
        </form>

        {/* search result */}
      </main>
    </div>
  );
}

export default App;
