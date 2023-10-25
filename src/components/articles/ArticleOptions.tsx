import { useEffect, useState } from "react";
import { getSports } from "../../utils/api";
import { useArticleListState } from "../../context/articles/context";
import { ArticleListState, Sport } from "../../context/articles/types";
import ArticleCard from "./ArticleCard";
import LoadingSpinner from "../LoadingSpinner";

export default function ArticleOptions() {
  const articleListState: ArticleListState = useArticleListState();
  const [sportsList, setSportsList] = useState<Sport[]>([]);
  const [selectedSport, setSelectedSport] = useState(-1);
  const [yourNews, setYourNews] = useState(true);

  useEffect(() => {
    const fetchSports = async () => {
      const data = await getSports();
      setSportsList(data.sports);
    };
    fetchSports();
  }, []);

  if (articleListState.isLoading) {
    return <LoadingSpinner />;
  }

  if (articleListState.isError) {
    return (
      <div className="text-center">
        <span>{articleListState.errorMessage}</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex space-x-1 p-1">
        <button
          className={
            yourNews
              ? "flex border border-gray-400 rounded-lg p-2.5 my-3 text-sm font-medium leading-5 bg-teal-400 text-gray-700"
              : "bg-white-400 border border-teal-400 rounded-lg p-2.5 my-3 text-sm font-medium text-gray-700"
          }
          onClick={() => {
            setSelectedSport(-1), setYourNews(true);
          }}
        >
          Your news
        </button>
        {sportsList.map((sports, index) => (
          <button
            key={sports.id}
            className={
              selectedSport === index
                ? "flex border border-gray-400 rounded-lg p-2.5 my-3 text-sm font-medium leading-5 bg-teal-400 text-gray-700"
                : "bg-white-400 border border-teal-400 rounded-lg p-2.5 my-3 text-sm font-medium text-gray-700"
            }
            onClick={() => {
              setSelectedSport(index), setYourNews(false);
            }}
          >
            {sports.name}
          </button>
        ))}
      </div>
      <div className="mt-2">
        {sportsList.map((sports, index) =>
          yourNews ? (
            <div key={sports.id}>
              <div className="flex flex-col gap-3">
                {articleListState.articles.map((article) => (
                  <ArticleCard key={article.id} {...article} />
                ))}
              </div>
            </div>
          ) : (
            <div
              key={sports.id}
              style={{ display: selectedSport === index ? "block" : "none" }}
            >
              <div className="flex flex-col gap-3">
                {articleListState.articles
                  .filter((article) => article.sport.id === sports.id)
                  .map((article) => (
                    <ArticleCard key={article.id} {...article} />
                  ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
