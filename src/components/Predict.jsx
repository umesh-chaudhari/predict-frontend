import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import PersonalityChart from "./PersonalityChart.jsx";

function Predict() {
    const inputImage = useRef();
    const [image, setImage] = useState();
    const [imageSource, setImageSource] = useState("");
    const [loading, setLoading] = useState(false);
    const [predictions, setPredictions] = useState([]);
    const [features, setFeatures] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [user, setUser] = useState(null);

    const handleLogin = () => {
        window.location.href = "http://localhost:5001/login";
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const options = {
        scales: {
            r: {
                min: 0,
                max: 100,
                grid: { color: "rgba(0, 0, 0, 0.1)" },
                angleLines: { color: "rgba(0, 0, 0, 0.1)" },
                pointLabels: { color: "#000", font: { size: 16 } },
            },
        },
        plugins: {
            legend: { labels: { color: "#000" } },
        },
    };

    const traitNames = [
        "Emotional Stability", "Mental Energy or Will Power", "Modesty",
        "Personal Harmony and Flexibility", "Discipline", "Concentration",
        "Communicativeness", "Social Isolation"
    ];

    const data = {
        labels: [
            "Emotional Stability",
            "Mental Energy or Will Power",
            "Modesty",
            "Personal Harmony and Flexibility",
            "Discipline",
            "Concentration",
            "Communicativeness",
            "Social Isolation"
        ],
        datasets: [
            {
                label: 'User Personality',
                data: features,  // Replace with actual user values from predictions
                backgroundColor: 'rgba(0, 91, 255, 0.1)', // 🔵 Blue
                borderColor: 'rgba(0, 91, 255, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(0, 91, 255, 1)',
            },
            {
                label: 'Ideal Personality',
                data: [90, 85, 80, 85, 90, 88, 85, 30],  // Ideal values
                backgroundColor: 'rgba(0, 200, 0, 0.1)', // 🟢 Green
                borderColor: 'rgba(0, 200, 0, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(0, 200, 0, 1)',
            },
            {
                label: 'Traumatized Personality',
                data: [30, 40, 20, 35, 25, 30, 20, 85],  // Traumatized values
                backgroundColor: 'rgba(200, 0, 0, 0.1)', // 🔴 Red
                borderColor: 'rgba(200, 0, 0, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(200, 0, 0, 1)',
            }
        ]
    };


    function handleImage(event) {
        const imagePreview = URL.createObjectURL(event.target.files[0]);
        setImageSource(imagePreview);
        setImage(event.target.files[0]);
    }

    async function decode() {
        // if (!user) {
        //     alert("Please log in with Google first!");
        //     return;
        // }

        setLoading(true);
        const formData = new FormData();
        formData.append("file", image);

        try {
            const response = await axios.post("http://localhost:5001/predict", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    //Authorization: `Bearer ${user.google_id}`, // ✅ Send user ID
                },
            });

            console.log("response data---", response.data);
            const { predictions, random_values } = response.data;
            setPredictions(predictions);
            setFeatures(random_values);
            setLoading(false);
        } catch (error) {
            console.error("Error uploading the file!", error);
            setLoading(false);
        }
    }

    return (
      <div className="flex justify-between">
          {/*<div className="absolute top-5 right-5">*/}
          {/*    {user ? (*/}
          {/*      <div>*/}
          {/*          <p>Welcome, {user.name}!</p>*/}
          {/*          <button className="btn btn-secondary" onClick={handleLogout}>*/}
          {/*              Logout*/}
          {/*          </button>*/}
          {/*      </div>*/}
          {/*    ) : (*/}
          {/*      <button className="btn btn-primary" onClick={handleLogin}>*/}
          {/*          Login with Google*/}
          {/*      </button>*/}
          {/*    )}*/}
          {/*</div>*/}
          <div className="w-1/2 h-[100vh] flex flex-col items-center justify-center gap-5">
              <div className="border border-dashed rounded-badge w-3/4 h-2/4 flex flex-col items-center justify-center gap-5">
                  {imageSource ? (
                    <img src={imageSource} alt="" className="w-full h-full rounded-badge" />
                  ) : (
                    <>
                        <FontAwesomeIcon icon={faUpload} className="h-14" />
                        <p>Upload your file here...</p>
                    </>
                  )}
              </div>
              <div className="row-auto flex gap-2">
                  <input
                    ref={inputImage}
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered file-input-info w-full max-w-xs"
                    onChange={handleImage}
                  />
                  <button className="btn btn-error text-white" onClick={() => {
                      setImageSource(null);
                      setImage(null);
                  }}>
                      Clear
                  </button>
              </div>

              <button className="btn btn-primary" onClick={decode}>
                  Decode my Personality
              </button>
              <button className="btn btn-accent" onClick={() => setToggle(!toggle)}>
                  Toggle
              </button>
          </div>

          {/*<div className="w-1/2 h-[100vh] flex flex-col items-center justify-center">
              {loading ? (
                <button className="btn loading">
                    <span className="loading loading-spinner"></span>
                    Loading
                </button>
              ) : (
                <div className="w-[900px] flex justify-center">
                    {toggle ? (
                      <Radar data={data} options={options} />
                    ) : (
                      <div>
                          <ul>
                              {traitNames.map((item, index) => (
                                <li className="text-3xl text-start flex gap-3" key={index}>
                                    {item}: <h4 className="text-3xl font-bold">{features[index]}%</h4>
                                </li>
                              ))}
                          </ul>
                      </div>
                    )}
                </div>
              )}
          </div>*/}
          <PersonalityChart userValues={features} />
      </div>
    );
}

export default Predict;
