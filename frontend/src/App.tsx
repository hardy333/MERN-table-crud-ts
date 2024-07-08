import "./App.css";
import Providers from "./providers/Providers";
import RoutesComponent from "./routes/Index";

export type Table = {
  name: string;
  _id: string;
  data: object[];
};

function App() {
  return (
    <>
      <Providers>
        <RoutesComponent />
      </Providers>
    </>
  );
}

export default App;
