     //Check for the browser support of service worker
    if ("serviceWorker" in navigator) {
    	try {
    		navigator.serviceWorker.register('service_worker.js');
    		console.log('Service Worker Registered Successfully');
    	} catch(e) {
    		console.log('Service Worker Registration Failed', e);
    	}
    }

   //My global variables
    let amount = document.querySelector("#amount");
  	let fromCurrency = document.querySelector("#fromCurrency");
  	let toCurrency = document.querySelector("#toCurrency");
  	let btnConvert = document.querySelector('#btnConvert');

  	let url = 'https://free.currencyconverterapi.com/api/v5/currencies';

  	 fetch( url,{ method : "GET"})
			.then( function(response){ 
				return response.json();
			})
			.then( function(results){
				for(let result in results){
                  for(let id in results[result]){
                  	let optionA = `
                      <option value="${results[result][id]['id']}">
                         ${results[result][id]['currencyName']} (${results[result][id]['id']})
                      </option>
                  	`;
                  	let optionB = `
                      <option value="${results[result][id]['id']}">
                         ${results[result][id]['currencyName']} (${results[result][id]['id']})
                      </option>
                  	`;
                     fromCurrency.innerHTML += optionA;
                     toCurrency.innerHTML += optionB;
                 }
               }
			})
			.catch( function(error){
				console.log(error);
			});

   // Register click event then execute convertCurrency function
   btnConvert.addEventListener("click", convertCurrency);

   function convertCurrency(){

   	 let query = fromCurrency.value + '_' + toCurrency.value;
   	 let input = amount.value;
   	 let url = "https://free.currencyconverterapi.com/api/v5/convert?q=" + query 
                + "&compact=ultra";
    //IndexedDB
    const currencyPromise = idb.open('currencies', 1, upgradeDB => {
           upgradeDB.createObjectStore('currency', {keyPath: 'id'});
        });
      
     //Fetch Api
   	 fetch( url, {method : "GET"})
   	   .then(response => response.json())
   	   .then(data => {
           for(con in data){
           	 if (input !== "") {
           	   	let rate = data[con];
                let total = rate * parseFloat(input);
                let finalResult = total.toFixed(2);
                output.innerHTML = `<input type="text" class="u-full-width" 
                                     value="${finalResult}">`;

           	   }
           }
   	   })

   }

                 // currencyPromise.then(db => {
                 //     const cur = db.transaction('currency', 'readwrite');
                 //     cur.objectStore('currency').put({ 
                 //      'id': url,
                 //      'rate': rate 
                 //    });
                 //     return cur.complete;
                 //   });
                 //   currencyPromise.then(db => {
                 //      return db.transaction('currency').objectStore('currency')
                 //      .getAll();
                 //    }).then( allCurrencies => console.log(allCurrencies));


