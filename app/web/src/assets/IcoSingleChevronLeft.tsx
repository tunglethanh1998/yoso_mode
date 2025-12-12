import { HTMLAttributes } from "react";

export const IcoSingleChevronLeft = ({
  ...props
}: HTMLAttributes<SVGElement> & { width?: string; height?: string }) => (
  <svg
    viewBox="0 0 11 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.48299 0H11L3.52948 7L11 14H7.48299L0 7L7.48299 0Z"
      fill="currentColor"
    />
  </svg>
);
