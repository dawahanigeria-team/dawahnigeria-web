import * as type from "../Actions/Types";

const initailState = {
  searchRecord:"",
 
  searchData:[],
  searchOptions:{},

 

};
const Search = (state = initailState, action) => {
  switch (action.type) {
    case type.GET_SEARCH_RECORD:
      return {
        ...state,
        searchRecord: action.payload,
      };
      case type.GET_SEARCH_DATA:
      return {
        ...state,
        searchData: action.payload,
      };
      case type.GET_SEARCH_OPTIONS:
        return {
          ...state,
          searchOptions: action.payload,
        };
  

    default:
      return state;
  }
};

export default Search;
