import './App.css';
import BarGraph from './components/common/SpendingBarGraph';
import useCustomRoutes from "./routes";
import { useRoutes } from "react-router-dom";

function App() {
  const routes = useCustomRoutes();
  const routing = useRoutes(routes);

  return (
    <div>{routing}</div>
  );
}

export default App;
