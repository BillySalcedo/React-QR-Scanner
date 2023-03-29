import { useEffect, useRef, useState } from "react";
import Header from "./components/header";
import Main_1 from "./components/main_parent_1";
import Main_2 from "./components/main_parent_2";
import QrScanner from "qr-scanner";
import Fetch from "./components/fetching-api";

function App() {
  const [scanner, setScanner] = useState<QrScanner | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      const qrScanner = new QrScanner(videoRef.current, (result) =>
        console.log("decoded qr code:", result)
      );
      setScanner(qrScanner);
    }
  }, [videoRef]);

  useEffect(() => {
    if (scanner) {
      scanner.start();
    }
  }, [scanner]);

  useEffect(() => {
    return () => {
      if (scanner) {
        scanner.stop();
      }
    };
  }, [scanner]);

  return (
    <div className="App">
      <div>
        <Header />
        <Main_1 />
        <Main_2 />
        {/* <Fetch /> */}
      </div>
    </div>
  );
}

export default App;
