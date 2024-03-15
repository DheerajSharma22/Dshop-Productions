import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TagsInput = ({ register, errors, name, id, setValue }) => {
  const { editCourse, course } = useSelector(state => state.course);
  const [inpVal, setInpVal] = useState("");
  const [tags, setTags] = useState([]);

  const keyHandler = (e) => {
    if (e.key === "Enter" && inpVal.length > 0) {
      e.preventDefault();
      setTags((prev) => [...prev, inpVal.substr(0, inpVal.length)]);
      setInpVal("");
    }

    if (e.key === ',' && inpVal.length > 0) {
      setTags((prev) => [...prev, inpVal.substr(0, inpVal.length)]);
      setInpVal("");
    }
  };

  const removeTag = (index) => {
    const newTags = tags.filter((tag, i) => index !== i);
    setTags(newTags);
  };

  useEffect(() => {
    if (editCourse) {
      const prevTags = course?.tags.toString().split(',');
      setTags(prevTags);
    }
    register(name, { required: true });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setValue(name, tags);
    // eslint-disable-next-line
  }, [tags]);

  return (
    <div className={`flex flex-col ${tags.length > 0 ? "gap-3" : "gap-1"} `}>
      <label htmlFor={id} className="text-md">
        Course Tags <span className="text-pink-500">*</span>
      </label>
      <div className="flex items-center gap-3 flex-wrap">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-yellow-500 px-3 py-1 rounded-[2rem] flex gap-3 items-center"
          >
            {tag}
            <span className="cursor-pointer" onClick={() => removeTag(index)}>
              &times;
            </span>
          </span>
        ))}
      </div>
      <input
        className="px-3 py-3 bg-richblack-700 rounded-md outline-none border-none shadow-[0_1px_1px_rgba(255,255,255,0.6)] w-full"
        type="text"
        id={id}
        name={name}
        onKeyDown={keyHandler}
        placeholder="Enter Tags and Press Enter"
        value={inpVal}
        onChange={(e) => setInpVal(e.target.value[e.target.value.length - 1] === ',' ? "" : e.target.value)}
      />
      {errors[name] && <span className="text-pink-300">Course Tags is required</span>}
    </div>
  );
};

export default TagsInput;
