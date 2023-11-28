import React, { useEffect, useState } from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const TestDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [test, setTest] = useState(useLoaderData());
    const { _id,name,description,testDate,price,slot,testImg} = test;
    const testId =_id;
   // console.log(test)
   const isSlotAvailable = slot > 0;
   console.log(isSlotAvailable)
   const [promoCode, setPromoCode] = useState('');
   const [discountRate, setDiscountRate] = useState(0);
   const [activeBanner, setActiveBanner] = useState(null);

   useEffect(() => {
     // Fetch active banner data when the component mounts
     fetch('http://localhost:5000/active-banners')
       .then((res) => res.json())
       .then((data) => {
         // Assuming the response structure contains promoCode and discountRate properties
         if (data && data.banners && Array.isArray(data.banners) && data.banners.length > 0) {
            const firstBanner = data.banners[0];
            setActiveBanner(firstBanner);
            setDiscountRate(firstBanner.discount); // Use the correct property name
            setPromoCode(firstBanner.coupon); // Use the correct property name
          } else {
            console.log('No active banners found');
          }
       })
       .catch((error) => {
         console.error('Error fetching active banner:', error);
       });
   }, []);
//   const {coupon,discount}= activeBanner
console.log(promoCode);
console.log(discountRate);
const getDiscountRateFromPromoCode = () => {
    const promoCodeInput = document.getElementById('promoCodeInput');
          const appliedPromoCode = promoCodeInput.value.trim();
          if(appliedPromoCode===promoCode)
          {
            console.log('ok')
          }
          else{
            console.log('not ok')
          }

    // Placeholder, replace with actual logic
  };
  let isPromoCodeApplied = false;

  const handleBookNowClick = async () => {
    if (isSlotAvailable) {
      const result = await Swal.fire({
        title: 'Payment',
        html: `
          <div>
            <p>Original Price: $${price}</p>
            <p>Discount Rate: ${discountRate}%</p>
            <p>Discounted Price: $${calculateDiscountedPrice()}</p>
          </div>
          <input type="text" id="promoCodeInput" placeholder="Enter Promo Code" class="swal2-input">
          <button id="applyPromoCodeBtn" class="swal2-confirm swal2-styled">
            Apply Promo Code
          </button>
          <Link to ="/payment"><div id="payButtonContainer"></div></link>
        `,
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: 'Cancel',
        didOpen: () => {
          const promoCodeInput = document.getElementById('promoCodeInput');
          const applyPromoCodeBtn = document.getElementById('applyPromoCodeBtn');
          const payButtonContainer = document.getElementById('payButtonContainer');
  
          applyPromoCodeBtn.addEventListener('click', (event) => {
            event.preventDefault();
            const appliedPromoCode = promoCodeInput.value.trim();
  
            if (appliedPromoCode === promoCode) {
              // Set the variable to true when the promo code is successfully applied
              isPromoCodeApplied = true;
  
              // Disable the "Apply Promo Code" button after successful application
              applyPromoCodeBtn.disabled = true;
  
              // Create and append the "Pay Now" button
              const payButton = document.createElement('button');
            payButton.innerText = 'Pay Now';
            payButton.className = 'swal2-confirm swal2-styled';
  
            payButton.addEventListener('click', () => {
              // Handle the payment logic or navigate to the payment page
              console.log('Payment logic goes here');
              const discountPrice = calculateDiscountedPrice();
              console.log(testId,discountPrice)
              navigate('/payment', { state: {name, testId, discountPrice} });
              Swal.close();
            });
  
            payButtonContainer.appendChild(payButton);
            Swal.update({ html: result.options.html + payButtonContainer.outerHTML });
  
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Invalid Promo Code',
                text: 'Please enter a valid promo code.',
              });
            }
          });
  
          // Disable the "Apply Promo Code" button if the promo code is successfully applied
          if (isPromoCodeApplied) {
            applyPromoCodeBtn.disabled = true;
          }
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No Available Slots',
        text: 'Sorry, there are no available slots for this test.',
      });
    }
  };
  
  // Calculate discounted price based on the original price and discount rate
  const calculateDiscountedPrice = () => {
    const discountedPrice = price - (price * discountRate) / 100;
    return discountedPrice.toFixed(2); // Keep two decimal places
  };
  
  // Function to get the discount rate from the promo code (you need to implement this)

    return (
        <div>
             <div className="bg-white dark:bg-gray-800 flex relative z-20 items-center overflow-hidden">
        <div className="container mx-auto px-6 flex relative py-16">
            <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
                
                <h1 className="font-bebas-neue uppercase text-6xl sm:text-5xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                   {name}
                </h1>
                <p className="text-sm sm:text-base text-gray-700 dark:text-white">
                    {description}
                </p>
                <div className=" pb-2 mt-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Price:{price}$</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Slot :{slot}</span>
            <span className="inline-block bg-red-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Date :{testDate}</span>
            
            </div>
                <div className="flex mt-8">
                    
                    <button onClick={handleBookNowClick}   className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-pink-500 text-pink-500 dark:text-white hover:bg-pink-500 hover:text-white text-md"  >
                        Book Now
                    </button>
                </div>
            </div>
            <div className="hidden sm:block sm:w-1/3 lg:w-3/5   relative">
                <img src={testImg} className="max-w-xs md:max-w-sm h-3/4 m-auto"/>
            </div>
        </div>
    </div>
        </div>
    );
};

export default TestDetails;