import React, { useState, useEffect } from 'react';
import Failed from './Faild.png';
import Success from './success.jpg';
import { Link, useLocation, useParams } from 'react-router-dom';

const PaymentPage = () => {
    const location = useLocation();
    const [paymentStatus, setPaymentStatus] = useState(null);
    const {txn} = useParams()
    if(!txn){
        console.log("I am Not")
    }else(
        console.log("I am Yes")
    )
    const handleClear = () => {
        if (!txn) {
            console.log("I am Not");
        } else {
            sessionStorage.removeItem('checkOut');
            sessionStorage.removeItem('cart');
        }
    };
    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const successParam = params.get('success');
        if (successParam === 'true') {
            setPaymentStatus('success');
        } else if (successParam === 'false') {
            setPaymentStatus('failure');
        }
    }, [location.search]);
    useEffect(()=>{
        handleClear()
    },[])
    return (
        <div className="min-h-[70vh] flex flex-col justify-center items-center">
            {paymentStatus === 'success' && (
                <div className="rounded-md p-4 mb-4">
                    <h1 className="text-4xl font-bold mb-8">Payment Successful</h1>
                    <div>
                        <img src={Success} alt="Success" className="max-w-full h-auto" style={{ maxWidth: '300px' }} />
                    </div>
                    <div className='text-center'>
                        <Link to={'/'} className='bg-gray-900 py-2 px-3 text-white rounded-sm'>Go To Home <i className="ri-home-2-line"></i></Link>
                    </div>
                </div>
            )}
            {paymentStatus === 'failure' && (
                <div className="rounded-md p-4 mb-4">
                    <p className="text-4xl font-bold mb-8">Payment Failure</p>
                    <div>
                        <img src={Failed} alt="Failed" className="max-w-full h-auto" style={{ maxWidth: '300px' }} />
                    </div>
                </div>
            )}
            {!paymentStatus && (
                <div className="text-4xl font-bold mb-8">Processing...</div>
            )}
        </div>
    );
};

export default PaymentPage;
