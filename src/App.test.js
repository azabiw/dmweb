import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Character from "./components/Character";
import Settlement from "./components/Settlement";
import { render, FindAllByText, getByText } from '@testing-library/react';
import FrontPage from "./components/FrontPage";
import '@testing-library/jest-dom/extend-expect';
import HPCounterContainer from "./components/HPCounterContainer";
import PropertyList from "./components/PropertyList";
import EditorPage from "./components/EditorPage";
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
it('Renders title/Frontpage', () => {
  const { getByText } = render(<FrontPage />);
  expect(getByText('DM Web')).toBeInTheDocument();
});
it("Renders list of NPCs", () => {
  const { getByText } = render(<PropertyList />);
  expect(getByText('List of NPCs:')).toBeInTheDocument();
});
it("Renders list of Settlements", () => {
  const { getByText } = render(<PropertyList />);
  expect(getByText('List of Settlements:')).toBeInTheDocument();
});
it("Renders EditorPage with SettlementEditor", () => {
  const { getByText } = render(<EditorPage><Settlement /></EditorPage>);
  expect(getByText('Edit Settlement/town')).toBeInTheDocument();
});
it("Renders EditorPage with CharacterEditor", () => {
  const { getByText } = render(<EditorPage><Character /></EditorPage>);
  expect(getByText('Edit NPC')).toBeInTheDocument();
});
it("Renders HPCounterContainer", () => {
  const { getByText } = render(<HPCounterContainer />);
  expect(getByText('Add a new HP counter')).toBeInTheDocument();
  expect(getByText('Add a New Character')).toBeInTheDocument();
});