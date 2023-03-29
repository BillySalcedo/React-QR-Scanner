import "../css/main_parent_2.css";
import office from "../assets/office.svg";
import check from "../assets/timein.svg";
import timeout from "../assets/timeout.svg";
import { useState, useRef, useEffect } from "react";
import QrScanner from "qr-scanner";

function Main_2() {
  const [mouseHover, setHovered] = useState(false);
  const [timeInClicked, setTimeInClicked] = useState(false);
  const [timeOutClicked, setTimeOutClicked] = useState(false);
  const [scanner, setScanner] = useState<QrScanner | null>(null);
  const [decodedResult, setDecodedResult] = useState<string | false>();
  const [showCamera, setShowCamera] = useState(false);
  const [showCameraOut, setshowCameraOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if ((showCamera || showCameraOut) && videoRef.current) {
      const qrScanner = new QrScanner(videoRef.current, (result) => {
        setDecodedResult([result, formattedDate, formattedTime].join(": "));
      });
      setScanner(qrScanner);
    }
  }, [showCamera, showCameraOut]);

  useEffect(() => {
    scanner?.start();
    return () => {
      scanner?.stop();
    };
  }, [scanner]);

  const handleTimeinButtonClick = (timeIn: boolean) => {
    setTimeInClicked(timeIn);
    setTimeOutClicked(!timeIn);
    setShowCamera(true);
    setshowCameraOut(false);
    setDecodedResult(false);
  };

  const handleTimeOutButtonClick = (timeIn: boolean) => {
    setTimeInClicked(timeIn);
    setTimeOutClicked(!timeIn);
    setShowCamera(false);
    setshowCameraOut(true);
    setDecodedResult(false);
  };

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  const formattedDate = currentTime.toLocaleDateString([], {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const handleHover = () => setHovered(true);
  const handleLeave = () => setHovered(false);

  return (
    <div className="parent3">
      <div className="section1">
        <div
          className="background-logo"
          style={{
            boxShadow:
              mouseHover || timeInClicked || timeOutClicked
                ? "0 0 10px 5px orange"
                : "",
            borderColor:
              mouseHover || timeInClicked || timeOutClicked ? "orange" : "",
          }}
        >
          <img src={office} className="logo" alt="logo" />
        </div>
        <div>
          <button
            className={timeInClicked ? "time-button-clicked" : "time-button"}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={() => handleTimeinButtonClick(true)}
          >
            TIME IN
          </button>
          <button
            className={timeOutClicked ? "time-button-clicked" : "time-button"}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={() => handleTimeOutButtonClick(false)}
          >
            TIME OUT
          </button>
        </div>
      </div>
      <div className="section2">
        <div>
          {!showCamera && !showCameraOut ? (
            <div className="camera-section">
              <div className="timein-success">
                <img src={check} alt="check logo" />

                <h1> Welcome! </h1>
                <p>This is the Attendance System for Essilor Employees</p>
                <p>Click the time in button to start!</p>
              </div>
            </div>
          ) : null}
          {showCamera ? (
            decodedResult ? (
              <div className="camera-section">
                <div className="timein-success">
                  <img src={check} alt="check logo" />

                  <h1> Successfully Time In</h1>
                  <p>
                    Hi {decodedResult.split(": ")[0]}, your time in is&nbsp;
                    <b>{decodedResult.split(": ")[2]} </b>
                  </p>
                </div>
              </div>
            ) : (
              <div className="video-section">
                <video ref={videoRef} />
              </div>
            )
          ) : null}
        </div>
        {showCameraOut ? (
          decodedResult ? (
            <div className="camera-section">
              <div className="timein-success">
                <img src={timeout} alt="check logo" />

                <h1> Successfully Time Out</h1>
                <p>
                  Hi {decodedResult.split(": ")[0]}, your time out is&nbsp;
                  <b>{decodedResult.split(": ")[2]} </b>
                </p>
              </div>
            </div>
          ) : (
            <div className="video-section">
              <video ref={videoRef} />
            </div>
          )
        ) : null}
      </div>
      <div className="section3">
        <h1 className="welcome-header"> LOGGED HISTORY</h1>
        <p>{decodedResult}</p>
      </div>
    </div>
  );
}

export default Main_2;
