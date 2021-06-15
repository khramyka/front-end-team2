import React, { useState } from "react";
import "./SearchForm.scss"
import { Search } from "@material-ui/icons";

const SearchForm = () => {
    const [data, setData] = useState();
    return (
        <form action="#" className="searchForm">
            <button type="submit"> <Search/> </button>
            <input
                type="search"
                placeholder="search..."
                onChange={(e) => setData({ data: e.target.value })}
            />
        </form>
    );
};

export default SearchForm;