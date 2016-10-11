import {Promise} from 'es6-promise';
import 'whatwg-fetch';

export class API {

  constructor( baseUrl ) {
    this.baseUrl = baseUrl;
  }

  get( endPoint ) {
    return fetch( this.fullURL(endPoint), { headers: this.getHeaders() })
          .then( response => response.json() )
          .then( this.parseResponse );
  }

  parseResponse( response ) {
    if( response ) {
      return Promise.resolve({success: true, data: response});
    }
    else {
      return Promise.reject({ success: false, data: response.meta.error});
    }
  }

  getHeaders() {
    let h = new Headers();
    h.append('Content-type', 'application/json');
    h.append('Accept', 'application/json');
    return h;
  }

  fullURL( endPoint ) {
    return this.baseUrl + endPoint;
  }

}

class LocalStore {
    save( key, value ) {
        try {
          localStorage.setItem(key, JSON.stringify(value));
          return true;
        } catch(e) { return false; }
    }

    remove( key ) {
        if (this.read(key)) {
          localStorage.removeItem(key);
          return true;
        } else return false;
    }

    read( key ) {
        return JSON.parse(localStorage.getItem( key ));
    }
}
