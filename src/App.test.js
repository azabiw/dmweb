import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Character from "./Character";
import Settlement from "./Settlement";

it('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Character editor renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Character defaultCharacter={""} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('Settlement renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Settlement defaultValues={""} characters={[]} /> , div);
  ReactDOM.unmountComponentAtNode(div);
});
