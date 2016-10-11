import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory} from 'react-router';
import {observer} from 'mobx-react';

import {Test}     from 'components/Test';
// -- Store from colussus API
import TestStore from 'js/TestStore';

let testStore = new TestStore();

@observer
class app extends React.Component {
  render() {
    return (
      <div>
        <Test testStore={testStore}/>
      </div>
    )
  }
}

// Render the main component into the dom
ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={app} />
    </Router>,
    document.getElementById('app'));
