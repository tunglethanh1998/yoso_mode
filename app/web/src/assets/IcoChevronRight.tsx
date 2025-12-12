import { HTMLAttributes } from "react";

export const IcoChevronRight = ({
  className = "w-[1.0625rem] h-[0.9375rem] md:w-[1.25rem] md:h-[1.125rem]",
  ...props
}: HTMLAttributes<SVGElement> & {
  className?: string;
}) => (
  <svg
    viewBox="0 0 20 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M4.13763 0H-1.39927e-06L8.7888 8.5L-5.59709e-06 17H4.13763L12.9411 8.5L4.13763 0Z"
      fill="currentColor"
    />
    <path
      d="M11.1965 0H7.05884L15.8476 8.5L7.05883 17H11.1965L19.9999 8.5L11.1965 0Z"
      fill="currentColor"
    />
  </svg>
);
