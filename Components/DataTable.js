// import React, { useState } from 'react';


// const DataTable = ({ datasets, onRemoveDataset }) => {
//   const [showMenu, setShowMenu] = useState(null); // Track which menu is open
//   const [currentPage, setCurrentPage] = useState(1); // Track the current page

//   const datasetsPerPage = 4; // Number of datasets per page
//   const totalPages = Math.ceil(datasets.length / datasetsPerPage);

//   const handleMenuToggle = (index) => {
//     setShowMenu((prevIndex) => (prevIndex === index ? null : index)); // Toggle menu visibility
//   };

//   const handleRemoveDataset = (index) => {
//     onRemoveDataset(index); // Remove the dataset by index
//     setShowMenu(null); // Close the menu after removal
//   };

//   const getFullDate = (lastModified) => {
//     const lastModifiedDate = new Date(lastModified);
//     if (isNaN(lastModifiedDate.getTime())) {
//       return 'Invalid Date'; // Return default value if the date is invalid
//     }
//     return lastModifiedDate.toLocaleString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: 'numeric',
//       minute: 'numeric',
//       hour12: true,
//     });
//   };

//   const formatSize = (sizeInBytes) => {
//     const sizeInKB = sizeInBytes / 1024;
//     if (sizeInKB >= 1024) {
//       return `${(sizeInKB / 1024).toFixed(2)} MB`;
//     }
//     return `${sizeInKB.toFixed(2)} KB`;
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   const startIndex = (currentPage - 1) * datasetsPerPage;
//   const currentDatasets = datasets.slice(startIndex, startIndex + datasetsPerPage);

//   return (
//     <div style={{ overflowX: 'auto', marginTop: '20px', position: 'relative' }}>
//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th style={styles.th}>Dataset Name</th>
//             <th style={styles.th}>Created By</th>
//             <th style={styles.th}>Last Modified</th>
//             <th style={styles.th}>Type</th>
//             <th style={styles.th}>Source</th>
//             <th style={styles.th}>Rows</th>
//             <th style={styles.th}>Features</th>
//             <th style={styles.th}>Size (KB)</th>
//             <th style={{ ...styles.th, ...styles.thLast }}></th> {/* Last column without border */}
//           </tr>
//         </thead>

//         <tbody>
//           {currentDatasets.map((dataset, index) => (
//             <tr key={index} style={styles.tr}>
//               <td style={styles.td}>{dataset.name}</td>
//               <td style={styles.td}>{dataset.createdBy}</td>
//               <td style={styles.td}>{getFullDate(dataset.lastModified)}</td>
//               <td style={styles.td}>Snapshot</td> {/* Always Snapshot */}
//               <td style={styles.td}>
//                 {dataset.source === '.csv' ? 'DataRegistry' : dataset.source === '.json' ? 'Snowflake' :'DataRegistory'} 
//               </td>
//               <td style={styles.td}>{dataset.rows}</td>
//               <td style={styles.td}>{dataset.features}</td>
//               <td style={styles.td}>{formatSize(dataset.size)}</td>
//               <td style={styles.td}>
//                 <button
//                   style={styles.menuButton}
//                   onClick={() => handleMenuToggle(index)}
//                 >
//                   &#x22EE; {/* Ellipsis icon */}
//                 </button>
//                 {showMenu === index && (
//   <div
//     style={{
//       ...styles.menu,
//       top: index * 40 + 'px', // Adjust based on row height
//     }}
//   >
//     <div style={styles.menuItem}>Explore</div>
//     <div style={styles.menuItem}>Wrangle</div>
//     <div style={styles.menuItem}>Start Modeling</div>
//     <div
//       style={styles.menuItem}
//       onClick={() => handleRemoveDataset(index)}
//     >
//       Remove Dataset
//     </div>
//   </div>
// )}

//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination Buttons */}
//       <div style={styles.paginationContainer}>
//         <button
//           onClick={handlePreviousPage}
//           disabled={currentPage === 1}
//           style={styles.paginationButton}
//         >
//           &#x2190; {/* Left Arrow Icon */}
//         </button>
//         <span style={styles.pageInfo}>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//           style={styles.paginationButton}
//         >
//           &#x2192; {/* Right Arrow Icon */}
//         </button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   table: {
//     width: '96%',
//     borderCollapse: 'collapse',
//     marginBottom: '20px',
//   },
//   th: {
//     backgroundColor: '#333',
//     color: 'white',
//     padding: '10px',
//     textAlign: 'left',
//     borderRight: '1px solid #444',
//   },
//   thLast: {
//     borderRight: 'none',
//     width: '70px',
//   },
//   td: {
//     padding: '10px',
//     textAlign: 'left',
//     whiteSpace: 'nowrap',
//   },
//   tr: {
//     backgroundColor: 'black',
//     borderBottom: '1px solid #444',
//   },
//   menuButton: {
//     background: 'none',
//     border: 'none',
//     color: '#fff',
//     cursor: 'pointer',
//     fontSize: '18px',
//     padding: '0',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '24px',
//   },
//   menu: {
//     position: 'absolute',
//     backgroundColor: '#333',
//     color: '#fff',
//     borderRadius: '5px',
//     padding: '5px',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//     zIndex: '1000', // Ensure the menu is above other elements
//     whiteSpace: 'nowrap', // Prevent text wrapping
//   },
  
