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
    const [toggle, setToggle] = useState(false)
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
                    color: '#000506', // Make the ticks white for visibility
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
                data:predictions,
                backgroundColor: 'rgba(0, 181, 255, 0.1)', // Slightly transparent pink
                borderColor: 'rgba(0, 181, 255, 0.5)', // Solid pink
                borderWidth: 2,
                pointBackgroundColor: 'rgba(0, 181, 255, 1)',
                pointBorderColor: '#fff',
            },
        ],
    };



    const levels = ["Good", "Better", "Best"];

    function handleImage(event) {
        const imagePreview = URL.createObjectURL(event.target.files[0])
        setImageSource(imagePreview)
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
            console.log("response data---",response.data[1])
            setPredictions(response.data[0]);
            setFeatures(response.data[1]);
            console.log("")
            // setImageSource(`http://localhost:5000/static/${file_path}`);
            setLoading(false)
        } catch (error) {
            console.error("There was an error uploading the file!", error);
            setLoading(false)
        }
    }



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
                <button className="btn btn-accent" onClick={() => {
                    setToggle(!toggle)
                }}>Toggle</button>

            </div>

            <div className="w-1/2 h-[100vh] flex flex-col items-center justify-center">
                {loading ? (
                    <button className="btn loading">
                        <span className="loading loading-spinner"></span>
                        Loading
                    </button>
                ) : (
                    <div className="w-[900px] flex justify-center">
                        {toggle?(
                        <Radar data={data} options={options} />
                            ):(
                            <div>
                                <ul>
                                    {traitNames.map((item, index) => (
                                        <li className="text-3xl text-start flex gap-3" key={index}>{item}:<h4 className="text-3xl font-bold">{levels[predictions[index]]}</h4></li>
                                    ))
                                    }
                                </ul>
                            </div>
                        )
                        }

                    </div>

                )}
            </div>
        </div>
    );
}

export default Predict