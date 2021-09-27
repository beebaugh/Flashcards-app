import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listDecks } from '../utils/api';
import DeckList from '../Decks/DeckList';

/**
 * @params
 * 
 * @returns
 * A '+ Create Deck' button which leads you to a CreateDeck form
 * A deckList which shows all decks with options to view/study/delete
 */

export default function Home() {
    // set decks to empty array
    const [decks, setDecks] = useState([]);
    // retrieve the list of decksData and set decks to data
    useEffect(() => {
        const abortController = new AbortController();
        async function fetchDecks() {
            const data = await listDecks(abortController.signal);
            setDecks(data);
        }
        fetchDecks();
    }, [setDecks])
    // If decks hasnt loaded yet return loading... else return home page
    if (!decks) {
        return "Loading..."
    } else {
        return (
            <div>
                <div className='actions'>
                    <Link to='/decks/new'>
                        <button className='btn btn-secondary'>
                            <span className='oi oi-plus mr-2'></span>
                            Create Deck
                        </button>
                    </Link>
                </div>
                <div >
                    <DeckList decks={decks} setDecks={setDecks}/>
                </div>
            </div>
        );
    }
}