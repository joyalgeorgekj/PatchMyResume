'use client';

import { steps } from "../StepperForm";

export default function StepperSidebar({ step }: { step: number }) {
  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
      {steps.map((s) => {
        const isActive = step === s.id;
        const isCompleted = step > s.id;

        return (
          <li key={s.id} className="ms-6 mb-10">
            <span
              className={`absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-secondary-muted ${
                isCompleted
                  ? 'bg-green-200 dark:bg-green-900'
                  : isActive
                  ? 'bg-primary text-dark'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              {isCompleted ? (
                <svg
                  className="h-3.5 w-3.5 text-green-500 dark:text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
              ) : (
                <span className="text-xs text-white font-bold">{s.id}</span>
              )}
            </span>
            <h3 className="leading-tight font-medium">{s.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{s.description}</p>
          </li>
        );
      })}
    </ol>
  );
}
