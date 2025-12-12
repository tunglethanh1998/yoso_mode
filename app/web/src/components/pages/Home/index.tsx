"use client";
import { ROUTE } from "@/libs/enum";
import { Button } from "@mui/material";
import Link from "next/link";

export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src="/static/1.webp"
        alt="Home"
        className="w-full h-full object-cover"
      />
      <img
        src="/static/2.webp"
        alt="2"
        className="w-full h-full object-cover"
      />
      <img
        src="/static/3.webp"
        alt="3"
        className="w-full h-full object-cover"
      />
      <img
        src="/static/4.webp"
        alt="4"
        className="w-full h-full object-cover"
      />
      <img
        src="/static/5.webp"
        alt="5"
        className="w-full h-full object-cover"
      />
      <img
        src="/static/6.webp"
        alt="6"
        className="w-full h-full object-cover"
      />
      <img
        src="/static/7.webp"
        alt="7"
        className="w-full h-full object-cover"
      />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <Link href={`${ROUTE.NEWS}?type=column&page=1`}>
          <Button variant="contained" color="primary">
            News Column
          </Button>
        </Link>
      </div>
    </div>
  );
};
