"use client";
import { NewsItem } from "@/components/common/NewsItem";
import { NewsTabs } from "@/components/common/NewsTabs";
import { NewsCate, newsCate, NewsResponse, newsService } from "@/data/News";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import { ROUTE } from "@/libs/enum";
import { cn, updateHistory } from "@/libs/function";
import { useEffect, useRef, useState } from "react";
import { useMounted } from "react-tweet";
import { Pagination } from "./Components/Pagination";

export const newsTabs = [
  {
    key: 0,
    label: "すべて",
  },
  {
    key: 1,
    label: (
      <>
        重要な
        <br data-media="sp" />
        お知らせ
      </>
    ),
  },
  {
    key: 2,
    label: "コラム",
  },
  {
    key: 3,
    label: (
      <>
        キャンペーン
        <br data-media="sp" />
        情報
      </>
    ),
  },
  {
    key: 4,
    label: (
      <>
        その他の
        <br data-media="sp" />
        新着情報
      </>
    ),
  },
];

type NewsListProps = {
  allTabsDataStatic: NewsResponse[];
  urlPage?: string;
  urlType?: string;
};

export const NewsList = (props: NewsListProps) => {
  const {
    urlPage = "1",
    urlType = newsCate.ALL,
    allTabsDataStatic,
  } = props || {};

  const defaultTabKey = Object.values(newsCate).indexOf(urlType as NewsCate);
  const defaultPage = parseInt(urlPage, 10);

  const [tabKey, setTabKey] = useState(defaultTabKey);
  const [page, setPage] = useState(defaultPage);

  const newType = Object.values(newsCate)[tabKey];
  const isColumn = newType === newsCate.COLUMN;

  const pageLimit = isColumn ? 5 : 7;
  const args = newType === newsCate.ALL ? undefined : newType;

  const mounted = useMounted();
  const firstRenderRef = useRef(true);
  const isFirstMount = mounted && !firstRenderRef.current;

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    }
  }, []);

  const {
    state: { data, loading },
    execute: executeNewsByCate,
    setData: setNews,
  } = useAsyncAction(newsService.getNewsByCategory);

  useEffect(() => {
    if (page.toString() === "1") {
      setNews(allTabsDataStatic[tabKey]);
    } else {
      executeNewsByCate({
        type: args,
        limit: pageLimit.toString(),
        page: page.toString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [args, page, pageLimit]);

  useEffect(() => {
    updateHistory(`${ROUTE.NEWS}?type=${newType}&page=${page}`);
  }, [newType, page]);

  const { totalPages = 1, hasNextPage, hasPrevPage } = data || {};

  return (
    <div className="bg-gray-7 pb-12.5 md:pb-25">

      <div className="mt-8 md:mt-10 px-2.5">
        <div className="md:flex md:justify-center">
          <NewsTabs
            tabs={newsTabs}
            defaultActiveKey={tabKey}
            onChange={(tabKey) => {
              setTabKey(tabKey);
              setPage(1);
            }}
          />
        </div>

        <div
          className={cn(
            "md:mx-auto mt-5 md:mt-6 bg-white border-2 border-black  md:px-12 md:py-9.5 w-full md:w-180",
            {
              "px-5.5 pt-5.5 pb-20 min-h-152 md:min-h-168":
                !isColumn,
              "px-4.5 py-5.5 min-h-161 md:min-h-257":
                isColumn,
            },
          )}
        >
          {allTabsDataStatic.map((staticData, idx) => {
            const { docs } = page.toString() === "1" ? staticData : data || {};
            const _isColumn = idx === 2;

            return (
              <div
                key={`news-list-${idx}-${tabKey}-${isFirstMount}`}
                className={cn("grid", {
                  "gap-y-8": !_isColumn,
                  "gap-y-6 md:gap-y-8": _isColumn,
                  "sr-only": idx !== tabKey,
                })}
              >
                {!loading &&
                  docs?.map((item: any) => (
                    <NewsItem
                      key={`new-list-${item.id}`}
                      data={item}
                      isColumnTab={_isColumn}
                    />
                  ))}
              </div>
            );
          })}
        </div>
      </div>
      {totalPages > 1 && (
        <div className="mt-9 md:mt-11 w-fit mx-auto">
          <Pagination
            isPrev={hasPrevPage}
            isNext={hasNextPage}
            pageCount={totalPages}
            pageRangeDisplayed={5}
            currentPage={page - 1}
            onChangePage={(page) => setPage(page + 1)}
          />
        </div>
      )}
    </div>
  );
};
