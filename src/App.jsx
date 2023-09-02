import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import { Box } from "@mui/material";
import DetailPage from "./pages/productDetail";

function App() {
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
