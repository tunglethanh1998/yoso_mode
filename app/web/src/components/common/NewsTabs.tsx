import { cn } from "@/libs/function";
import { useEffect, useState } from "react";

type Tab = {
  key: number;
  label: string | React.ReactNode;
};

type NewsTabsProps = {
  tabs: Tab[];
  defaultActiveKey?: number;
  onChange?: (key: number) => void;
};

export const NewsTabs = (props: NewsTabsProps) => {
  const { tabs, defaultActiveKey = 0, onChange } = props || {};
  const [key, setKey] = useState(defaultActiveKey);

  const handleTabClick = (tabKey: number) => {
    setKey(tabKey);
    onChange?.(tabKey);
  };

  useEffect(() => {
    if (defaultActiveKey) {
      setKey(defaultActiveKey);
    }
  }, [defaultActiveKey]);

  const groupTabs = (tabs?: Tab[]) => {
    if (!tabs?.length) return [];

    const groups = [];
    for (let i = 0; i < tabs.length; i += 3) {
      groups.push(tabs.slice(i, i + 3));
    }
    return groups;
  };

  const groupedTabs = groupTabs(tabs);

  return (
    <div className="md:flex">
      {groupedTabs.map((group, idx) => (
        <div
          key={`news-tab-group-${idx}`}
          className={cn(
            `w-fit bg-black grid grid-cols-${group.length} flex font-bold text-14 md:text-14 leading-4 [&_.td]:w-28.5 md:[&_.td]:w-42.5 [&_.td]:flex [&_.td]:justify-center [&_.td]:items-center [&_.td]:text-center [&_.td]:relative [&_.td]:min-h-11 md:[&_.td]:min-h-12 md:[&_.td]:cursor-pointer p-1 gap-1`,
            {
              "pt-0 md:pt-[2px]  md:-ml-[2px]": idx !== 0,
            },
          )}
        >
          {group.slice(0, 3).map((tab, idx) => {
            const active = tab.key === key;

            return (
              <div
                key={`news-list-tab-${idx}`}
                className={cn("td !bg-white", {
                  "md:hover:!bg-gray-5 md:transition-colors md:duration-300":
                    !active,
                  "btn-gradient-04": active,
                })}
                onClick={() => handleTabClick(tab.key)}
              >
                {active && (
                  <div className="absolute top-0 left-0 w-full h-full bg-cover"></div>
                )}
                {tab.label}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
