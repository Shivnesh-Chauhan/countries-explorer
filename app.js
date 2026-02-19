async function fetchCountries() {

    try{
    
    let url= "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,cca3";

    const res= await fetch(url);

    if(!res.ok){

        throw new Error("Network response was not ok")
    }

    const data= await res.json();

  const countriesContainer= document.querySelector(".contries-container");

  data.forEach((country) => {

    console.log(country.cca3);

    const countryCard= document.createElement('a');
    countryCard.classList.add('country-card');
    countryCard.href= `country.html?code=${country.cca3}`;

 
    countryCard.innerHTML= `

    <img src="${country.flags.svg}" alt="flag" />
    <div class="card-text">
    <h3> ${country.name.common}</h3>
    <p><b>Population:</b> ${country.population.toLocaleString()}</p>
    <p><b>Region:</b> ${country.region}</p>
    <p><b>Capital:</b> ${country.capital ?.[0] || "N/A"}</p>
    </div>
    `;

    countriesContainer.append(countryCard);


  });
   


  } catch(error){
    console.error("Error fetching countries: ", error);
  }


}

fetchCountries();


// Filter by region

const filterByRegion= document.querySelector(".filter-by-region");

filterByRegion.addEventListener("change", async function(e){

  const selectedRegion= e.target.value;
  const countriesContainer= document.querySelector(".contries-container");
  countriesContainer.innerHTML= "";


  try{

    let url;

    if(!selectedRegion){
      url= "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,cca3";
    }else{
      url = `https://restcountries.com/v3.1/region/${selectedRegion}?fields=name,capital,region,population,flags,cca3`;
    }

    const res= await fetch(url);
    const data= await res.json();

    data.forEach((country) => {

     const countryCard= document.createElement('a');
    countryCard.classList.add('country-card');
    countryCard.href= `country.html?code=${country.cca3}`;


    countryCard.innerHTML= `

    <img src="${country.flags.svg}" alt="flag" />
    <div class="card-text">
    <h3> ${country.name.common}</h3>
    <p><b>Population:</b> ${country.population.toLocaleString()}</p>
    <p><b>Region:</b> ${country.region}</p>
    <p><b>Capital:</b> ${country.capital ?.[0] || "N/A"}</p>
    </div>
    `;

    countriesContainer.append(countryCard);

    });


  }catch(error){
    console.log("Error fetching region:", error);

  }


  
});


// Search Functionality


const searchInput= document.querySelector(".search-input");

searchInput.addEventListener("input", async function(e){


  const searchValue= e.target.value.trim();

  const countriesContainer= document.querySelector(".contries-container");
  countriesContainer.innerHTML= "";


  try{

    let url;

    if(!searchValue){
      url= "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,cca3";
    }else{
      url = url = `https://restcountries.com/v3.1/name/${encodeURIComponent(searchValue)}?fields=name,capital,region,population,flags,cca3`;

    }

    const res= await fetch(url);

    if(!res.ok){
      countriesContainer.innerHTML= "<p>No countires found</p>"
      return;
    }

    let data= await res.json();

    if(searchValue){

      const lowerSearch= searchValue.toLowerCase();

      data= data
      .filter(country => 

        country.name.common.toLowerCase().includes(lowerSearch)
      )

      .sort((a, b) => {

        const aName= a.name.common.toLowerCase();
        const bName= b.name.common.toLowerCase();

        const aStarts= aName.startsWith(lowerSearch);
        const bStarts= bName.startsWith(lowerSearch);

        if(aStarts && !bStarts) return -1;
        if(!aStarts && bStarts) return 1;

        return aName.localeCompare(bName)


      });

        
    }

    data.forEach((country) => {

    const countryCard= document.createElement('a');
    countryCard.classList.add('country-card');
    countryCard.href= `country.html?code=${country.cca3}`;


    countryCard.innerHTML= `

    <img src="${country.flags.svg}" alt="flag" />
    <div class="card-text">
    <h3> ${country.name.common}</h3>
    <p><b>Population:</b> ${country.population.toLocaleString()}</p>
    <p><b>Region:</b> ${country.region}</p>
    <p><b>Capital:</b> ${country.capital ?.[0] || "N/A"}</p>
    </div>
    `;

    countriesContainer.append(countryCard);

    });


  }catch(error){
    console.log("Error fetching region:", error);

  }



});

const themeToggle= document.querySelector(".theme-toggle");

// Apply saved theme when page loads

if(localStorage.getItem("theme") === "dark"){

  document.body.classList.add("dark");
}

themeToggle.addEventListener("click", function() {

  document.body.classList.toggle("dark");

  // Saved theme to localStorage

  if(document.body.classList.contains("dark")){

    localStorage.setItem("theme", "dark");

  }else{

    localStorage.setItem("theme", "light");
  }
  
});






  


 

 



