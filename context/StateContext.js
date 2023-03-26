import React, { createContext , useContext , useState ,useEffect} from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children}) =>{
    const [showCart, setShowCart] = useState(false);
    const [showMenu, setShowMenu ] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [ totalQuantities, setTotalQuantities ] = useState(0);
    const [qty, setQty] = useState(1);
    const [homePage,setHomepage] = useState(true);
 

    let foundProduct;
    
    const toggleHome = (state) =>{
      setHomepage(state);
    }

    const onAdd = (product, quantity) => {
      const checkProductInCart = cartItems.find((item) => item['slug']['current'] === product['slug']['current']);
      
      setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
      
      if(checkProductInCart) {
        const updatedCartItems = cartItems.map((cartProduct) => {
          if(cartProduct.slug.current === product.slug.current) return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity
          }
          {
            return cartProduct
          }
        }
      )
  
        setCartItems(updatedCartItems);
      } else {
        product.quantity = quantity;
        
        setCartItems([...cartItems, { ...product }]);
      }
  
      toast.success(`Proizvod dodat u korpu: (${product.name} (${quantity}))`);
    } 

    const onRemove = (product) => {
        foundProduct = cartItems.find((item)=> item.slug.current === product.slug.current);
        const newCartItems = cartItems.filter((item)=> item.slug.current !== product.slug.current);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity );
        setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemQuantity = (id,value) =>{
        foundProduct = cartItems.find((item)=>item.slug.current === id)
        let index = cartItems.findIndex((product)=> product.slug.current === id)
        const newCartItems = cartItems.filter((item) => item.slug.current !== id)

        if(value === 'inc'){
            setCartItems([...newCartItems.slice(0, index), {...foundProduct, quantity: foundProduct.quantity + 1}, ...newCartItems.slice(index)]);
            setTotalPrice((prevTotalPrice)=> prevTotalPrice + foundProduct.price);
            setTotalQuantities (prevTotalQuantities => prevTotalQuantities + 1);
        }else if(value === 'dec'){
            if(foundProduct.quantity > 1) {
            setCartItems([...newCartItems.slice(0, index), {...foundProduct, quantity: foundProduct.quantity - 1}, ...newCartItems.slice(index)]);
            setTotalPrice((prevTotalPrice)=> prevTotalPrice - foundProduct.price);
            setTotalQuantities (prevTotalQuantities => prevTotalQuantities - 1);
            }
        }
    }

    const incQty = () =>{
        setQty((prevQty)=> prevQty + 1);
    }

    const decQty = () =>{
        setQty((prevQty)=> {
            if(prevQty-1<1) return 1;
            return prevQty - 1;
            
        });
    }

    return(
        <Context.Provider
            value={{
              showMenu,
              setShowMenu,
              showCart,
              setCartItems,
              setShowCart,
              setTotalPrice,
              setTotalQuantities,
              cartItems,
              totalPrice,
              totalQuantities,
              qty,
              incQty,
              decQty,
              onAdd,
              toggleCartItemQuantity,
              onRemove,
              toggleHome,
              homePage
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)