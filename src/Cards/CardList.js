import React from 'react';
import CardView from './CardView';

/**
 * @props
 * take in the deck to get the cards  
 * @returns 
 * a list of cards 
 */

export const CardList = ({ cards, setCards}) => {
    // get a cards state and map the list of cards
    

    const list = cards.map((card) => <CardView key={card.id} card={card} setCards={setCards} />)
    
    return (
        <section className='container'>
            <div className='row'>
                {list}
            </div>
        </section>
    );
};

export default CardList;