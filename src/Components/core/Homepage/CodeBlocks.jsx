import React from "react";
import Button from "./Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  btn1,
  btn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div className={`flex ${position} lg:flex-row flex-col my-20 justify-between gap-10`}>
      {/* Part 1 */}
      <div className="lg:w-[50%] flex flex-col gap-8">
        <div>{heading}</div>
        <div className="font-bold text-richblack-300">{subheading}</div>
        <div className="flex gap-7 mt-7">
          <Button active={btn1.active} linkTo={btn1.linkTo}>
            <div className="flex gap-2 items-center">
              {btn1.btnText}
              <FaArrowRight />
            </div>
          </Button>

          <Button active={btn2.active} linkTo={btn2.linkTo}>
            {btn2.btnText}
          </Button>
        </div>
      </div>

      {/* Part 2 */}
      <div
        className="h-fit lg:w-[50%] flex flex-row py-5 relative"
        style={{
          background:
            "linear-gradient(111.93deg,rgba(14,26,45,.24) -1.4%,rgba(17,30,50,.38) 104.96%)",
        }}
      >
        {/* Bg Gradient */}
        <div
          className="absolute w-[50%] h-[50%] top-0"
          style={{
            background: backgroundGradient,
            borderRadius: "100%",
            filter: "blur(34px)",
            height: "257.05px",
            left: "calc(50% - 263.005px)",
            opacity: 0.2,
            top: "calc(50% - 175.995px)",
            transform: "matrix(1, 0, -0.03, 1, 0, 0)",
            width: "372.95px",
          }}
        ></div>
        <div className="text-center flex flex-col w-[10%] text-richblack-400 font-bold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>
        <div
          className={`flex flex-col w-[90%] gap-2 font-bold font-mono ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
