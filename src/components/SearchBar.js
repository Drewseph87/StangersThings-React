import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CommonButtons from "./Common/CommonButtons";

const SearchBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const buttonStyles = {
    fontSize: 12,
    fontWeight: 700,
    border: "1px solid white",
    backgroundColor: "red",
    color: "black",
    "&:hover": {
      backgroundColor: "blue",
    },
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const query = encodeURIComponent(searchTerm);
    navigate(`/search?term=${query}`);
  };

  const isPostsPage =
    location.pathname === "/" || location.pathname === "/search";

  return (
    <div>
      {isPostsPage && (
        <div id="searchbartop">
          <input
            type="text"
            name="Search"
            placeholder="Search..."
            style={{
              backgroundColor: "black",
              color: "white",
              border: "1px solid white",
            }}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <CommonButtons
            variant="contained"
            sx={buttonStyles}
            onClick={handleSearch}
          >
            Search
          </CommonButtons>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
