import { useState } from "react";
import Navigation from "./Navigation/Nav";
import Products from "./Products/Products";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import "./index.css";
import "./index.js";

//database
import products from "./db/Data";
import Card from "./components/Card";

function App() {

  const [selectedCategory,setSelectorCategory] = useState(null);
  const [query, setQuery] = useState("");

  // -- Input Filter
  const handlnputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredltems = products.filter((product) => 
    product.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()!== -1));
  
  //--- Radio Filter--

  const handleChange = (event) => {
    setSelectorCategory(event.target.value);
  };

  //--------- Buttons Filter
  const handleClick = (event) => {
    setSelectorCategory(event.target.value);
  };


  function filteredData(products, selected, query){
    let filteredProducts = products;

    //-- Filtering lnput items
    if(query){
      filteredProducts = filteredltems;
    }

       //  selected filter
       if (selected) {
        filteredProducts = filteredProducts.filter(
          ({ category, color, company, newPrice, title }) =>
            category === selected ||
            color === selected ||
            company === selected ||
            newPrice === selected ||
            title === selected
        );
      }


      return filteredProducts.map(
        ({ img, title, star, reviews, newPrice, prevPrice }) => (
          <Card
            key={Math.random()}
            img={img}
            title={title}
            star={star}
            reviews={reviews}
            newPrice={newPrice}
            prevPrice={prevPrice}
          />
        )
      );
    }

    const result = filteredData(products, selectedCategory, query);





  // --- Render ---

  return (  <>
    <Sidebar handleChange = {handleChange}/>
    <Navigation query={query} handleInputChange={handlnputChange}/>
    <Recommended handleClick = {handleClick}/>
    <Products result={result}/>
   </>
   ); 
  
  

  }
 



export default App;
