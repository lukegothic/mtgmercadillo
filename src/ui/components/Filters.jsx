import React, { useState, useEffect, useRef } from 'react';

export default ({ filters, setFilters }) => {
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [selectTimeout, setSelectTimeout] = useState(null);
    const [lastSearch, setLastSearch] = useState(null);
    const SearchInput = useRef();
    const HandleKeydown = e => {
        if ("abcdefghijklmnopqrstuvwxyz".indexOf(e.key) > -1) {
            if (document.activeElement !== SearchInput.current) {
                SearchInput.current.focus();
                SearchInput.current.select();
            }
        } else if (e.key === "Escape") {
            SearchInput.current.value = "";
            HandleInput("");
            SearchInput.current.focus();
        }
    }
    const HandleInput = value => {
        searchTimeout && clearTimeout(searchTimeout);
        selectTimeout && clearTimeout(selectTimeout);
        const name = value.length > 2 ? value : null;
        setSearchTimeout(setTimeout(() => setFilters({ ...filters, name }), 500));
        setSelectTimeout(setTimeout(() => SearchInput.current.select(), 2500));
        setLastSearch(name);
    }
    useEffect(() => window.addEventListener("keydown", HandleKeydown), []);
    return <div className="filters">
        <input ref={SearchInput} type="search" name="searchString" placeholder="Busca cartas..." autoComplete="off" onInput={e => HandleInput(e.target.value)} />
    </div>;
}