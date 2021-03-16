
 
 import './styles.css'; 
 import countriesTpl from './templates/countries.card.hbs'
 import manyCountry from './templates/country.hbs'
 import fetchCountries from './js/fetchCountries.js';
 import { error } from "@pnotify/core/";
 import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

 import getRefs from './js/get-refs'
 import debounce from "lodash.debounce";
 const refs = getRefs();
   
 refs.inputRef.addEventListener('input', debounce(onInput, 500));

  
    
function renderCountrycard(country){
    refs.countriesListRef.innerHTML = "";
   
    
    if(country.length === 1){
        const markup = countriesTpl(country)
        refs.countriesListRef.insertAdjacentHTML("beforeend", markup);
    } else if (country.length > 1 && country.length <= 10 && country.length !== 0){
        const markup = manyCountry(country)
        refs.countriesListRef.insertAdjacentHTML("beforeend", markup);
    }else if (country.length > 10){ error({
        text: "Too many matches found. Please enter a more specific query!",
        
      });}else {error({
        text: "matches not found !",
         });}
  
}

 function onInput(event){
    refs.countriesListRef.innerHTML = ""
    const form = event.target
    const inputValue = form.value;
    if(!inputValue){
        return;
    }
    return fetchCountries(inputValue).then(renderCountrycard)
    .catch({error})
   
    }