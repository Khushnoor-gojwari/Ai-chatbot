import React, { useState, useEffect } from 'react';
import Header from './Header';
import Mid from './Mid';
import DataTable from './DataTable';
import SearchBar from './SearchBar';

const FunctionApp = () => {
  const [datasets, setDatasets] = useState(
    JSON.parse(localStorage.getItem('datasets')) || []
  );
  const [activeSection, setActiveSection] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Validate and update datasets on component mount
  useEffect(() => {
    const savedDatasets = JSON.parse(localStorage.getItem('datasets')) || [];
    const updatedDatasets = savedDatasets.map((dataset) => {
      if (isNaN(new Date(dataset.lastModified).getTime())) {
        dataset.lastModified = new Date().toISOString(); // Default to current date if invalid
      }
      return dataset;
    });
    setDatasets(updatedDatasets);
    localStorage.setItem('datasets', JSON.stringify(updatedDatasets));
  }, []);

  const handleAddDataset = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv, .json'; // Accept only CSV or JSON files

    fileInput.onchange = (e) => {
      const file = e.target.files[0]; // Get the selected file
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            let data;
            // Check file type (JSON or CSV)
            if (file.type === 'application/json' || file.name.endsWith('.json')) {
              data = JSON.parse(reader.result);
            } else if (
              file.type === 'text/csv' ||
              file.name.endsWith('.csv') ||
              !file.type
            ) {
              const rows = reader.result.split('\n').filter((row) => row.trim());
              const headers = rows[0].split(',');
              data = rows.slice(1).map((row) => {
                const values = row.split(',');
                return headers.reduce((obj, header, index) => {
                  obj[header.trim()] = values[index]?.trim();
                  return obj;
                }, {});
              });
            } else {
              throw new Error('Unsupported file format');
            }

            const newDataset = {
              name: file.name || 'Untitled Dataset',
              createdBy: 'User',
              lastModified: new Date().toISOString(), // Store as ISO format
              type: file.type || 'unknown',
              source: file.name || 'No Name',
              rows: data.length || 0,
              features: Object.keys(data[0] || {}).length || 0,
              size: (file.size / 1024).toFixed(2),
            };

            const updatedDatasets = [...datasets, newDataset];
            setDatasets(updatedDatasets);
            localStorage.setItem('datasets', JSON.stringify(updatedDatasets)); // Save datasets to localStorage
          } catch (err) {
            console.error('Error processing file:', err);
            alert('Failed to load the dataset. Ensure it is a valid CSV or JSON file.');
          }
        };
        reader.readAsText(file); // Read the file content
      }
    };

    fileInput.click(); // Trigger file input click
  };

  const handleSectionClick = (sectionName) => {
    setActiveSection(sectionName);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleRemoveDataset = (index) => {
    const updatedDatasets = datasets.filter((_, i) => i !== index); // Remove dataset at index
    setDatasets(updatedDatasets);
    localStorage.setItem('datasets', JSON.stringify(updatedDatasets)); // Update localStorage
  };

  // Filter datasets based on the search query
  const filteredDatasets = datasets.filter((dataset) =>
    dataset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
      <Header onAdd={handleAddDataset} />
      <Mid
        onSectionClick={handleSectionClick}
        datasetCount={datasets.length} // Pass dataset count as a prop
      />
      <SearchBar onSearch={handleSearch} />

      {activeSection === 'Data' && (
        <DataTable
          datasets={filteredDatasets}
          onRemoveDataset={handleRemoveDataset}
        />
      )}
    </div>
  );
};

export default FunctionApp;
