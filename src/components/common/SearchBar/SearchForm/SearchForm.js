import React, { useState } from "react";
import "./SearchForm.scss"

const SearchForm = () => {
    const [data, setData] = useState();
    return (
        <form action="#" className="searchForm">
            <input type="submit" />
            <input
                type="search"
                placeholder="search..."
                onChange={(e) => setData({ data: e.target.value })}
            />
        </form>
    );
};

export default SearchForm;