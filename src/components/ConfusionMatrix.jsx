import React from 'react';

const ConfusionMatrix = ({ matrix }) => {
    return (
        <div>
            <h3>Confusion Matrix</h3>
            <table style={{ width: '40%', color: '#fff', border: '1px solid #ccc' }}>
                <thead>
                <tr>
                    <th></th>
                    <th>Predicted 0</th>
                    <th>Predicted 1</th>
                    <th>Predicted 2</th>
                </tr>
                </thead>
                <tbody>
                {matrix.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td>Actual {rowIndex}</td>
                        {row.map((value, colIndex) => (
                            <td key={colIndex} style={{ textAlign: 'center', backgroundColor: value > 0 ? 'rgba(75, 192, 192, 0.6)' : '#333' }}>
                                {value}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ConfusionMatrix;
