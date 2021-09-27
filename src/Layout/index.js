import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Home from '../Home';
import StudyCards from '../Cards/StudyCards';
import NotFound from "./NotFound";
import DeckView from '../Decks/DeckView';
import CreateDeck from '../Decks/CreateDeck';
import EditCard from '../Cards/EditCard';
import AddCard from '../Cards/AddCard';
import EditDeck from '../Decks/EditDeck';

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/decks/new'>
            <CreateDeck />
          </Route>
          <Route exact path='/decks/:deckId'>
            <DeckView />
          </Route>
          <Route exact path='/decks/:deckId/study'>
            <StudyCards />
          </Route> 
          <Route exact path='/decks/:deckId/edit'>
            <EditDeck />
          </Route>
          <Route exact path='/decks/:deckId/cards/new'>
            <AddCard />
          </Route> 
          <Route exact path='/decks/:deckId/cards/:cardId/edit'>
            <EditCard />
          </Route>   
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
