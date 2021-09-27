import React, { useEffect, useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../utils/api';
import CardForm from './CardForm';

/**
 * @returns
 * a component with an auto filled card with the ability to edit
 */

export const EditCard = () => {
    // pull deckId first they get pulled and distributed in order of params
    const { deckId, cardId } = useParams();
    // set deck as empty object
    const [deck, setDeck] = useState({});
    // this is inital form data set as object
    const [ formData, setFormData ] = useState({});
    // readDeck is used to push the deck name in the bread crumbs
    useEffect(() => {
        const ac = new AbortController();
        async function getDeck(){
            const deckData = await readDeck(deckId, ac.signal);
            setDeck(deckData);
        }
        getDeck();
    }, [deckId])
    // grab the card data and fill the formData
    useEffect(() => {
        const ac = new AbortController();
        async function getCard(){
            const cardData = await readCard(cardId, ac.signal);
            setFormData({ ...cardData });
        }
        getCard();
    }, [deckId, cardId])
    // redeclare the card with the exssiting data
    function editCurrentCard(front, back){
        const card = {
            id: formData.id,
            deckId: formData.deckId,
            front: front,
            back: back
        }
        const ac = new AbortController();
        return updateCard(card, ac.signal);
    }    
    // wait for card back   
    if (!deck.id && !formData.back){
        return "Fetching card data";
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
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/decks/${deckId}`}>
                                Deck {deck.name}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
                    </ol>
                </nav>
                <CardForm 
                    formData={formData}
                    setFormData={setFormData}
                    isNew={false} 
                    onSuccess={editCurrentCard} 
                    deck={deck}
                />
            </>
        );
    }
};

export default EditCard;