import React, { useEffect, useState } from 'react';
import '../styles/custom-cursor.css';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      addTrail(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', updatePosition);

    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  const addTrail = (x: number, y: number) => {
    const newTrail = { x, y, id: Date.now() };
    setTrails((prevTrails) => [...prevTrails, newTrail].slice(-20));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTrails((prevTrails) => prevTrails.slice(1));
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div
        className="custom-cursor"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
            opacity: 1 - index * 0.05,
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;