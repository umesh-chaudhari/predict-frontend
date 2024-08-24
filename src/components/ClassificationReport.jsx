import React from 'react';

const ClassificationReport = ({ report }) => {
    return (
        <div>
            <h3>Classification Report</h3>
            <pre style={{ color: '#fff', backgroundColor: '#333', padding: '10px', borderRadius: '5px' }}>
        {report}
      </pre>
        </div>
    );
};

export default ClassificationReport;
