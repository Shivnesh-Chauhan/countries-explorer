const code = new URLSearchParams(location.search).get('code');
const flagImg= document.querySelector('.flag-img');
const CountryName= document.querySelector('.country-details h1');
// const detailsContainer = document.querySelector(".detail-text-container");
const loadingText = document.querySelector(".loading");
const countryDetails = document.querySelector(".country-details");







async function getCountry(){

    if(!code){
        console.error("No counntry code found in URL");
        return;
    }

    loadingText.classList.remove("hidden");
    countryDetails.classList.add("hidden");

    try{

    
    const res= await fetch(

        `https://restcountries.com/v3.1/alpha/${code}`

    );

    if(!res.ok){
        throw new Error("country not found")
    }

    const data= await res.json();
    const country= data[0];

    flagImg.onload = () => {
        // hide loading only AFTER image loads
        loadingText.classList.add("hidden");
        countryDetails.classList.remove("hidden");
   };


    flagImg.src= country.flags.svg;
    CountryName.innerText= country.name.common;

    const nativeName= country.name.nativeName?Object.values(country.name.nativeName)[0].common: "N/A";
    document.querySelector(".native-name").innerText= nativeName;

    const popu= country.population.toLocaleString();
    document.querySelector(".population").innerText= popu;

    const regan= country.region;
    document.querySelector(".region").innerText= regan;

    const subRegion= country.subregion || "N/A";
    document.querySelector(".sub-region").innerText= subRegion;

    const countryCapital= country.capital?.[0] || "N/A";
    document.querySelector(".capital").innerText= countryCapital;

    const countryDomain= country.tld?.join(", ") || "N/A";
    document.querySelector(".domain").innerText= countryDomain;

    const currency= Object.values(country.currencies ?? {})[0]?.name|| "N/A";
    document.querySelector(".currenies").innerText= currency;

    const countryLanguage= Object.values(country.languages ?? {}).join (", ") || "N/A";
    document.querySelector(".language").innerText= countryLanguage;

    const bordersList= document.querySelector(".borders-list");
    bordersList.innerHTML= "";

    if(country.borders?.length){
        const borderRes= await fetch( `https://restcountries.com/v3.1/alpha?codes=${country.borders.join(",")}`
    );

    const boerderData= await borderRes.json();

    boerderData.forEach(borderCountry => {

        const link= document.createElement("a");
        link.innerText= borderCountry.name.common;
        link.href= `country.html?code=${borderCountry.cca3}`;

        bordersList.appendChild(link);

    });

    }else{
        bordersList.innerText= "None";
    }


    


   }catch(err){

    console.log(err);

   }
}

getCountry();


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
