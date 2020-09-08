class Product{
    constructor(title , image ,desc ,price) {
        this.title = title ;
        this.imageUrl = image ;
        this.price = price ;
        this.description =desc ;
    }
}
class ElementAttribute{
    constructor(attrName ,attrValue) {
        this.name= attrName ;
        this.value = attrValue
    }
}
class Component {
    constructor(renderHook) {
        this.hookId = renderHook ;
    }
    createRootElement(tag , cssClasses , attributes){
        const rootElement = document.createElement(tag) ;
        if(cssClasses){
            rootElement.className = cssClasses ;
        }
        if(attributes && attributes.length>0){
            for (const attr of attributes){
                rootElement.setAttribute( attr.name , attr.value );
            }
        }
        document.getElementById(this.hookId).append(rootElement);
        return rootElement ;
    }
}

class ShoppingCart extends Component{
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

    constructor(renderHookId) {
        super(renderHookId);
    }
    addProduct(product){
        const updatedItems = [...this.items]
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }
    render(){
        const cartEl = this.createRootElement('section' , 'cart')
        cartEl.innerHTML =`
            <h1>Title : \$${0}</h1>
            <button>Order Now !</button>
        `;
        this.totalOutput = cartEl.querySelector('h1');
    }
}
class ProductItem extends Component{
    constructor(product ,renderHookId) {
        super(renderHookId);
        this.product = product ;
    }
    addToCart(){
        App.addProductToCart(this.product);
    }
    render(){
        const prodEl = this.createRootElement('li' ,'product-item');
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
    }

}
class ProductList extends Component{
    constructor(renderHookId) {
        super(renderHookId);
    }
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

    render() {
        const Attribute =[new ElementAttribute('id' ,'prod-list')];
        const prodList = this.createRootElement('ul','product-list',Attribute);
        for (const prod of this.products) {
            const productItem = new ProductItem(prod ,'prod-list');
             productItem.render();
        }
    }
}

class Shop {
    render(){
        this.cart = new ShoppingCart('app');
        this.cart.render('app');
        const productList = new ProductList('app');
        productList.render();

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
