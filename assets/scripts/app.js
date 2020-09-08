class Product{
    constructor(title , image ,desc ,price) {
        this.title = title ;
        this.imageUrl = image ;
        this.price = price ;
        this.description =desc ;
    }
}
class ShoppingCart{
    items =[];
    set cartItems(value){
        this.items = value ;
        this.totalOutput.innerHTML =` <h1>Total  : \$${this.totalAmount.toFixed(2)}</h1>`
    }
    get totalAmount(){
        const sum = this.items.reduce(

            (prevValue ,CurrentItem)=>{
            return prevValue + CurrentItem.price ;
            }
        , 0);
        return sum ;
    }

    addProduct(product){
        const updatedItems = [...this.items]
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }
    render(){
        const cartEl =document.createElement('section');
        cartEl.innerHTML =`
            <h1>Title : \$${0}</h1>
            <button>Order Now !</button>
        `;
        cartEl.className ='cart' ;
        this.totalOutput = cartEl.querySelector('h1');
        return cartEl ;
    }
}
class ProductItem{
    constructor(product) {
        this.product = product ;
    }
    addToCart(){
        App.addProductToCart(this.product);
    }
    render(){
        const prodEl = document.createElement('li');
        prodEl.className = 'product-item';
        prodEl.innerHTML = `
         <div>
              <img src="${this.product.imageUrl}" alt="${this.product.title}">
              <div class ="product-item__content">
                <h2>${this.product.title}</h2>
                <h3>\$${this.product.price}</h3>
                <p>${this.product.description}</p>
                <button>Add To Cart </button>
              </div>
         </div>
        `;
    const addCartBtn = prodEl.querySelector('button')
    addCartBtn.addEventListener('click' ,this.addToCart.bind(this));
        return prodEl;
    }

}
class ProductList {
    products = [
        new Product("hello",
            "https://images.unsplash.com/photo-1518707606293-6274eadcf07d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
            "Nature Safary ",
            19.9,

        ),

        new Product("A Carpet",
            "https://www.wikihow.com/images/thumb/7/77/Make-a-Carpet-Into-a-Rug-Step-1-Version-2.jpg/aid1424669-v4-728px-Make-a-Carpet-Into-a-Rug-Step-1-Version-2.jpg",
            " A very ColorFull Carpet ",
            30.99,

        ),
    ];

    constructor() {
    }

    render() {
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for (const prod of this.products) {
            const productItem = new ProductItem(prod);
            const prodEl = productItem.render();
            prodList.append(prodEl);
        }
        return prodList ;
    }
}

class Shop {
    render(){
        const renderHook = document.getElementById('app');
        this.cart = new ShoppingCart();
        const cartEl = this.cart.render();
        const productList = new ProductList();
        const prodListEl = productList.render();
        productList.render();
        renderHook.append(cartEl);
        renderHook.append(prodListEl);

    }
}
class App{
    static cart ;
    static init(){
        const shop = new Shop() ;
        shop.render();
        this.cart = shop.cart;
    }
    static addProductToCart(product){
        this.cart.addProduct(product);
    }
}
App.init();
