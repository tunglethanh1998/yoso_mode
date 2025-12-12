"use client";
import { NewsType } from "@/data/News";
import { ROUTE } from "@/libs/enum";
import { cn } from "@/libs/function";
import dayjs from "dayjs";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type NewsItemProps = {
  data?: NewsType;
  isColumnTab?: boolean;
};

export const NewsItem = (props: NewsItemProps) => {
  const params = useSearchParams();
  const pathName = usePathname();

  const { isColumnTab = false } = props;
  const {
    startDateTime,
    type = "",
    isNew,
    title,
    link,
    thumbnail,
    id = "",
    hasContent,
  } = props.data || {};

  const renderView = () => {
    if (isColumnTab) {
      return (
        <div className="grid grid-cols-[8.3125rem,1fr] md:grid-cols-[13.9375rem,1fr] gap-x-4 md:gap-x-8 items-center">
          <div className="w-full md:w-[13.938rem] h-25 md:h-35 border-2 border-black overflow-hidden">
            <img
              src={thumbnail?.url ?? ""}
              alt={thumbnail?.alt ?? "Column News"}
              className="column-img w-full h-25 md:h-35 object-cover"
            />
          </div>
          <div className="content grid md:gap-y-4">
            <div className="relative">
              <div
                className={cn(
                  "absolute top-0 left-0 invisible w-fit md:order-1 text-[0.9375rem] leading-[1.4] md:text-[1rem] font-medium md:leading-[1.6] underline"
                )}
              >
                {title}
              </div>
              <div className="relative w-fit md:order-1 text-[0.9375rem] leading-[1.4] md:text-[1rem] font-medium md:leading-[1.6] underline"></div>
            </div>
            <div className="flex mt-3.5 md:mt-0 items-center space-x-2.5">
              <div className="font-medium text-[0.75rem] md:text-[0.875rem] leading text-gray-2">
                {dayjs(startDateTime).locale("ja").format("YYYY.MM.DD HH:mm")}
              </div>
              {isNew && (
                <div className="min-h-4.75 min-w-10.5 md:min-w-11 text-center px-1.75 border border-primary-red ml-1 flex justify-center items-center">
                  <span className="font-normal text-[0.6875rem] leading text-primary-red ">
                    New!
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="flex items-center">
          <div className="font-medium text-14 md:text-14 md:min-w-18.5 text-gray-2 leading-4">
            {dayjs(startDateTime).locale("ja").format("YYYY.MM.DD HH:mm")}
          </div>
          {isNew && (
            <div className="min-h-4.75 min-w-10.5 md:min-w-11 text-center px-1.75 border border-primary-red ml-1 flex justify-center items-center">
              <span className="font-normal text-10 leading-4 text-primary-red ">
                New!
              </span>
            </div>
          )}
        </div>
        <div className="relative">
          <div
            className={cn(
              "absolute top-0 left-0 invisible w-fit underline underline-offset-2 leading-4 text-14 md:text-14 md:leading-4 font-medium"
            )}
          >
            {title}
          </div>
          <div className="w-fit underline underline-offset-2 leading-4 text-14 md:text-14 md:leading-4 font-medium mt-2.5 md:mt-2.5">
            <div className="flex items-center gap-x-1">
              <div className="">{title}</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const isHome = pathName === ROUTE.HOME;
  const prevUrl = isHome ? pathName : `${pathName}?${params.toString()}`;

  const isTargetExternal = !hasContent && !!link;

  return (
    <Link
      href="#"
      scroll={true}
      rel="noopener noreferrer"
      target={isTargetExternal ? "_blank" : "_self"}
      className={cn("md:cursor-pointer", {
        "md:hover:opacity-50 transition-all duration-300": !isColumnTab,
        "md:[&_.content]:hover:opacity-50 md:[&_.content]:transition-all md:[&_.content]:duration-300 md:[&_.column-img]:transition-transform md:[&_.column-img]:duration-300 md:[&_.column-img]:ease-in-out md:[&_.column-img]:hover:scale-[1.2]":
          isColumnTab,
      })}
    >
      {renderView()}
    </Link>
  );
};
