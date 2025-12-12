import { HTMLAttributes } from "react";

export const IcoSingleChevronRight = ({
  width = "17",
  height = "14",
  ...props
}: HTMLAttributes<SVGElement> & { width?: string; height?: string }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 11 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.51701 0H-1.18939e-06L7.47052 7L-4.75756e-06 14H3.51701L11 7L3.51701 0Z"
      fill="currentColor"
    />
  </svg>
);
