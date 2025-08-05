import "./App.css";
import pkg from "../package.json";
import EmailConfigurator from "./pages/EmailConfigurator";

function App() {
  return (
    <>
      <EmailConfigurator />
      <div className="version mt-10">{pkg.version}</div>
    </>
  );
}

export default App;
