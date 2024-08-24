import React, {useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const data = {
    "Emotional Stability": {
        "accuracy": 1.0,
        "classification_report": {
            "0.0": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 169},
            "1.0": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 38},
            "2.0": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 253},
            "accuracy": 1.00,
            "macro_avg": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 460},
            "weighted_avg": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 460}
        },
        "confusion_matrix": [
            [169, 0, 0],
            [0, 38, 0],
            [0, 0, 253]
        ]
    },
    "Lack of Discipline": {
        "accuracy": 1.0,
        "classification_report": {
            "0.0": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 42},
            "1.0": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 397},
            "2.0": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 21},
            "accuracy": 1.00,
            "macro_avg": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 460},
            "weighted_avg": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 460}
        },
        "confusion_matrix": [
            [42, 0, 0],
            [0, 397, 0],
            [0, 0, 21]
        ]
    },
    "Mental Energy or Will Power": {
        "accuracy": 1.0,
        "classification_report": {
            "0.0": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 40},
            "1.0": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 185},
            "2.0": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 235},
            "accuracy": 1.00,
            "macro_avg": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 460},
            "weighted_avg": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 460}
        },
        "confusion_matrix": [
            [40, 0, 0],
            [0, 185, 0],
            [0, 0, 235]
        ]
    },
    "Modesty": {
        "accuracy": 1.0,
        "classification_report": {
            "0.0": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 138},
            "1.0": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 315},
            "2.0": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 7},
            "accuracy": 1.00,
            "macro_avg": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 460},
            "weighted_avg": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 460}
        },
        "confusion_matrix": [
            [138, 0, 0],
            [0, 315, 0],
            [0, 0, 7]
        ]
    },
    "Non Communicativeness": {
        "accuracy": 1.0,
        "classification_report": {
            "0.0": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 280},
            "1.0": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 151},
            "2.0": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 29},
            "accuracy": 1.00,
            "macro_avg": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 460},
            "weighted_avg": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 460}
        },
        "confusion_matrix": [
            [280, 0, 0],
            [0, 151, 0],
            [0, 0, 29]
        ]
    },
    "Personal Harmony and Flexibility": {
        "accuracy": 1.0,
        "classification_report": {
            "0.0": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 188},
            "1.0": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 175},
            "2.0": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 97},
            "accuracy": 1.00,
            "macro_avg": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 460},
            "weighted_avg": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 460}
        },
        "confusion_matrix": [
            [188, 0, 0],
            [0, 175, 0],
            [0, 0, 97]
        ]
    },
    "Poor Concentration": {
        "accuracy": 1.0,
        "classification_report": {
            "0.0": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 250},
            "1.0": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 185},
            "2.0": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 25},
            "accuracy": 1.00,
            "macro_avg": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 460},
            "weighted_avg": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 460}
        },
        "confusion_matrix": [
            [250, 0, 0],
            [0, 185, 0],
            [0, 0, 25]
        ]
    },
    "Social Isolation": {
        "accuracy": 1.0,
        "classification_report": {
            "0.0": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 232},
            "1.0": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 23},
            "2.0": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 205},
            "accuracy": 1.00,
            "macro_avg": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 460},
            "weighted_avg": {"precision": 1.00, "recall": 1.00, "f1-score": 1.00, "support": 460}
        },
        "confusion_matrix": [
            [232, 0, 0],
            [0, 23, 0],
            [0, 0, 205]
        ]
    }
}
const AccuracyBarChart = () => {

    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                label: 'Accuracy',
                data: Object.values(data).map(item => item.accuracy),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Model Accuracy by Trait',
            },
        },
    };

    return <Bar width="200px" height="200px" data={chartData} options={options} />;
};

export default AccuracyBarChart;

