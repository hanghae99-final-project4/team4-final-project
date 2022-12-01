import React from "react";

const InfoCategory = () => {
  const category = ["#운동", "#자격증", "#취업"];

  const category2 = ["#틱톡", "#취준생", "#여행"];

  const category3 = ["#대학생", "#패션", "#알바"];

  console.log(category);

  const categoryList = category.map((item, index) => (
    <div
      key={index}
      className="float-left w-[88px] h-[38px] flex justify-center items-center bg-[#fffff] shadow-[0px_4px_4px_rgba(0,0,0,0.3)] rounded-[20px] text-[0.8rem]"
    >
      {item}
    </div>
  ));

  const categoryList02 = category2.map((item, index) => (
    <div
      key={index}
      className="float-left w-[88px] h-[38px] flex justify-center items-center bg-[#fffff] shadow-[0px_4px_4px_rgba(0,0,0,0.3)] rounded-[20px] text-[0.8rem]"
    >
      {item}
    </div>
  ));

  const categoryList03 = category3.map((item, index) => (
    <div
      key={index}
      className="float-left w-[88px] h-[38px] flex justify-center items-center bg-[#fffff] shadow-[0px_4px_4px_rgba(0,0,0,0.3)] rounded-[20px] text-[0.8rem]"
    >
      {item}
    </div>
  ));

  return (
    <>
      <div>
        <div> {categoryList}</div>
        <div className="float-right">{categoryList02}</div>
        <div>{categoryList03}</div>
      </div>
    </>
  );
};

export default InfoCategory;
