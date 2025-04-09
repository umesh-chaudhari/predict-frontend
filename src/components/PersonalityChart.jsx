import { useState } from "react";
import { Radar } from "react-chartjs-2";

function PersonalityChart({ userValues }) {
  const [showIdeal, setShowIdeal] = useState(true);
  const [showTrauma, setShowTrauma] = useState(true);
  const [showThreshold, setShowThreshold] = useState(true);

  const traitNames = [
    "Emotional Stability",
    "Mental Energy or Will Power",
    "Modesty",
    "Personal Harmony and Flexibility",
    "Discipline",
    "Concentration",
    "Communicativeness",
    "Social Isolation"
  ];

  const idealPerson = [90, 85, 80, 85, 90, 88, 85, 30];
  const traumaPerson = [30, 40, 20, 35, 25, 30, 20, 85];
  const threshold = [60, 60, 60, 60, 60, 60, 60, 60];

  const datasets = [
    {
      label: 'User Personality',
      data: userValues,
      backgroundColor: 'rgba(0, 91, 255, 0.1)', // 🔵 Blue
      borderColor: 'rgba(0, 91, 255, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(0, 91, 255, 1)',
    },
    showIdeal && {
      label: 'Ideal Personality',
      data: idealPerson,
      backgroundColor: 'rgba(0, 200, 0, 0.1)', // 🟢 Green
      borderColor: 'rgba(0, 200, 0, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(0, 200, 0, 1)',
    },
    showTrauma && {
      label: 'Traumatized Personality',
      data: traumaPerson,
      backgroundColor: 'rgba(200, 0, 0, 0.1)', // 🔴 Red
      borderColor: 'rgba(200, 0, 0, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(200, 0, 0, 1)',
    },
    showThreshold && {
      label: "Balanced Threshold",
      data: threshold,
      borderColor: "rgba(128, 128, 128, 0.7)", // Gray
      borderWidth: 2,
      borderDash: [5, 5], // Dotted line
      pointRadius: 0,
      fill: false,
    }
  ].filter(Boolean); // Removes false values

  const data = { labels: traitNames, datasets };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 100,
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
        pointLabels: { color: '#000', font: { size: 14 } },
      },
    },
    plugins: {
      legend: { labels: { color: '#000' } },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const descriptions = [
              "Emotional Stability: Resilience against stress.",
              "Mental Energy: Motivation and drive.",
              "Modesty: Humility and ego balance.",
              "Personal Harmony: Adaptability in relationships.",
              "Discipline: Self-control and work ethic.",
              "Concentration: Focus and attention span.",
              "Communicativeness: Social skills and expression.",
              "Social Isolation: Preference for solitude."
            ];
            return `${descriptions[tooltipItem.dataIndex]} - ${tooltipItem.raw}%`;
          }
        }
      }
    }
  };

  return (
    <div className="w-1/2 gap-5 m-2">
      <div className="flex gap-3 m-4 justify-center">
        <button
          className={`btn ${showIdeal ? "btn-success" : "btn-outline"} text-white`}
          onClick={() => setShowIdeal(!showIdeal)}
        >
          Toggle Ideal Personality
        </button>
        <button
          className={`btn ${showTrauma ? "btn-error" : "btn-outline"} text-white`}
          onClick={() => setShowTrauma(!showTrauma)}
        >
          Toggle Trauma Personality
        </button>
        <button
          className={`btn ${showThreshold ? "btn-gray" : "btn-outline"}`}
          onClick={() => setShowThreshold(!showThreshold)}
        >
          Toggle Threshold
        </button>
      </div>

      <Radar data={data} options={options} />
    </div>
  );
}

export default PersonalityChart;
