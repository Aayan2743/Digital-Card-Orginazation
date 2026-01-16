import { useState } from "react";
const PRICE = 49;

export default function CardManager({ onAdd }) {
  const [cards, setCards] = useState(10);
  const [days, setDays] = useState(30);

  const add = () => {
    onAdd({
      id: Date.now(),
      cards,
      days,
      amount: cards * PRICE,
      date: new Date().toDateString(),
    });
  };

  return (
    <div className="mb-4">
      <input
        className="border w-full p-2 mb-2"
        type="number"
        value={cards}
        onChange={(e) => setCards(+e.target.value)}
      />
      <input
        className="border w-full p-2 mb-2"
        type="number"
        value={days}
        onChange={(e) => setDays(+e.target.value)}
      />
      <div className="bg-gray-100 p-2 mb-2">Amount: ₹{cards * PRICE}</div>
      <button className="bg-indigo-600 text-white w-full py-2" onClick={add}>
        Add Cards
      </button>
    </div>
  );
}
