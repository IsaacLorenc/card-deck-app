import React, { useState, useEffect } from 'react';
import Card from './Card';
import DrawButton from './DrawButton';
import './ShuffleButton.css';

function Deck() {
  const [deckId, setDeckId] = useState(null);
  const [card, setCard] = useState(null);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    async function fetchDeck() {
      const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/');
      const data = await res.json();
      setDeckId(data.deck_id);
    }
    fetchDeck();
  }, []);

  const drawCard = async () => {
    if (deckId) {
      const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      const data = await res.json();
      if (data.cards.length === 0) {
        alert('Error: no cards remaining!');
      } else {
        setCard(data.cards[0]);
      }
    }
  };

  const shuffleDeck = async () => {
    if (deckId) {
      setIsShuffling(true);
      const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
      await res.json();
      setCard(null);
      setIsShuffling(false);
    }
  };

  return (
    <div>
      {card && <Card image={card.image} />}
      <DrawButton drawCard={drawCard} />
      <button 
        className="ShuffleButton" 
        onClick={shuffleDeck} 
        disabled={isShuffling}
      >
        {isShuffling ? 'Shuffling...' : 'Shuffle Deck'}
      </button>
    </div>
  );
}

export default Deck;