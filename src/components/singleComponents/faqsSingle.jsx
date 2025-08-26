import { Minus, Plus } from "lucide-react";
import React from "react";

function FaqsSingle({ datas }) {
  const [openIndex, setOpenIndex] = React.useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {datas.map((item, index) => (
        <div
          key={index}
          data-aos="fade-up"
          data-aos-delay={index * 200}
          className="bg-white border-b group border-secondary/30 overflow-hidden "
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between"
          >
            <div className="flex-1 pr-4">
              <h3 className="font-semibold text-lg text-primary ">
                {item.question}
              </h3>
            </div>
            <div className="w-16 h-16 rounded-full transitions flex-all border bg-white group-hover:bg-secondary text-primary group-hover:text-white">
              {openIndex === index ? (
                <Minus className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
            </div>
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4">
              <div className="p-6 bg-accent rounded">
                <p className="text-primary font-medium leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FaqsSingle;
