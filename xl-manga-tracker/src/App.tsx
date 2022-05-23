import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/HomePage";
import ReadingList from "./pages/ReadingList";
import SearchPage from "./pages/SearchPage";
import SearchContext from "./context/search-context";
import { useState } from "react";

function App() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  return (
    <>
      <SearchContext.Provider value={{ searchResults, setSearchResults }}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/my-list" element={<ReadingList />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </SearchContext.Provider>
    </>
  );
}

export default App;
