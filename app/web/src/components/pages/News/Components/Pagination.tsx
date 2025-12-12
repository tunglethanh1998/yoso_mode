import { IcoChevronLeft } from "@/assets/IcoChevronLeft";
import { IcoChevronRight } from "@/assets/IcoChevronRight";
import { IcoSingleChevronLeft } from "@/assets/IcoSingleChevronLeft";
import { IcoSingleChevronRight } from "@/assets/IcoSingleChevronRight";
import { cn } from "@/libs/function";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";

type PaginationProps = {
  isPrev?: boolean;
  isNext?: boolean;
  currentPage: number;
  onChangePage?: (page: number) => void;
} & ReactPaginateProps;

export const Pagination = (props: PaginationProps) => {
  const {
    isNext = true,
    isPrev = true,
    currentPage,
    onChangePage,
    ...innerProps
  } = props;

  const goToFirst = () => onChangePage?.(0);
  const goToLast = () => onChangePage?.(innerProps.pageCount - 1);

  const goPrev = () => isPrev && onChangePage?.(currentPage - 1);
  const goNext = () => isNext && onChangePage?.(currentPage + 1);

  return (
    <div className="grid grid-cols-[5.5rem,10.625rem,5.5rem] md:grid-cols-[6.5rem,15.75rem,6.5rem] gap-x-2 md:gap-x-10">
      <div className="flex w-full gap-x-2 md:gap-x-3">
        <div className="relative">
          <div className="bg-black w-10 h-10 md:w-11.5 md:h-11.5 rounded-full absolute left-0 top-0.75 md:top-1"></div>
          <div
            onClick={goToFirst}
            className={cn(
              "cursor-pointer w-10 h-10 md:w-11.5 md:h-11.5 rounded-full relative border-2 border-black flex justify-center items-center transition-transform duration-300 ease-in-out md:hover:transform md:hover:translate-y-1",
              {
                "bg-white": isPrev,
                "bg-gray-2 pointer-events-none": !isPrev,
              },
            )}
          >
            <IcoChevronLeft className="w-4.25 h-3.5 md:w-5.25 md:h-4.25" />
          </div>
        </div>
        <div className="relative">
          <div className="bg-black w-10 h-10 md:w-11.5 md:h-11.5 rounded-full absolute left-0 top-0.75 md:top-1"></div>
          <div
            onClick={goPrev}
            className={cn(
              "cursor-pointer w-10 h-10 md:w-11.5 md:h-11.5 rounded-full relative border-2 border-black flex justify-center items-center transition-transform duration-300 ease-in-out md:hover:transform md:hover:translate-y-1",
              {
                "bg-white": isPrev,
                "bg-gray-2 pointer-events-none": !isPrev,
              },
            )}
          >
            <IcoSingleChevronLeft className="w-11 h-3.5 md:w-3.25 md:h-4.25" />
          </div>
        </div>
      </div>

      <div className="mt-0.75">
        <ReactPaginate
          {...innerProps}
          nextClassName="hidden"
          previousClassName="hidden"
          breakClassName="hidden"
          marginPagesDisplayed={0}
          onPageChange={(page) => onChangePage?.(page.selected)}
          forcePage={currentPage}
          containerClassName={cn(
            "flex justify-center items-center md:gap-x-2",
            {
              "[&_li:nth-child(7)]:hidden": [1, 2].includes(currentPage),
            },
          )}
          pageClassName="font-bold md:hover:opacity-50 md:hover:transition-opacity md:hover:duration-300 cursor-pointer text-[0.9375rem] md:text-[1.25rem] leading-[1] !ml-0 w-[2.125rem] h-[2.125rem] md:w-[2.75rem] md:h-[2.75rem] [&_a]:w-full [&_a]:h-full [&_a]:flex [&_a]:justify-center [&_a]:items-center"
          activeClassName="bg-yellow-gradient border-[0.125rem] border-black rounded-full md:hover:!opacity-100"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>

      <div className="flex gap-x-2 md:gap-x-3">
        <div className="relative">
          <div className="bg-black w-10 h-10 md:w-11.5 md:h-11.5 rounded-full absolute left-0 top-0.75 md:top-1"></div>
          <div
            onClick={goNext}
            className={cn(
              "cursor-pointer w-10 h-10 md:w-11.5 md:h-11.5 rounded-full relative border-2 border-black flex justify-center items-center transition-transform duration-300 ease-in-out md:hover:transform md:hover:translate-y-1",
              {
                "bg-white": isNext,
                "bg-gray-2 pointer-events-none": !isNext,
              },
            )}
          >
            <IcoSingleChevronRight className="w-11 h-11 md:w-3.25 md:h-4.25" />
          </div>
        </div>
        <div className="relative">
          <div className="bg-black w-10 h-10 md:w-11.5 md:h-11.5 rounded-full absolute left-0 top-0.75 md:top-1"></div>
          <div
            onClick={goToLast}
            className={cn(
              "cursor-pointer w-10 h-10 md:w-11.5 md:h-11.5 rounded-full relative border-2 border-black flex justify-center items-center transition-transform duration-300 ease-in-out md:hover:transform md:hover:translate-y-1",
              {
                "bg-white": isNext,
                "bg-gray-2 pointer-events-none": !isNext,
              },
            )}
          >
            <IcoChevronRight className="w-4.25 h-3.5 md:w-5.25 md:h-4.25" />
          </div>
        </div>
      </div>
    </div>
  );
};
