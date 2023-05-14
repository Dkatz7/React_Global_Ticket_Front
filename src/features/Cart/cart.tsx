import React, { useEffect, useState } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import { getCartAsync, selectcartitems, delFromCartAsync, updTickesQuantityAsync, selectstatus } from './cartSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectLogged } from '../Login/loginSlice';
import { selectTmploggedUser } from '../Login/loginSlice';
import { makeOrderAsync, selectstatuspurchasses } from '../Purchasses/purchassesSlice';
import { ToastContainer, toast } from 'react-toastify';
import styles from "./Cart.module.css"
import 'bootstrap/dist/css/bootstrap.css';

export const Cart = () => {
  const cart = useAppSelector(selectcartitems || []);
  const logged = useAppSelector(selectLogged);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectTmploggedUser)
  const [ticketsquantity, setticketsquantity] = useState<number>()
  const [totalSum, settotalSum] = useState(0)
  const status = useAppSelector(selectstatus)
  const statuspurchasses = useAppSelector(selectstatuspurchasses)
  const [paid, setPaid] = useState(false);

  const handleSuccess = (paymentResult: any) => {
    setPaid(true);
    makeOrderAsync(cart);
    console.log(paymentResult);
  };
  const paypalButtonStyle = {
    layout: "vertical",
    shape: "rect",
    label: "paypal",
    tagline: false,
    height: 40,
  };

  const PayPalPayment = () => {
    const [paid, setPaid] = useState(false);
    const handleSuccess = (paymentResult: any) => {
      setPaid(true);
      console.log(paymentResult);
    }
  };

  const paypalOptions = {
    clientId: "AR7CIxAqZttZGPp9FneTjXj5HJYE86U2Z9HDOTRBvKAd7oPJANZM_gh9tLTAQBIYUrj2EnTE6IQbBpUg",
    currency: "USD",
    intent: "capture",
    vault: false,
  };

  useEffect(() => {
    dispatch(getCartAsync(user))
  }, [])

  useEffect(() => {
    settotalSum(cart.reduce((acc, item) => acc + Number(item.subtotal), 0))
  }, [cart])

  return (
    <div>
      <div className={styles["cart-container"]}>
        <ToastContainer position="top-right"
          autoClose={5000}
          limit={5}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" />
        {logged ?
          <div>
            <br></br>
            <h1 className={styles["cart-title"]}>Cart</h1>
            <h2>Events in my cart: {cart.length}</h2>
            {cart.map((item, i) => (
              <div className={styles["cart-item"]} key={i}>
                <p>Event name:{item.event}, Total Price:{item.subtotal}, quantity:</p>
                <br></br>
                <input type={"number"} defaultValue={item.quantity} onChange={(e) => setticketsquantity(Number(e.target.value))} min="1" />
                <button onClick={() => dispatch(updTickesQuantityAsync({ id: item.id || -1, quantity: ticketsquantity || 1 })).then(() => dispatch(getCartAsync(user)))}>Update quantity of tickets</button>
                <button id="delete-cart-btn" className='btn btn-danger' onClick={() => dispatch(delFromCartAsync(item.id || -1)).then(() => dispatch(getCartAsync(user)))} >Delete from cart</button>
              </div>
            ))}
            <br></br>
            <div>
              <div className={styles["cart-summary"]}>
                <p>Sub-total number of items: {cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
                <br />
                <p>Sub-total price: {totalSum}</p>
              </div>
            </div>
            <div className={styles["checkout-button"]}>
              {/* <PayPalButton
              options={paypalOptions}
              amount={totalSum}
              onSuccess={handleSuccess}
              onError={(err: any) => console.log(err)}
            /> */}
            </div>
            <button className='btn btn-success' onClick={() => dispatch(makeOrderAsync(cart))}>Order Tickets!</button>
            {statuspurchasses === "success" ? (<h2>Your order as been made successfuly!
              you can check your order in your profile dashbored
            </h2>) : ""}
          </div>
          : <h1>You must signin to see your cart </h1>}
      </div >
    </div > 
  )
}

