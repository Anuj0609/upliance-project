import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const storedCount = localStorage.getItem("counter");
    if (storedCount !== null) {
      setCount(JSON.parse(storedCount));
    }
  }, []);

  const updateCount = (newCount: number) => {
    setCount(newCount);
    localStorage.setItem("counter", JSON.stringify(newCount));
  };

  const increment = () => updateCount(count + 1);
  const decrement = () => updateCount(Math.max(0, count - 1));
  const reset = () => updateCount(0);

  const backgroundStyle = useSpring({
    background: `linear-gradient(to top, hsl(${
      200 + count * 10
    }, 100%, 50%), hsl(200, 100%, 70%))`,
    config: { tension: 200, friction: 20 }, 
  });

  return (
    // @ts-expect-error to-do figureout later
    <animated.div
      style={backgroundStyle}
      className="w-full h-full p-6 flex flex-col justify-center items-center rounded-lg transition-all duration-500 m-10"
    >
      <div className=" text-4xl font-semibold mb-4 text-black">
        Counter: {count}
      </div>
      <div className="flex gap-4">
        <button className="px-3 py-1 bg-gray-200 rounded" onClick={decrement}>
          Decrement
        </button>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded"
          onClick={reset}
        >
          Reset
        </button>
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded"
          onClick={increment}
        >
          Increment
        </button>
      </div>
    </animated.div>
  );
}

export default Counter;
