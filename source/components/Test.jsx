import React from 'react';
import {observer} from 'mobx-react';

@observer
export class Test extends React.Component {

  constructor(props) {
      super(props);
      this.state= {
        inputTyped: '',
        showResults: false,
        loading: false,
        posts: [],
        comments: [],
        albums: [],
        photos: [],
        todos: [],
        users: []
      };
  }

  componentWillMount() {

  }

  render() {
    return (
        <div>
            {this.renderHeader()}
            {this.renderInputSearch()}
            {
            this.state.posts.length > 0 ?
                this.renderResult('Posts',this.state.posts) :
                ''
            }
            {
            this.state.comments.length > 0 ?
                this.renderResult('Comments',this.state.comments) :
                ''
            }
            {
            this.state.albums.length > 0 ?
                this.renderResult('Albums',this.state.albums) :
                ''
            }
            {
            this.state.photos.length > 0 ?
                this.renderResult('Photos',this.state.photos) :
                ''
            }
            {
            this.state.todos.length > 0 ?
                this.renderResult('Todos',this.state.todos) :
                ''
            }
            {
            this.state.users.length > 0 ?
                this.renderResult('Users',this.state.users) :
                ''
            }
        </div>
    );
  }

  renderHeader() {
      return (
          <div className="navbar navbar-default navbar-top">
            <div className="container">
              <div className="navbar-header">
                <a href="#" className="navbar-brand">Cabaana-Test</a>
              </div>
            </div>
          </div>
      );
  }

  renderInputSearch() {
      return (
          <div className="row">
            <div className="col-xs-12">
                <div className="well bs-component">
                  <form className="form-horizontal">
                      <div className="form-group">
                        <label htmlFor="inputSearch" className="col-xs-12 col-sm-2 control-label">Search</label>
                        <div className="col-xs-12 col-sm-10">
                          <input type="text" className="form-control" id="inputSearch" placeholder="Type your search..." onChange={this.handleChange.bind(this, 'inputTyped')}/>
                        </div>
                        <div className="col-xs-12 text-right">
                        {
                        (this.state.posts.length > 0 || this.state.comments.length> 0 || this.state.albums.length> 0 || this.state.photos.length> 0 || this.state.todos.length> 0 || this.state.users.length> 0) ?
                            <button type="button" className="btn btn-info btn-md btn-margin" onClick={this.showResults.bind(this)}>{ !this.state.showResults ? 'See ': 'Hide ' } Results</button>:
                            <span>
                            {
                            (this.state.inputTyped.length>0 && this.state.posts.length == 0 && this.state.comments.length == 0 && this.state.albums.length == 0 && this.state.photos.length == 0 && this.state.todos.length == 0 && this.state.users.length == 0) ?
                            <button type="button"
                                    className={`${this.state.loading
                                          ? 'btn btn-warning btn-md btn-margin disabled '
                                          : 'btn btn-danger btn-md btn-margin disabled '}`}>{`${this.state.loading ? 'Loading...': 'Not Elements'}`}</button>:
                            ''
                            }
                            </span>
                        }
                        </div>
                      </div>
                  </form>
                </div>
            </div>
          </div>
      );
  }

  renderResult(title,datas) {
      return (
          <div className="col-xs-12">
              <div className="bs-component">
                <div className="panel panel-success">
                  <div className="panel-heading">
                    <h3 className="panel-title">{title}</h3>
                  </div>
                  <div className="panel-body">
                    <p>You have found {datas.length} elements</p>
                    { this.state.showResults ?
                        <ul className="list-group">
                            {datas.map(this.renderItem, this)}
                        </ul> : null
                    }
                  </div>
                </div>
              </div>
          </div>
      );
  }
  renderItem(elem,k) {
      let string = [];
      let title = elem.title ? string.push(elem.title) : '';
      let body = elem.body ? string.push(elem.body) : '';
      let name = elem.name ? string.push(elem.name) : '';
      let email = elem.email ? string.push(elem.email) : '';
      let completed = elem.completed ? string.push(elem.completed) : '';
      let username = elem.username ? string.push(elem.username) : '';
      let website = elem.website ? string.push(elem.website) : '';
      let phone = elem.phone ? string.push(elem.phone) : '';
      let company = elem.company ? string.push(elem.company) : '';
      let address = elem.address ? string.push(elem.address) : '';

      return (
          <li key={k} className="list-group-item">
            {string.map(this.renderString, this)}
          </li>
      );
  }

  renderString(str,k) {
    let isFind = JSON.stringify(str).indexOf(this.state.inputTyped) != -1;
    let body = null;
    if (typeof str == 'object') {
        if (str.street) {
            body =
            (
                <p className={`${isFind
                              ? 'bkg-yellow'
                              : ''}`}key={k}>{`${str.street} - ${str.suite} - ${str.city} - ${str.zipcode}`}</p>
            );
        } else {
            body =
            (
                <p className={`${isFind
                              ? 'bkg-yellow'
                              : ''}`}key={k}>{`${str.name} - ${str.catchPhrase} - ${str.bs}`}</p>
            );
        }
    } else {
        body =
        (
            <p className={`${isFind
                          ? 'bkg-yellow'
                          : ''}`}key={k}>{str}</p>
        );
    }
    return body;
  }

  showResults() {
    this.setState({ showResults: !this.state.showResults });
  }

  handleChange(field, e) {
    //it is necesary for updating the state.
    let newState = {};
    newState[field] = e.target.value;
    this.setState(newState);
    let parseInputTyped = e.target.value;
    if (parseInputTyped.length>0) {
        this.emptyContent();
        this.setState({loading: true})
        let {testStore} = this.props;
        let onResponse = ( res ) => {
            if (this.state.inputTyped.length > 0) {
                let newState = {};
                newState[res.id] = res.data;
                this.setState(newState);
                this.setState({loading: false})
            }
        };
        //We put a little delay because the input form the user can be faster than response from endpoints.
        setTimeout(() => {
            testStore.get(this.state.inputTyped,'posts').then(onResponse);
            testStore.get(this.state.inputTyped,'comments').then(onResponse);
            testStore.get(this.state.inputTyped,'albums').then(onResponse);
            testStore.get(this.state.inputTyped,'photos').then(onResponse);
            testStore.get(this.state.inputTyped,'todos').then(onResponse);
            testStore.get(this.state.inputTyped,'users').then(onResponse);
        },1000);
    } else {
        setTimeout(this.emptyContent.bind(this),1000);
    }
  }
  emptyContent() {
      let empty = [];
      this.setState({'posts': empty, 'comments': empty, 'albums': empty, 'photos': empty, 'todos': empty,'users': empty});
  }
}
