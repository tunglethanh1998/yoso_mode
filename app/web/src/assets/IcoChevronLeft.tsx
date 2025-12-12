import { HTMLAttributes } from "react";

export const IcoChevronLeft = ({
  width = "17",
  height = "14",
  ...props
}: HTMLAttributes<SVGElement> & { width?: string; height?: string }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 17 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.483 0H17L9.52948 7L17 14H13.483L6 7L13.483 0Z"
      fill="currentColor"
    />
    <path
      d="M7.48299 0H11L3.52948 7L11 14H7.48299L0 7L7.48299 0Z"
      fill="currentColor"
    />
  </svg>
);
