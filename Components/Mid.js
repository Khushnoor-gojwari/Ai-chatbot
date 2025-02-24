// import React from 'react';
// import './Mid.css';
// import sections from './sections'; 
// const Mid = ({ onSectionClick, datasetCount }) => {
//   return (
//     <div className="mid">
//       {sections.map((section) => (
//         <button
//           key={section.name}
//           className={`section ${section.name === 'Recents' ? 'first-section' : ''}`}
//           onClick={() => onSectionClick(section.name)}
//         >
//           <span className="icon">{section.icon}</span>
//           {section.name}
//           {section.name === 'Data' && datasetCount > 0 && (
//             <span className="row-count">({datasetCount})</span>
//           )}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Mid;


import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import sections from './sections';

const Mid = ({ onSectionClick, datasetCount }) => {
  return (
    <div className="d-flex flex-wrap p-3 bg-black text-white">
      {sections.map((section) => (
        <button
          key={section.name}
          className={`btn btn-dark me-3 mb-2 ${section.name === 'Recents' ? 'ms-1' : ''}`}
          onClick={() => onSectionClick(section.name)}
        >
          <span className="me-2">{section.icon}</span>
          {section.name}
          {section.name === 'Data' && datasetCount > 0 && (
            <span className="ms-2 text-secondary">({datasetCount})</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default Mid;
