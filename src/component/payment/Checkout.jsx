import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../firebase/AuthProvider';

const Checkout = ({ discountPrice }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    
    const { user } = useContext(AuthContext);
    
    const navigate = useNavigate();
    
    console.log(discountPrice)

    useEffect(() => {
        fetchClientSecret();
      }, [discountPrice]);
    
      const fetchClientSecret = async () => {
        try {
          const response = await fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ discountPrice }),
          });
    
          const data = await response.json();
    
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            setError('Failed to fetch client secret');
          }
        } catch (error) {
          console.error('Error fetching client secret:', error);
          setError('Error fetching client secret');
        }
      };
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);
            
                // now save the payment in the database
                // const payment = {
                //     email: user?.email,
                //     price: totalPrice,
                //     transactionId: paymentIntent.id,
                //     date: new Date(), // utc date convert. use moment js to 
                //     cartIds: cart.map(item => item._id),
                //     menuItemIds: cart.map(item => item.menuId),
                //     status: 'pending'
                // }

                // const res = await axiosSecure.post('/payments', payment);
                // console.log('payment saved', res.data);
                // refetch();
                // if (res.data?.paymentResult?.insertedId) {
                //     Swal.fire({
                //         position: "top-end",
                //         icon: "success",
                //         title: "Thank you for the taka paisa",
                //         showConfirmButton: false,
                //         timer: 1500
                //     });
                //     navigate('/dashboard/paymentHistory')
                // }

            }
        }

    }

    return (
        <div className='w-2/3'>
          <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
        </div>
    );
};

export default Checkout;