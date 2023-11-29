import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../firebase/AuthProvider';
import Swal from 'sweetalert2';

const Checkout = ({testId,name,testDate, discountPrice }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [testSlotNumber, setTestSlotNumber] = useState(0);
    const { user } = useContext(AuthContext);
    
    const navigate = useNavigate();
    
    console.log(testId,name,discountPrice)
    
    useEffect(() => {
        // Make an API call to get the test information based on testId
        const fetchTestInformation = async () => {
          try {
            const response = await fetch(`https://diagnostic-server-site.vercel.app/testDetails/${testId}`);
            const data = await response.json();
    
            if (response.ok) {
              
              const currentSlotNumber = data.slot;
              console.log(currentSlotNumber)
            
              setTestSlotNumber(currentSlotNumber);
            } else {
              console.error('Failed to fetch test information:', data.error);
            }
          } catch (error) {
            console.error('Error fetching test information:', error);
          }
        };
    
        if (testId) {
          fetchTestInformation();
        }
      }, [testId]);
    
    useEffect(() => {
        fetchClientSecret();
      }, [discountPrice]);
    
      const fetchClientSecret = async () => {
        try {
          const response = await fetch('https://diagnostic-server-site.vercel.app/create-payment-intent', {
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
                const reserve = {
                    email: user?.email,
                    price: discountPrice ,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to 
                    testId : testId,
                    testName:name,
                    testDate :testDate,
                    status: 'pending'
                }

                fetch('https://diagnostic-server-site.vercel.app/reserve', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(reserve)
            })
            .then(res => res.json())
                .then(data => {
                    if(data.insertedId){
                        Swal.fire({
                            title: 'Success!',
                            text: 'Payment Successfully',
                            icon: 'success',
                            confirmButtonText: 'Ok',
                        });
                      //  toast.success('Register & Database saved successful!'); 
                      navigate(location?.state?.from || '/dashboard/userAppointment');
                    }
                    console.log(data)
                })

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