//   menuItem: {
//     padding: '5px',
//     cursor: 'pointer',
//     borderBottom: '1px solid #444',
//   },
//   paginationContainer: {
//     position: 'fixed',
//     bottom: '10px',
//     left: '20px', // Move pagination buttons to the left side
//     display: 'flex',
//     alignItems: 'center',
//     gap: '10px',
//   },
//   paginationButton: {
//     padding: '8px 12px',
//     backgroundColor: '#333',
//     color: '#fff',
//     border: '1px solid #444',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '18px',
//   },
//   pageInfo: {
//     color: '#fff',
//     fontSize: '14px',
//   },
// };

// export default DataTable;


import React, { useState } from 'react';

const DataTable = ({ datasets, onRemoveDataset }) => {
  const [showMenu, setShowMenu] = useState(null); // Track which menu is open
  const [currentPage, setCurrentPage] = useState(1); // Track the current page

  const datasetsPerPage = 4; // Number of datasets per page
  const totalPages = Math.ceil(datasets.length / datasetsPerPage);

  const handleMenuToggle = (index) => {
    setShowMenu((prevIndex) => (prevIndex === index ? null : index)); // Toggle menu visibility
  };

  const handleRemoveDataset = (index) => {
    onRemoveDataset(index); // Remove the dataset by index
    setShowMenu(null); // Close the menu after removal
  };

  const getFullDate = (lastModified) => {
    const lastModifiedDate = new Date(lastModified);
    if (isNaN(lastModifiedDate.getTime())) {
      return 'Invalid Date'; // Return default value if the date is invalid
    }
    return lastModifiedDate.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  const formatSize = (sizeInBytes) => {
    const sizeInKB = sizeInBytes / 1024;
    if (sizeInKB >= 1024) {
      return `${(sizeInKB / 1024).toFixed(2)} MB`;
    }
    return `${sizeInKB.toFixed(2)} KB`;
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * datasetsPerPage;
  const currentDatasets = datasets.slice(startIndex, startIndex + datasetsPerPage);

  return (
    <div style={{ marginTop: '20px', position: 'relative', overflowX: 'auto' }}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Dataset Name</th>
            <th style={styles.th}>Created By</th>
            <th style={styles.th}>Last Modified</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Source</th>
            <th style={styles.th}>Rows</th>
            <th style={styles.th}>Features</th>
            <th style={styles.th}>Size (KB)</th>
            <th style={{ ...styles.th, ...styles.thLast }}></th> {/* Last column without border */}
          </tr>
        </thead>

        <tbody>
          {currentDatasets.map((dataset, index) => (
            <tr key={index} style={styles.tr}>
              <td style={styles.td}>{dataset.name}</td>
              <td style={styles.td}>{dataset.createdBy}</td>
              <td style={styles.td}>{getFullDate(dataset.lastModified)}</td>
              <td style={styles.td}>Snapshot</td> {/* Always Snapshot */}
              <td style={styles.td}>
                {dataset.source === '.csv' ? 'DataRegistry' : dataset.source === '.json' ? 'Snowflake' :'DataRegistory'} 
              </td>
              <td style={styles.td}>{dataset.rows}</td>
              <td style={styles.td}>{dataset.features}</td>
              <td style={styles.td}>{formatSize(dataset.size)}</td>
              <td style={styles.td}>
                <button
                  style={styles.menuButton}
                  onClick={() => handleMenuToggle(index)}
                >
                  &#x22EE; {/* Ellipsis icon */}
                </button>
                {showMenu === index && (
                  <div
                    style={{
                      ...styles.menu,
                      top: `${index * 40}px`, // Adjust based on row height
                      left: 'auto', // Prevent overflow
                    }}
                  >
                    <div style={styles.menuItem}>Explore</div>
                    <div style={styles.menuItem}>Wrangle</div>
                    <div style={styles.menuItem}>Start Modeling</div>
                    <div
                      style={styles.menuItem}
                      onClick={() => handleRemoveDataset(index)}
                    >
                      Remove Dataset
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Buttons */}
      <div style={styles.paginationContainer}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          style={styles.paginationButton}
        >
          &#x2190; {/* Left Arrow Icon */}
        </button>
        <span style={styles.pageInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={styles.paginationButton}
        >
          &#x2192; {/* Right Arrow Icon */}
        </button>
      </div>
    </div>
  );
};

const styles = {
  table: {
    width: '96%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  th: {
    backgroundColor: '#333',
    color: 'white',
    padding: '10px',
    textAlign: 'left',
    borderRight: '1px solid #444',
  },
  thLast: {
    borderRight: 'none',
    width: '70px',
  },
  td: {
    padding: '10px',
    textAlign: 'left',
    whiteSpace: 'nowrap',
  },
  tr: {
    backgroundColor: 'black',
    borderBottom: '1px solid #444',
  },
  menuButton: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '18px',
    padding: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '24px',
  },
  menu: {
    position: 'absolute',
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: '5px',
    padding: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: '1000', // Ensure the menu is above other elements
    whiteSpace: 'nowrap', // Prevent text wrapping
    overflow: 'hidden', // Prevent horizontal and vertical scrollbars
  },
  menuItem: {
    padding: '5px',
    cursor: 'pointer',
    borderBottom: '1px solid #444',
  },
  paginationContainer: {
    position: 'fixed',
    bottom: '10px',
    left: '20px', // Move pagination buttons to the left side
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  paginationButton: {
    padding: '8px 12px',
    backgroundColor: '#333',
    color: '#fff',
    border: '1px solid #444',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '18px',
  },
  pageInfo: {
    color: '#fff',
    fontSize: '14px',
  },
};

export default DataTable;
