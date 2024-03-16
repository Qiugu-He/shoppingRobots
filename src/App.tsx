import React, { useState, useEffect } from "react";
import logo from "./assets/robotics.png";
import robots from "./mockdata/robots.json";
import Robot from "./components/Robot";
import styles from "./App.module.css";
import ShoppingCart from "./components/ShoppingCart";

interface Props {}

interface State {
  robotGallery: any[];
  count: number;
}

const App: React.FC = (props) => {
  const [count, setCount] = useState<number>(0);
  const [robotGallery, setRobotGallery] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>()

  useEffect(() => {
    document.title = `useEffect check: Clicked ${count} times`;
    document.title = `Robots`;

  }, [count]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const responses = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        // .then(response => response.json())
        // .then(data => setRobotGallery(data))
        const data = await responses.json();
        setRobotGallery(data);
      } catch (e) {
        if(e instanceof Error) {
          setError(e.message);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <h1>Shopping Robots Online</h1>
      </div>
      {/* <span> useState check: </span>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click Me ~
      </button>
      <span> count {count}</span> */}
      <ShoppingCart />
      {!loading ? (
        <div className={styles.robotList}>
          {robotGallery.map((r: { id: number; email: string; name: string; }) => (
            <Robot id={r.id} email={r.email} name={r.name} />
          ))}
        </div>
      ) : (
        <h2>loading</h2>
      )}
    </div>
  );
};

export default App;
