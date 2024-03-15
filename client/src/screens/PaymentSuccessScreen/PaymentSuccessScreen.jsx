import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './PaymentSuccessScreen.module.css';

const PaymentSuccessScreen = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handler = () => {
    navigate('/');
  }
  
  return (
    <div className={styles.mainWrapper}>
      <div>
        <h2>Payment SuccessFull....</h2>
        <p><span>Payment Id :- </span>{state ? state.payment_id : ""}</p>
        <button onClick={handler}>Go To Home</button>
      </div>    
    </div>
  )
}

export default PaymentSuccessScreen
