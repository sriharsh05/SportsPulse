import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { MatchListProvider } from "./context/liveMatches/context";
import { ArticleListProvider } from "./context/articles/context";

function App() {

  return (
    <MatchListProvider>
    <ArticleListProvider>
      <RouterProvider router={router} />
    </ArticleListProvider>
  </MatchListProvider>
  );
}

export default App
