import * as React from 'react';
import * as ReactDOM from 'react-dom';
import NavbarComponent from './NavbarComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NavbarComponent />, div);
});
