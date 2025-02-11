import { useState } from "react";
import { HiCheckCircle, HiOutlineCheckCircle } from "react-icons/hi";

const Stepper = () => {
  const [activeStep, setActiveStep] = useState(1);
  const steps = [
    { id: 1, label: "Booked" },
    { id: 2, label: "Check In" },
    { id: 3, label: "Completed" },
  ];

  return (
    <ol className="flex items-center w-full text-lg font-semibold text-center text-gray-500 dark:text-gray-400 sm:text-xl mb-8">
      {steps.map((step, index) => (
        <li
          key={step.id}
          className={`flex md:w-full items-center ${
            step.id <= activeStep
              ? "text-blue-600 dark:text-blue-500"
              : "text-gray-500 dark:text-gray-400"
          } after:w-full after:h-1 after:border-b-2 after:border-gray-300 after:hidden sm:after:inline-block after:mx-8 xl:after:mx-12 dark:after:border-gray-700 ${
            index === steps.length - 1 ? "after:hidden" : ""
          }`}
        >
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            {step.id <= activeStep ? (
              <HiCheckCircle className="w-7 h-7 me-3 text-green-500" />
            ) : (
              <HiOutlineCheckCircle className="w-7 h-7 me-3 text-gray-400" />
            )}
            <span className="text-nowrap">{step.label}</span>
          </span>
        </li>
      ))}
    </ol>
  );
};

export default Stepper;
