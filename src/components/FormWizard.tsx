import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useAppDispatch } from "../hooks";
import { addUser } from "../features/users/userSlice";
import { v4 as uuidv4 } from "uuid";

const FormWizard: React.FC = () => {
  const methods = useForm();
  const [step, setStep] = useState(1);
  const dispatch = useAppDispatch();

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const onSubmit = (data: any) => {
    const newUser = { ...data, id: uuidv4() };
    dispatch(addUser(newUser));
    setStep(4);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="p-4 max-w-2xl mx-auto"
      >
        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 mb-8">
            <input
              {...methods.register("firstName", { required: true })}
              placeholder="First Name"
              className="input flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white dark:bg-[rgba(32,0,74,0.3)] dark:border-white/90"
            />
            <input
              {...methods.register("lastName", { required: true })}
              placeholder="Last Name"
              className="input flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white dark:bg-[rgba(32,0,74,0.3)] dark:border-white/90"
            />
            <button
              type="button"
              onClick={handleNext}
              className="btn py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500 dark:bg-transparent dark:border-[0.5px] dark:hover:bg-[#20004a]"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 mb-8">
            <input
              {...methods.register("email", { required: true })}
              placeholder="Email"
              className="input flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white dark:bg-[rgba(32,0,74,0.3)] dark:border-white/90"
            />
            <input
              {...methods.register("phone", { required: true })}
              placeholder="Phone"
              className="input flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white dark:bg-[rgba(32,0,74,0.3)] dark:border-white/90"
            />
            <button
              type="button"
              onClick={handlePrev}
              className="btn py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500 dark:bg-transparent dark:border-[0.5px] dark:hover:bg-[#20004a]"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="btn py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500 dark:bg-transparent dark:border-[0.5px] dark:hover:bg-[#20004a]"
            >
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="">
            <h3>Review Information:</h3>
            <pre>{JSON.stringify(methods.getValues(), null, 2)}</pre>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 mb-8">
              <button
                type="button"
                onClick={handlePrev}
                className="btn py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500 dark:bg-transparent dark:border-[0.5px] dark:hover:bg-[#20004a]"
              >
                Back
              </button>
              <button
                type="submit"
                className="btn py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500 dark:bg-transparent dark:border-[0.5px] dark:hover:bg-[#20004a]"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <p className="text-green-500">User Created Successfully!</p>
        )}
      </form>
    </FormProvider>
  );
};

export default FormWizard;
