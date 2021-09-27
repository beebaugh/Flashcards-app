import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @props
 * take in the indvidual deck, do not modify
 * @returns 
 * deck.name with the length required to study and the current length, a add button to redirect them to add cards
 */

export const NotEnoughCards = ({ deck }) => {
        return (
            <>
                <h1>{deck.name}: Study</h1>
                <h2>Not enough cards.</h2>
                <p>You need at least 3 cards to study, There are {deck.cards.length} in this deck.</p>
                <Link to={`/decks/${deck.id}/cards/new`}>  
                    
                    <button className='btn btn-primary'>
                    <span className='oi oi-plus mr-2'></span>
                        Add Cards
                    </button>
                </Link>
            </>
        );
}

export default NotEnoughCards;