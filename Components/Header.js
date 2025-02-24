// import React from 'react';
// import './Header.css';

// const Header = ({ onAdd }) => {
//   return (
//     <div>
//       {/* Top Bar */}
//       <div className="top-bar">
//         <div className="top-bar-content">
//           <span className="icon-before"></span>
//           <span className="top-bar-text">
//             <span className="data-text">DEFCON</span>{' '}
//             <span className="robot-text">AI</span> | WORKBENCH
//             <span className="icon-after"></span> {/* Icon after text */}
//           </span>
//           <span className="Medium-text">Workbench directory /</span>
//           <span className="small-text">Flight Delays Video</span>
//           <span className="icon-last"></span> {/* Icon after text */}
//         </div>
//       </div>

//       {/* Main Header */}
//       <div className="header">
//         <div className="header-left">
//           <h2 className="header-subtitle">Use Case</h2>
//           <h1 className="header-title">Flight Delays Video</h1>
//         </div>
//         <button className="add-button" onClick={onAdd}>
//           ADD
//           <span className="icon-arrow-down"></span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Header;


import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = ({ onAdd }) => {
  return (
    <div>
      {/* Top Bar */}
      <div className="bg-dark text-white py-2 px-3 d-flex align-items-center flex-wrap"
           style={{ height: "100px", width: "100%", overflowX: "auto" }}>
        <span className="icon-before me-2"></span>
        <span className="fw-bold fs-5 d-flex align-items-center">
          <span className="text-white">DEFCON</span>{' '}
          <span className="text-primary">AI</span> | WORKBENCH
          <span className="icon-after ms-2"></span>
        </span>
        <span className="ms-3 text-secondary fw-bold">Workbench directory /</span>
        <span className="ms-1 text-white">Flight Delays Video</span>
        <span className="icon-last ms-auto"></span>
      </div>

      {/* Main Header */}
      <div className="header bg-black text-white d-flex justify-content-between align-items-center p-3 flex-wrap">
        <div>
          <h6 className="mb-0">Use Case</h6>
          <h1 className="mt-1">Flight Delays Video</h1>
        </div>
        <button className="btn btn-primary d-flex align-items-center" onClick={onAdd}>
          ADD
          <span className="icon-arrow-down ms-2"></span>
        </button>
      </div>

      {/* Inline Icons Styling */}
      <style jsx>{`
        .icon-before, .icon-after, .icon-last, .icon-arrow-down {
          display: inline-block;
          width: 18px;
          height: 18px;
          background-color: white;
          mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-alexa" viewBox="0 0 16 16"><path d="M7.996 0A8 8 0 0 0 0 8a8 8 0 0 0 6.93 7.93v-1.613a1.06 1.06 0 0 0-.717-1.008A5.6 5.6 0 0 1 2.4 7.865 5.58 5.58 0 0 1 8.054 2.4a5.6 5.6 0 0 1 5.535 5.81l-.002.046-.012.192-.005.061a5 5 0 0 1-.033.284l-.01.068c-.685 4.516-6.564 7.054-6.596 7.068A7.998 7.998 0 0 0 15.992 8 8 8 0 0 0 7.996.001Z"/></svg>') center / contain no-repeat;
        }
        .icon-arrow-down {
          mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"/></svg>') center / contain no-repeat;
        }

        @media (max-width: 768px) {
          .fw-bold {
            font-size: 1rem;
          }

          .header {
            flex-direction: column;
            text-align: center;
          }

          .icon-before, .icon-after, .icon-last, .icon-arrow-down {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;
