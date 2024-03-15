import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RequirementField = ({
  name,
  id,
  register,
  errors,
  getValues,
  setValue,
}) => {
  const { course, editCourse } = useSelector(state => state.course);
  const [inpVal, setInpVal] = useState("");
  const [requirements, setRequirements] = useState([]);

  const addHandler = (e) => {
    e.preventDefault();
    if (inpVal?.length > 0) {
      setInpVal("");
      setRequirements((prev) => [...prev, inpVal]);
    }
  };

  const removeHandler = (e, index) => {
    e.preventDefault();
    const newRequirements = requirements.filter((item, i) => index !== i);
    setRequirements(newRequirements);
  }

  useEffect(() => {
    if (editCourse) {
      setRequirements(course?.instructions.toString().split(','));
    }
    register(name, { required: true });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setValue(name, requirements);
    // eslint-disable-next-line
  }, [requirements]);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-md">
        Requirements/Instructions <span className="text-pink-500">*</span>
      </label>
      <input
        className="px-3 py-3 bg-richblack-700 rounded-md outline-none border-none shadow-[0_1px_1px_rgba(255,255,255,0.6)] w-full"
        type="text"
        id={id}
        name={name}
        placeholder="Enter Course Title"
        value={inpVal}
        onChange={(e) => setInpVal(e.target.value)}
      />
      {errors[name] && <span className="text-pink-300">Course requirements are required</span>}
      <button
        className="text-lg text-yellow-50 text-start"
        onClick={addHandler}
      >
        Add
      </button>
      <div className="flex flex-col gap-1">
        {requirements.map((item, index) => (
          <div className="flex items-center gap-3" key={index}>
            <span>{item}</span>
            <button className="text-richblack-300 text-[12px]" onClick={(e) => removeHandler(e, index)}>clear</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequirementField;
