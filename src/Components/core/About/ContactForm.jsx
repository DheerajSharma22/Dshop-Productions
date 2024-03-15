import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import countryCodes from "../../../data/countrycode.json";

const ContactForm = ({ heading, para }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phoneNo: "",
        countryCode: "",
      });
    }
    // eslint-disable-next-line
  }, [isSubmitSuccessful, reset]);

  const submitContactForm = (data) => {
    console.log("Logging the contact data", data);
  };

  return (
    <div className="text-white flex flex-col items-center justify-center text-center w-full gap-10">
      <div>
        <h2 className="lg:text-4xl text-3xl font-bold">{heading}</h2>
        <p className="text-richblack-300 lg:text-lg mt-3">{para}</p>
      </div>

      <div className="w-full">
        <form
          onSubmit={handleSubmit(submitContactForm)}
          className="flex flex-col gap-6"
        >
          {/* Name */}
          <div className="flex gap-6 flex-col sm:flex-row w-full">
            {/* First name */}
            <div className="flex flex-col gap-2 text-start">
              <label htmlFor="fName">First Name</label>
              <input
                className="px-3 py-3 bg-richblack-700 rounded-md outline-none border-none shadow-[0_1px_1px_rgba(255,255,255,0.6)]
                w-full"
                type="text"
                id="fName"
                name="firstName"
                placeholder="Enter First Name"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <span className="text-pink-500">
                  Please enter your first name
                </span>
              )}
            </div>

            {/* Last name */}
            <div className="flex flex-col gap-2 text-start">
              <label htmlFor="lName">Last Name</label>
              <input
                className="px-3 py-3 bg-richblack-700 rounded-md outline-none border-none shadow-[0_1px_1px_rgba(255,255,255,0.6)] w-full"
                type="text"
                id="lName"
                name="lastName"
                placeholder="Enter Last Name"
                {...register("lastName", { required: false })}
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2 text-start">
            <label htmlFor="email">Email Address</label>
            <input
              className="px-3 py-3 bg-richblack-700 rounded-md outline-none border-none shadow-[0_1px_1px_rgba(255,255,255,0.6)] w-full"
              type="text"
              id="email"
              name="email"
              placeholder="Enter Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-pink-500">Please enter your email</span>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2 text-start">
            <label htmlFor="phone">Phone Number</label>
            <div className="flex gap-3 items-center">
              <div className="w-[20%]">
                <select
                  name="countryCode"
                  id="code"
                  className="px-3 py-3 bg-richblack-700 rounded-md outline-none border-none shadow-[0_1px_1px_rgba(255,255,255,0.6)] w-full"
                  {...register("countryCode", { required: true })}
                >
                  {countryCodes.map((code, index) => (
                    <option key={index} value={code.code}>
                      {code.code} {code.country}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-[80%]">
                <input
                  className="px-3 py-3 bg-richblack-700 rounded-md outline-none border-none shadow-[0_1px_1px_rgba(255,255,255,0.6)] w-full"
                  type="text"
                  id="phone"
                  name="phoneNo"
                  placeholder="Enter phone number"
                  {...register("phoneNo", {
                    required: true,
                    maxLength: 10,
                    minLength: 8,
                  })}
                />
              </div>
            </div>
            {errors.phoneNo && (
              <span className="text-pink-500">Please enter valid phone no</span>
            )}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2 text-start">
            <label htmlFor="message">Message</label>
            <textarea
              className="px-3 py-3 bg-richblack-700 rounded-md outline-none border-none shadow-[0_1px_1px_rgba(255,255,255,0.6)] w-full resize-none"
              type="text"
              id="message"
              cols={30}
              rows={7}
              name="message"
              placeholder="Enter message"
              {...register("message", { required: true })}
            />
            {errors.message && (
              <span className="text-pink-500">Please enter your message</span>
            )}
          </div>

          <button
            type="submit"
            className={`text-center w-full text-lg py-3 rounded-md font-medium capitalize bg-yellow-50 text-black`}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
