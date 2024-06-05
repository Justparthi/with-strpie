import React, { useContext } from 'react';
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../assets/cart_cross_icon.png'
import {loadStripe} from '@stripe/stripe-js'


const CartItems = () => {
    const {getTotalCartAmount, all_product, cartItems, removeToCart} = useContext(ShopContext);
    console.log(getTotalCartAmount)

    const makePayment = (e)=> {
        
        e.preventDefault();
        if(getTotalCartAmount === ""){
            alert("please enter the amt")
        }
        else{
            var options = {
                key : "rzp_test_RgwmQoSGHNhvl1",
                key_secret: "37c9D1Swkdxb5kauKHglKB0W",
                amount: getTotalCartAmount() * 100,
                currency : "INR",
                name: "PROJECTS",
                description:"e-com",
                handler : function(response){
                    alert(response.razorpay_payment_id);
                },
                prefill:{
                    name:"parthiban",
                    email:"parthibanpavendhan@gmail.com",
                    contact:"9361725076",
                },
                notes:{
                    address:"Razor Corprate Office"
                },
                theme:{
                    color:"#3399cc"
                }
            }
            var pay = new window.Razorpay(options);
            pay.open()
        }
        

    }



    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />

            {all_product.map((e) =>{
                if(cartItems[e.id]>0){
                    return <div>
                    <div className="carditems-format cartitems-format-main">
                        <img src={e.image} alt="" className='carticon-product-icon'/>
                        <p>{e.name}</p>
                        <p>${e.new_price}</p>
                        <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                        <p>${e.new_price*cartItems[e.id]}</p>
                        <img src={remove_icon} onClick={() =>{removeToCart(e.id)}} alt=""  className='cartitems-remove-icon'/>
                    </div>
                    <hr />
                </div>
                }
                return null;
            })}

            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Total</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>SubTotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button onClick={makePayment}>Procced To CheckOut</button>
                </div>
                <div className='cartitems-promocode'>
                        <p>If you Have a promo code, Enter It here</p>
                        <div className='cartitem-promobox'>
                            <input type="text" placeholder='Promo Code'/>
                            <button>Submit</button>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default CartItems;
