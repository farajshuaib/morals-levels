import { useMemo, useState } from "react";
import Safe from "./components/Safe";
import SearchForm from "./components/SearchForm";
import Table from "./components/Table";
import { cards } from "./constant";

function App() {
  const [data, setData] = useState<string>();

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
    </div>
  );
}

export default App;
