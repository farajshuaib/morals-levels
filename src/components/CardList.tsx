import { useEffect, useState } from "react";
import ValueForm from "./ValueForm";

interface ModalContentProps {
  title: string;
  description: string | React.ReactNode;
  classification?: string[];
}

const ModalContent: React.FC<ModalContentProps> = ({
  title,
  description,
  classification,
}) => {
  console.log("classification", classification);
  return (
    <section className="w-full">
      <h1 className="text-4xl">{title}</h1>
      <div className="text-2xl text-gray-500 mt-8 tracking-wide leading-relaxed max-h-96 overflow-auto">
        {description}
      </div>
      {classification && classification.length > 0 && (
        <ul className="mt-5 flex items-center gap-5 text-gray-700 text-3xl">
          {classification.map((item, index) => (
            <li key={index}>{item} {(index !== classification.length - 1) && "|"}</li>
          ))}
        </ul>
      )}
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
        title={"القيم بمعايير رقي المجتمع"}
        classification={[
          "الأنسان",
          "الدين",
          "المادة",
          "الحياة",
          "الأخر",
          "العلم",
          "العدل",
          "الزمن",
        ]}
        description={
          "تعبر معايير قيم رقي المجتمع عن تصنيفات القيمة حسب علاقتها بالعناصر الأساسية التي تؤثر على المجتمع وهي:"
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
        classification={[
          "الدين",
          "التقاليد",
          "القانون",
          "المشاعر"
        ]}
        description={
          "تعددت مصادر القيم لدى الفرد حسب الوسط الاجتماعي, الديانة والحقبة الزمنية, تم حصر أهم مصادر القيم في الآتي:"
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
        classification={[
          "الأساس",
          "التعايش",
          "التواصل",
          "الحرب"
        ]}
        description={
          "ترتبت القيم على المجتمعات ترتيباً هرمياِ, تعرف بالسلم وهي مرتبة كالآتي:"
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
        classification={[
          "العقل",
          "القلب",
          "الجوارح"
        ]}
        description={
          "تحقق القيم الأخلاقية السعادة, والسعادة المحققة من فعل قيمة اخلاقية تصنيفات حسب نوع السعادة كالآتي"
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
        classification={[
          "الحدثية",
          "الغائية"
        ]}
        description={
          "تختلف القيم في كيفية تحديدها كقيم حسنة, بعضها يعتبر حسن بإعتبار الحدث حسن, وبعض القيم تأخد الغاية في عين الاعتبار إذا كانت حسنة ام خبيثة."
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
        classification={[
          "مهنية",
          "شخصية"
        ]}
        description={"نوع القيم يصنف القيمة حسب نطاق إستخدام القيمة كالآتي :"}
      />
    ),
    id: "type",
  },
  {
    title: "وقع القيم",
    bg: "bg-lime-500",
    icon: <i className="bx bxs-group"></i>,
    modalContent: (
      <ModalContent
        title={"وقع القيم"}
        classification={[
          "مفعلة",
          "مجردة"
        ]}
        description={
          "يحدد هذا المعيار حالة تفعيل القيمة في المجتمع المحيط , وهي كالآتي :"
        }
      />
    ),
    id: "activation",
  },
  {
    title: "إضافة قيمة ",
    bg: "bg-gray-600 md:col-span-2",
    icon: <i className="bx bx-plus-circle"></i>,
    modalContent: (
      <ModalContent
        title={"إضافة قيمة اخلاقية"}
        description={<ValueForm />}
      />
    ),
    id: "addValue",
  },
  // {
  //   title: "عرض قائمة القيم",
  //   bg: "bg-slate-500",
  //   icon: <i className="bx bx-show"></i>,
  //   modalContent: (
  //     <ModalContent title={"القيم الأخلاقية"} description={<ShowValues />} />
  //   ),
  //   id: "showValues",
  // },
];
