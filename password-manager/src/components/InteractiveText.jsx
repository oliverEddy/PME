import React, { useEffect, useRef, useState } from 'react';

const InteractiveText = ({ originalText }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const headingRef = useRef(null);
  const [text, setText] = useState(originalText);

  useEffect(() => {
    const handleMouseOver = () => {
      let iteration = 0;
      const interval = setInterval(() => {
        const newText = originalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return letter;
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("");

        setText(newText);

        if (iteration >= originalText.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);
    };

    const current = headingRef.current;
    current?.addEventListener("mouseover", handleMouseOver);

    return () => {
      current?.removeEventListener("mouseover", handleMouseOver);
    };
  }, [originalText]);

  return <span ref={headingRef}>{text}</span>;
};

export default InteractiveText;
