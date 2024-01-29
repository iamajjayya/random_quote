import React, { useState, useEffect } from 'react';
import './Randomquote.css';
import reload from '../reload_reload-removebg-preview.png';
import x from '../twiter-removebg-preview.png';

export const RandomQuote = () => {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState({
    text: "As you move toward a dream, the dream moves toward you.",
    author: "Julia Cameron"
  });

  const twitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author.split(',')[0]}`)
  };

  useEffect(() => {
    const loadQuotes = async () => {
      try {
        const response = await fetch("https://type.fit/api/quotes");
        const data = await response.json();
        setQuotes(data);
      } catch (error) {
        console.error("Error loading quotes:", error);
      }
    };

    loadQuotes(); // Call loadQuotes here

  }, []); // The empty dependency array ensures that this effect runs only once on mount

  const random = () => {
    const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(selectedQuote);
  };

  return (
    <div className='container'>
      <div className='quote'>{quote.text}</div>
      <div>
        <div className='line'></div>
        <div className='bottom'>
          <div className='author'> - {quote.author.split(',')[0]}</div>
          <div className='icons'>
            <img
              src={reload}
              onClick={() => {
                random();
              }}
              alt=''
            />
            <img src={x} onClick={() => { twitter() }} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};
