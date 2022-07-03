import AddValueForm from "./AddValueForm";
import ShowValues from "./showValues";

interface ModalContentProps {
  title: string;
  description: string | React.ReactNode;
}

const ModalContent: React.FC<ModalContentProps> = ({ title, description }) => {
  return (
    <section className="w-full">
      <h1 className="text-3xl">{title}</h1>
      <div className="text-xl text-gray-700 mt-4 tracking-wide leading-relaxed max-h-96 overflow-auto">
        {description}
      </div>
    </section>
  );
};

export const cards = [
  {
    title: "القيم بمعايير الرقي",
    bg: "bg-blue-400",
    icon: <i className="bx bx-line-chart"></i>,
    modalContent: (
      <ModalContent
        title={"القيم بمعايير الرقي"}
        description={
          "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور"
        }
      />
    ),
    id: "standards",
  },
  {
    title: "مصدر القيم",
    bg: "bg-orange-500",
    icon: <i className="bx bx-cube-alt"></i>,
    modalContent: (
      <ModalContent
        title={"مصدر القيم"}
        description={
          "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور"
        }
      />
    ),
    id: "source",
  },
  {
    title: "مستويات القيم",
    bg: "bg-purple-500",
    icon: <i className="bx bx-layer"></i>,
    modalContent: (
      <ModalContent
        title={"مستويات القيم"}
        description={
          "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور"
        }
      />
    ),
    id: "levels",
  },

  {
    title: "قيم سلم السعادة",
    bg: "bg-yellow-500",
    icon: <i className="bx bx-sort-up"></i>,
    modalContent: (
      <ModalContent
        title={"قيم سلم السعادة"}
        description={
          "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور"
        }
      />
    ),
    id: "ladder",
  },
  {
    title: "مدرسة القيم",
    bg: "bg-purple-500",
    icon: <i className="bx bxs-graduation"></i>,
    modalContent: (
      <ModalContent
        title={"مدرسة القيم"}
        description={
          "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور"
        }
      />
    ),
    id: "school",
  },
  {
    title: "نوع القيم",
    bg: "bg-stone-500",
    icon: <i className="bx bxs-bank"></i>,
    modalContent: (
      <ModalContent
        title={"نوع القيم"}
        description={
          "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور"
        }
      />
    ),
    id: "type",
  },
  {
    title: "وقع القيم",
    bg: "bg-lime-500",
    icon: <i className="bx bxs-grid"></i>,
    modalContent: (
      <ModalContent
        title={"وقع القيم"}
        description={
          "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور"
        }
      />
    ),
    id: "activation",
  },
  {
    title: "إضافة قيمة ",
    bg: "bg-gray-600",
    icon: <i className="bx bx-plus-circle"></i>,
    modalContent: (
      <ModalContent
        title={"إضافة قيمة اخلاقية"}
        description={<AddValueForm />}
      />
    ),
    id: "addValue",
  },
  {
    title: "عرض قائمة القيم",
    bg: "bg-slate-500",
    icon: <i className="bx bx-show"></i>,
    modalContent: (
      <ModalContent title={"القيم الأخلاقية"} description={<ShowValues />} />
    ),
    id: "showValues",
  },
];
