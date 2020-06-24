import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { render, FindAllByText, getByText } from '@testing-library/react';
import FrontPage from "./components/FrontPage";
import '@testing-library/jest-dom/extend-expect';
import HPCounterContainer from "./components/HPCounterContainer";
import PropertyList from "./components/PropertyList";
import AboutPage from "./components/AboutPage";
import {BrowserRouter as Router} from "react-router-dom";
import { unmountComponentAtNode } from "react-dom";
import { FirebaseAppProvider } from 'reactfire';
import {firebaseConfig} from "./firebaseConfig.js";
import * as firebase from "firebase";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);

  
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Renders title/Frontpage', () => {
  const { getByText } = render(<FrontPage />);
  expect(getByText('DM Web')).toBeInTheDocument();
});
it("Renders list of NPCs", () => {
  const { getByText } = render(<Router><PropertyList /></Router>);
  expect(getByText('List of NPCs:')).toBeInTheDocument();
});
it("Renders list of Settlements", () => {
  const { getByText } = render(<Router><PropertyList /></Router>);
  expect(getByText('List of Settlements:')).toBeInTheDocument();
});
it("Renders HPCounterContainer", () => {
  const { getByText } = render(<HPCounterContainer />);
  expect(getByText('Add a new HP counter')).toBeInTheDocument();
  expect(getByText('Add a New Character')).toBeInTheDocument();
});
it("Renders AboutPage", () => {
  const { getByText } = render(<AboutPage />);
  expect(getByText('This is a work-in-progress project to make a simple web program to help tabletop RPG game masters. Currently it\'s not ready for use.')).toBeInTheDocument();
  expect(getByText('Made by Ossi Vanhala.')).toBeInTheDocument();
});