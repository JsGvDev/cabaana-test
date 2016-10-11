import {API} from './DataAccess';

const apiUrl = 'https://jsonplaceholder.typicode.com/';

class TestStore {

  dataAccess;

  constructor() {
      this.dataAccess = new API(apiUrl);
  }

  // Fetch all from different endpoints
  get(inputTyped,endPoint) {
    var me = this;
    let onResponse = (( res ) => {
        let {success, data} = res;
        if (success) {
            let array = data.filter((elem) => {
                let model= me.getModel(endPoint);
                for (let i=0; i<model.length; i++) {
                    let strObj = JSON.stringify(elem[model[i]]);
                    if (inputTyped.length > 0 && strObj.indexOf(inputTyped) != -1) {
                        return true;
                    }
                }
                return false;
            });
            let result = {
                id: endPoint,
                data: array
            };
            return result;
        } else {
            return null;
        }
    });
    return this.dataAccess.get(endPoint).then(onResponse);
  }

  getModel(endPoint) {
      let model = [];
      switch (endPoint) {
          case 'posts':
              model =  ['title', 'body'];
              break;
          case 'comments':
              model =  ['name', 'email', 'body'];
              break;
          case 'albums':
              model =  ['title'];
              break;
          case 'photos':
              model =  ['title'];
              break;
          case 'todos':
              model =  ['title', 'completed'];
              break;
          case 'users':
              model =  ['name', 'username', 'email', 'company', 'website', 'phone', 'address'];
              break;
      }
      return model;
  }
}

export default TestStore;
