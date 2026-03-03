import { LikedBooksProvider } from "./context/LikedBooksProvider";
import "./css/App.css";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { HomePage } from "./pages/Home";

function App() {
  return (
    <div>
      <DefaultLayout>
        <LikedBooksProvider>
          <HomePage />
        </LikedBooksProvider>
      </DefaultLayout>
    </div>
  );
}

export default App;
