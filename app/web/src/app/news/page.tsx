import { NewsList } from "@/components/pages/News";
import { newsCate, newsServiceInternal } from "@/data/News";
import { Metadata } from "next";

type NewsPageProps = {
  searchParams: Promise<{ type?: string; page?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "ニュース・コラム一覧 | ボートレース予想 舟拳",
    description: "舟拳ニュース・コラムの一覧をご確認いただけます。",
    openGraph: {
      title: "ニュース・コラム一覧 | ボートレース予想 舟拳",
      description: "舟拳ニュース・コラムの一覧をご確認いただけます。",
    },
    twitter: {
      title: "ニュース・コラム一覧 | ボートレース予想 舟拳",
      description: "舟拳ニュース・コラムの一覧をご確認いただけます。",
    },
  };
}

export default async function NewsPage(props: NewsPageProps) {
  const { page: urlPage, type: urlType } = await props.searchParams;

  // SSR for SEO only
  const allTabsDataStatic = await Promise.all(
    Object.values(newsCate).map((type) => {
      const limit = type === newsCate.COLUMN ? "5" : "7";
      const newsType = type === newsCate.ALL ? undefined : type;
      return newsServiceInternal.getNewsByCategory({
        page: "1",
        type: newsType,
        limit,
        selects: [
          "id",
          "title",
          "type",
          "startDateTime",
          "isNew",
          "link",
          "hasContent",
          "thumbnail",
        ],
      });
    })
  );

  return (
    <NewsList
      urlPage={urlPage}
      urlType={urlType}
      allTabsDataStatic={allTabsDataStatic}
    />
  );
}
