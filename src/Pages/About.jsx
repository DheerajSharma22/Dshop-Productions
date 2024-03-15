import React from "react";
import HighlightText from "../Components/core/Homepage/HighlightText";
import about1 from "../assets/Images/aboutus1.webp";
import about2 from "../assets/Images/aboutus2.webp";
import about3 from "../assets/Images/aboutus3.webp";
import storyImage from "../assets/Images/FoundingStory.png";
import Stats from "../Components/core/About/Stats";
import LearningGrid from "../Components/core/About/LearningGrid";
import ContactForm from "../Components/core/About/ContactForm";

const About = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className="text-center text-richblack-5 bg-richblack-700 relative">
        <div className="flex items-center justify-center flex-col w-11/12 max-w-maxContent mx-auto">
          <div className="lg:w-[70%] py-32">
            <h3 className="lg:text-4xl text-3xl font-bold text-center">
              Driving Innovation in Online Education for a{" "}
              <HighlightText text="Brighter Future" />
            </h3>
            <p className="mt-6 text-richblack-200 lg:text-lg font-medium">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </div>

          <div className="sm:h-[70px] lg:h-[150px]"></div>

          <div className="w-[90%] absolute bottom-0 translate-y-[30%] grid grid-cols-3 gap-5 left-[50%] translate-x-[-50%]">
            <img src={about1} alt="about 1" loading="lazy" />
            <img src={about2} alt="about 2" loading="lazy" />
            <img src={about3} alt="about 3" loading="lazy" />
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="mt-16">
        <div className="w-11/12 max-w-maxContent mx-auto py-20 text-center text-white">
          <p className="text-xl md:text-4xl font-bold">
            We are passionate about revolutionizing the way we learn. Our
            innovative platform <HighlightText text="combines technology" />,
            <span className="bg-gradient-to-b from-[#FF512F]  to-[#F09819] text-transparent bg-clip-text font-bold">
              {" "}
              expertise
            </span>
            , and community to create an
            <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
              {" "}
              unparalleled educational experience.
            </span>
          </p>
        </div>
      </div>

      {/* Section 3 */}
      <div>
        <div className="py-20 w-11/12 max-w-maxContent mx-auto flex lg:flex-row flex-col items-center justify-between lg:gap-32 gap-20 min-h-screen">
          <div className="lg:w-[50%]">
            <h2 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]">
              Our Founding Story
            </h2>
            <div className="flex flex-col gap-10 mt-5 text-richblack-300 md:text-lg">
              <p>
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p>
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>
          </div>

          <div className="lg:w-[50%] flex justify-end">
            <img
              src={storyImage}
              alt="founding story img"
              loading="lazy"
              className="w-[100%] shadow-[0_0_20px_0] shadow-[#FC6767]"
            />
          </div>
        </div>
      </div>

      {/* section 4 */}
      <Stats />

      {/* Section 5 */}
      <LearningGrid />

      {/* Section 6 */}
      <div className="max-w-[90%] sm:max-w-[500px] mx-auto py-20">
        <ContactForm heading={"Get In Touch"} para={"We'd love to here for you, Please fill out this form."}/>
      </div>
    </div>
  );
};

export default About;
