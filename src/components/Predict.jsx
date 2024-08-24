import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpload} from "@fortawesome/free-solid-svg-icons";
import {Radar} from "react-chartjs-2";
import {Chart, Chart as ChartJS} from "chart.js/auto"
import AccuracyBarChart from "./AccuracyBarChart.jsx";
import ClassificationReport from "./ClassificationReport.jsx";



function Predict() {
    const inputImage = useRef();
    const [image, setImage] = useState()
    const [imageSource, setImageSource] = useState("");
    const [loading, setLoading] = useState(false);
    const [predictions, setPredictions] = useState([]);
    const [features, setFeatures] = useState([]);
    const options = {
        scales: {
            r: {
                min: 0, // Start at 0
                max: 2, // End at 2
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)', // Lighten the grid lines
                },
                angleLines: {
                    color: 'rgba(255, 255, 255, 0.2)', // Lighten the angle lines
                },
                ticks: {
                    color: '#fff', // Make the ticks white for visibility
                    stepSize: 1,
                    callback: function (value) {
                        const levels = ["Low", "Medium", "High"];
                        return levels[value];
                    },
                },
                pointLabels: {
                    color: '#fff', // Make the labels white for visibility
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: '#fff', // Make the legend text white
                },
            },
        },
    };
    const traitNames = [
        "Emotional Stability",
        "Mental Energy or Will Power",
        "Modesty",
        "Personal Harmony and Flexibility",
        "Lack of Discipline",
        "Poor Concentration",
        "Non Communicativeness",
        "Social Isolation"
    ];
    const data = {
        labels: traitNames,
        datasets: [
            {
                label: 'Personality Traits',
                data: [1, 2, 0, 1, 2, 1, 0, 2],
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Slightly transparent pink
                borderColor: 'rgba(255, 99, 132, 1)', // Solid pink
                borderWidth: 2,
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointBorderColor: '#fff',
            },
        ],
    };



    const levels = ["Good", "Better", "Best"];

    function handleImage(event) {
        setImage(event.target.files[0])
    }

    async function decode() {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', image);

        try {
            const response = await axios.post('http://localhost:5000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data)
            const { predictions, raw_features, file_path } = response.data;
            setPredictions(predictions);
            setFeatures(raw_features);
            setImageSource(`http://localhost:5000/static/${file_path}`);
            setLoading(false)
        } catch (error) {
            console.error("There was an error uploading the file!", error);
            setLoading(false)
        }
    }

    useEffect(() => {
        console.log(predictions)
    }, [predictions]);

    return (
        <div className="flex justify-between">
            <div className="w-1/2 h-[100vh] flex flex-col items-center justify-center gap-10">
                <div
                    className="border border-dashed rounded-badge w-3/4 h-2/4 flex flex-col items-center justify-center gap-5">
                    {imageSource ? (
                        <img
                            src={imageSource}
                            alt=""
                            className="w-full h-full rounded-badge"
                        />
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faUpload} className="h-14"/>
                            <p>Upload your file here...</p>
                        </>
                    )}
                </div>


                <input
                    ref={inputImage}
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered file-input-info w-full max-w-xs"
                    onChange={handleImage}
                />
                <button className="btn btn-primary" onClick={decode}>
                    Decode my Personality
                </button>

            </div>

            <div className="w-1/2 h-[100vh] flex flex-col items-center justify-center">
                {loading ? (
                    <button className="btn loading">
                        <span className="loading loading-spinner"></span>
                        Loading
                    </button>
                ) : (
                  // <Radar data={data} options={options} />
                  //   <ClassificationReport />
                    <></>
                )}

            </div>
        </div>
    );
}

export default Predict