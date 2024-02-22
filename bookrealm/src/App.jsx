import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        {/* <Route path="/"/> */}
        {/* <Route path="/"/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
