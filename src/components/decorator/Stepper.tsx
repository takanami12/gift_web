"use client";

import type { WizardStep } from "@/store/designStore";

const STEPS: Array<{ id: WizardStep; label: string }> = [
  { id: 1, label: "Loại hộp" },
  { id: 2, label: "Kích thước" },
  { id: 3, label: "Sản phẩm" },
  { id: 4, label: "Hoàn tất" },
];

interface StepperProps {
  current: WizardStep;
  onJump?: (step: WizardStep) => void;
  reachable: WizardStep;
}

export default function Stepper({ current, onJump, reachable }: StepperProps) {
  return (
    <nav
      aria-label="Tiến trình thiết kế"
      className="flex items-center gap-1 sm:gap-2"
    >
      {STEPS.map((step, idx) => {
        const isDone = step.id < current;
        const isActive = step.id === current;
        const isReachable = step.id <= reachable;
        const next = STEPS[idx + 1];
        return (
          <div key={step.id} className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => isReachable && onJump?.(step.id)}
              disabled={!isReachable}
              aria-current={isActive ? "step" : undefined}
              aria-label={`${step.label} - Bước ${step.id}`}
              className={`group flex items-center gap-2 rounded-full px-1 py-1 transition ${
                isReachable ? "cursor-pointer" : "cursor-not-allowed opacity-50"
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold shadow-sm transition ${
                  isDone
                    ? "bg-emerald-100 text-emerald-700 ring-2 ring-emerald-200"
                    : isActive
                      ? "bg-orange-500 text-white ring-4 ring-orange-100"
                      : "bg-stone-100 text-stone-400 ring-1 ring-stone-200"
                }`}
              >
                {isDone ? (
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M3 8.5L6.5 12L13 4.5"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  step.id
                )}
              </span>
              <span
                className={`hidden text-xs font-semibold sm:inline ${
                  isActive ? "text-orange-600" : isDone ? "text-emerald-700" : "text-stone-400"
                }`}
              >
                {step.label}
              </span>
            </button>
            {next && (
              <span
                aria-hidden
                className={`block h-[2px] w-8 sm:w-12 ${
                  step.id < current ? "bg-emerald-300" : "bg-stone-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
