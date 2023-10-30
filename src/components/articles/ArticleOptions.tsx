import { useEffect, useState } from "react";
import { getSports } from "../../utils/api";
import { useArticleListState } from "../../context/articles/context";
import { ArticleListState, Sport } from "../../context/articles/types";
import ArticleCard from "./ArticleCard";
import LoadingSpinner from "../LoadingSpinner";
import { usePreferencesState } from "../../context/preferences/context";

export default function ArticleOptions() {
  const articleListState: ArticleListState = useArticleListState();
  const [sportsList, setSportsList] = useState<Sport[]>([]);
  const [selectedSport, setSelectedSport] = useState(-1);
  const [yourNews, setYourNews] = useState(true);
  const preferencesState = usePreferencesState();

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

  const screenedSports =
    !!localStorage.getItem("authToken") &&
    preferencesState.preferences?.sports?.length > 0
      ? sportsList.filter((sport) =>
          preferencesState.preferences.sports.includes(sport.name)
        )
      : sportsList;

  const screenedArticles = !!localStorage.getItem("authToken")
    ? preferencesState.preferences?.sports?.length === 0 &&
      preferencesState.preferences?.teams?.length === 0
      ? articleListState.articles
      : articleListState.articles.filter((article) => {
          const isSportsSelected = preferencesState.preferences.sports.includes(
            article.sport.name
          );
          const isTeamSelected =
            preferencesState.preferences.teams.length === 0 ||
            preferencesState.preferences.teams.some((team) =>
              article.teams.some((articleTeam) => articleTeam.name === team)
            );
          return isSportsSelected || isTeamSelected;
        })
    : articleListState.articles;

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
        {screenedSports.map((sports, index) => (
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
        {screenedSports.map((sports, index) =>
          yourNews ? (
            <div key={sports.id}>
              <div className="flex flex-col gap-3">
                {screenedArticles
                  .filter((article) => {
                    if (
                      preferencesState.preferences?.sports?.length === 0 &&
                      preferencesState.preferences?.teams?.length === 0
                    ) {
                      return true;
                    }
                    const isSportsSelected =
                      preferencesState.preferences.sports.includes(
                        article.sport.name
                      );
                    console.log(preferencesState.preferences.sports);
                    console.log(article.sport.name);
                    console.log(isSportsSelected);
                    const isTeamSelected =
                      preferencesState.preferences.teams.length === 0 ||
                      preferencesState.preferences.teams.some((team) =>
                        article.teams.some(
                          (articleTeam) => articleTeam.name === team
                        )
                      );
                    return isSportsSelected && isTeamSelected;
                  })
                  .map((article) => (
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
                {screenedArticles
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
