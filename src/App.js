import { useEffect, useState } from "react";
import "./sass/main.scss";
import Map from "./components/Map";
import Header from "./components/Header";
import Modal from "./components/Modal";

function App() {
  const [category, setCategory] = useState(1);
  const [modal, setModal] = useState({});
  const [userPos, setUserPos] = useState([]);
  const getPosition = async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition((e) =>
        setUserPos([e.coords.latitude, e.coords.longitude])
      );
    } catch {}
  };
  useEffect(() => {
    getPosition();
  }, []);
  return (
    <>
      <Header setCategory={setCategory} />
      <Map
        userPos={userPos}
        setModal={setModal}
        category={category}
        modal={modal}
      />
      <Modal setModal={setModal} modal={modal} />
    </>
  );
}

export default App;
