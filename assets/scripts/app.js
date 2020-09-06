 let productList = {
    products: [
    {
        title: "hello" ,
        imageUrl:"https://images.unsplash.com/photo-1518707606293-6274eadcf07d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        Price: 19.9 ,
        description:"Nature Safary ",
    },
    {
        title: "A Carpet" ,
        imageUrl:"https://www.wikihow.com/images/thumb/7/77/Make-a-Carpet-Into-a-Rug-Step-1-Version-2.jpg/aid1424669-v4-728px-Make-a-Carpet-Into-a-Rug-Step-1-Version-2.jpg",
        Price: 30.99 ,
        description:" A very ColorFull Carpet ",
    }
    ],
    render() {
        const renderHook =document.getElementById('app');
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for(const prod of this.products){
        const prodEl = document.createElement('li');
        prodEl.className = 'product-item';
        prodEl.innerHTML =
        `
         <div>
              <img src="${prod.imageUrl}" alt="${prod.title}">
              <div class ="product-item__content">
                <h2>${prod.title}</h2>
                <h3>\$${prod.Price}</h3>
                <p>${prod.description}</p>
                <button>Add To Cart </button>
              </div>
         </div>
        ` ;
        prodList.append(prodEl);
     }
     renderHook.append(prodList);
    }
};
 productList.render();
