import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../Components/core/Homepage/HighlightText";
import Button from "../Components/core/Homepage/Button";

import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../Components/core/Homepage/CodeBlocks";
import LearningLanguageSection from "../Components/core/Homepage/LearningLanguageSection";
import TimelineSection from "../Components/core/Homepage/TimelineSection";
import InstructorSections from "../Components/core/Homepage/InstructorSections";
import ExploreMore from "../Components/core/Homepage/ExploreMore";
import Footer from "../Components/common/Footer";

const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto max-w-[90%] flex w-11/12 lg:max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        <Link to="/signup">
          <div className="group mx-auto mt-16 p-1 rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
            <div className="flex items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900 ">
              <p>Become an instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className="text-4xl text-center font-semibold capitalize mt-7">
          Empower your future with <HighlightText text="Coding Skills" />
        </div>
        <div className="text-center w-[90%] text-lg mt-4 text-richblack-300 font-bold">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex gap-7 mt-8">
          <Button active={true} linkTo="/signup">
            {" "}
            Learn More
          </Button>
          <Button active={false} linkTo="/login">
            {" "}
            Book a Demo
          </Button>
        </div>

        <div className="shadow-blue-200 mx-3 my-16 shadow-[10px_-5px_15px_-5px] ">
          <video muted autoPlay loop style={{ boxShadow: "20px 20px white" }}>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1 */}
        <div>
          <CodeBlocks
            backgroundGradient={
              "linear-gradient(123.77deg,#8a2be2 -6.46%,orange 59.04%,#f8f8ff 124.53%)"
            }
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-bold">
                Unlock your <HighlightText text={"Coding Potential"} /> With Our
                Online Courses
              </div>
            }
            subheading="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            btn1={{
              btnText: "Try at yourself",
              active: true,
              linkTo: "/signup",
            }}
            btn2={{ btnText: "Learn more", active: false, linkTo: "/login" }}
            codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>
                      </nav>\n</body>`}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            backgroundGradient="linear-gradient(118.19deg,#1fa2ff -3.62%,#12d8fa 50.44%,#a6ffcb 104.51%)"
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-bold">
                Start <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            btn1={{
              btnText: "Try at yourself",
              active: true,
              linkTo: "/signup",
            }}
            btn2={{ btnText: "Learn more", active: false, linkTo: "/login" }}
            codeblock={`import React from "react";
import CTAButton from "./Button";
import TypeAnimation from "react-type";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
return (
<div>Home</div>
)
}
export default Home;`}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* Explore More section */}
        <ExploreMore />
      </div>
      {/* Section 2 */}
      <div className=" bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg lg:h-[350px] h-[200px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto">
            <div className="lg:h-[200px] h-[50px]"></div>
            <div className="flex gap-7 text-white">
              <Button active={true} linkTo={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog <FaArrowRight />
                </div>
              </Button>

              <Button active={false} linkTo={"/signup"}>
                Learn more
              </Button>
            </div>
          </div>
        </div>

        <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-7">
          <div className="flex lg:flex-row flex-col  gap-5 mt-[95px]">
            <div className="text-4xl font-semibold lg:w-[50%]">
              Get the skills you need for a{" "}
              <HighlightText text="job that is in demand." />
            </div>
            <div className="flex flex-col lg:w-[50%] gap-10 items-start">
              <p className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>
              <Button active={true} linkTo={"/signup"}>
                Learn more
              </Button>
            </div>
          </div>
          <TimelineSection />

          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 */}

      <div className="flex flex-col w-11/12 max-w-maxContent items-center mx-auto justify-between gap-8 text-white ">
        <InstructorSections />
        <div className="text-[2.25rem] text-center font-semibold capitalize w-full">
          Review from other learners
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
