import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import Checkout from './Checkout';
import { useLocation } from 'react-router-dom';
const stripPromise  =  loadStripe( 'pk_test_51OHNoHIryX4yUmDT6oujIsBR7eXMNclBx73cWTBcIvUbO5l4mfHeMHfTlhukBnnBZ1PzrGo0BFeOO3EdmysRC3La002oALSG6F')
const Payment = () => {
    const location = useLocation();
  const { state } = location;

  if (!state || !state.discountPrice) {
    
    return null;
  }

  const { testId, discountPrice } = state;
    console.log(testId,discountPrice);
    return (
        <div>
           <Elements stripe={stripPromise}>
           <Checkout discountPrice={discountPrice} testId={testId} />
           </Elements>
        </div>
    );
};

export default Payment;