import "./css/App.css";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { HomePage } from "./pages/Home";

function App() {
  return (
    <div>
      <DefaultLayout>
        <HomePage />
      </DefaultLayout>
    </div>
  );
}

export default App;
