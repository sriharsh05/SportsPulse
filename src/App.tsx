import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { MatchListProvider } from "./context/liveMatches/context";

function App() {

  return (
    <MatchListProvider>
      <RouterProvider router={router} />
    </MatchListProvider>
  );
}

export default App
