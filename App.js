import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import { withStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";



import Dropdown from "react-dropdown";

import Autosuggest from 'react-autosuggest';





const config = { authority: 'searchv7.expertrec.com' };

function App() {


  let newVal = "";

  let [searchDropdownSuggestions, setsearchDropdownSuggestions] = useState([]);
  let [localSearchTerm, setLocalSearchTerm] = useState("");
  useEffect(() => {
    console.log(searchDropdownSuggestions)

  }, [searchDropdownSuggestions]);

  const autoSuggest = async (searchTerm) => {
    let result;
    // const promise = null;
    try {
      const promise = await axios.get(
        `https://searchv7.expertrec.com/v6/search/eb17a931b1ab4950928cabbf42527715/?user=&q=${searchTerm}&size=6&suggestions=1&maxSuggestions=6`,
        config
      );

      if (promise.status === 401) {
        window.location.reload();
      }

      return promise;
    } catch (error) {
      console.log(error);
    }
    // return result
    // return promise;
  };
  const StyledAutocomplete = withStyles({
    root: {
      width: "600px",
    },
    inputRoot: {
      borderRadius: "0px",
      font: "600 15px/19px Montserrat",
      letterSpacing: "0.15px",
      color: "#9FA9BF",
      height: "36px",
    },
    option: {
      '&[aria-selected="true"]': {
        backgroundColor: "#FFFFFF",
        borderColor: "transparent",
      },
      // '&[data-focus="true"]': {
      //   backgroundColor: "#D3D3D3",
      //   borderColor: "transparent",
      // },
    },
  })(Autocomplete);

  const contentViewFillAutoSuggestions = async (term) => {
    console.log(term)
    if (term.length) {
      let results = await autoSuggest(term);
      console.log(results)
      let a = results.data.suggestions.map(data => data.suggestion)
      if (a.length) {
        setsearchDropdownSuggestions(a);

      }
    }




  };

  return (
    <div className="App">


      <div className="outerDiv">
        <div className='imageOuterDiv'>
          <img src="https://www.royaloakindia.com/images/royaloakindia-logo.webp" alt="Royaloak Furnitures" title="Royaloak Furnitures"></img>
        </div>
        <div className="textBoxOuterDiv">
          <input type="text" style={{ width: "136%", marginLeft: "3rem", fontSize: "16px", height: "38px", paddingRight: "35px" }} className="desktop-search-form form-control-search" onChange={(e) => { contentViewFillAutoSuggestions(e.target.value) }} id="productnameindesk" placeholder="Find your furniture...">
          </input>
        </div>

        <img className="align-bottom" style={{ width: '18px', position: 'absolute', top: '39px', right: '40.5%' }} src="https://www.royaloakindia.com/royaloak-react/public/react-images/iconSearch.webp"></img>

        <div className='dropdown' style={{ display: searchDropdownSuggestions.length > 0 ? 'block' : 'none' }}>
          <div>TOP SEARCHES</div>
          {searchDropdownSuggestions.map((data) =>
            <div className='dropdownvalues' >{data}</div>

          )}

        </div>
      </div>


    </div>
  );
}

export default App;
