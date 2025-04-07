import React from 'react';
import styles from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ searchTerm, onSearch }) {
  return (
    <div className={styles.searchContainer}>
      <FaSearch className={styles.searchIcon} />
      <input
        type="text"
        placeholder="Search cities or countries..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
}

export default SearchBar;