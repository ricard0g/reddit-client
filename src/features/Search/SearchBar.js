import { useDispatch } from "react-redux";
import { setSearchTerm } from "./searchSlice";
import { useCallback, useState } from "react";
import styles from "../../styles/SearchBar/SearchBar.module.css";
import searchIcon from "../../assets/search-icon.svg";

function SearchBar() {
    const [searchInput, setSearchInput] = useState('');
    const dispatch = useDispatch();

    const handleChange = useCallback((event) => {
        setSearchInput(event.target.value);
    }, []);

    const handleSearch = useCallback(() => {
        dispatch(setSearchTerm(searchInput));
    }, [searchInput, dispatch]);

    return (
        <div className={styles.searchBarContainer}>
            <input type="text" value={searchInput} onChange={handleChange} className={styles.searchInput} placeholder="Search..."/>
            <button onClick={handleSearch} className={styles.searchButton}><img src={searchIcon} alt="Search Icon" className={styles.searchIcon}/></button>
        </div>
    );
}

export {SearchBar};