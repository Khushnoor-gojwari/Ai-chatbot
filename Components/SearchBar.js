import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <div style={styles.container}>
      {/* Search Bar */}
      <div style={styles.searchWrapper}>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search ..."
          style={styles.searchInput}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Settings Icon on the Right */}
      <div style={styles.settingsWrapper}>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
          <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
        </svg>
        <span style={styles.settingsText}>Settings</span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '20px 10px 15px 20px',
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    padding: '5px',
    width: '100px',
    borderRadius: '0 5px 5px 0',
    fontSize: '16px',
    color: 'white',
    background: 'black',
    border: '1px solid #ddd',
  },
  settingsWrapper: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  settingsText: {
    marginRight: '16px', // Right margin for Settings text
    marginLeft:'3px',
    fontSize: '26px',
    color: 'white',
  },
};

export default SearchBar;
