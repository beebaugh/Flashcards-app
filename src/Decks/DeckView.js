import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, deleteDeck } from '../utils/api';
import CardList from '../Cards/CardList';

/**
 * @returns
 * a view of the deck with a upper componenet with the description and buttons for editing/viewing/studying/deleteing
 * a view of a lower componenet with the cards and a edit and delete
 */

export const DeckView = () => {
    // usehistory if the deck or card is delete return to home or the deck
    const history = useHistory();
    // get the deckId param
    const { deckId } = useParams();
    // get the deck and use the deckId param
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    // get the deck nd setDeck data
    useEffect(() => {
    const abortController = new AbortController();
        async function getDeck() {
            const data = await readDeck(deckId, abortController.signal);
            setDeck(data);
            setCards(data.cards);
        }
        getDeck();
    }, [deckId, setCards])
    // handle delete and if deck is deleted return to home
    const handleDelete = async () => {
        const abortController = new AbortController();
        const result = window.confirm('Delete this deck?\n\nYou will not be able to recover it');
        if (result) {
            await deleteDeck(deckId, abortController.signal);
            history.push('/');
        }
    };
    // if there is no deck.id load
    // The cardList componenet shows the cards
    if (!deck.id) {
        return "Loading..."
    } else {
        return (
            <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to='/'>
                            <span className='oi oi-home mr-2'></span>
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                </ol>
            </nav>
            <div className="card">
                <div className="card-body">
                    <div className='row'>
                        <h5 className="card-title">{deck.name}</h5>
                    </div>
                    <p className="card-text">{deck.description}</p>
                    <div>
                        <Link to={`/decks/${deck.id}/edit`}>
                            <button className='btn btn-secondary'>
                                <span className='oi oi-pencil mr-2'></span>
                                Edit
                            </button>
                        </Link>
                        <Link to={`/decks/${deck.id}/study`}>
                            <button className='btn btn-primary'>
                                <span className='oi oi-book mr-2'></span>
                                Study
                            </button>
                        </Link>
                        <Link to={`/decks/${deck.id}/cards/new`}>
                            <button className='btn btn-primary'>
                                <span className='oi oi-plus mr-2'></span>
                                Add Cards
                            </button>
                        </Link>
                            <button className='btn btn-danger' onClick={handleDelete}>
                                <span className='oi oi-trash'></span>
                            </button>
                    </div>
                </div>
            </div>
            <div>
                <h2>Cards</h2>             
                <CardList cards={cards} setCards={setCards}/>
            </div>
            </>
        );
    }
};

export default DeckView;