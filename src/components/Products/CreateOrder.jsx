import { createOrder } from '@/services/api';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import React from 'react'
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const CreateOrder = ({ setSteps }) => {

    const router = useRouter();
    const order = useSelector(state => state.payload.order);

    const handlePlaceOrder = async () => {
        try {
            const { data } = await createOrder(order);
            console.log(data)
            toast.success("Order Placed Successfully");
            router.push(`/orders/${data.data._id}`);
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
        }
    }

    return (
        <>
            <div className='flex justify-center items-center p-4 bg-blue-50'>
                <h1>Review Order</h1>
            </div>

            <div className='flex justify-between items-center p-4 border-b'>
                <span className='text-sm capitalize'>Processing Fee</span>
                <span className='text-sm font-semibold capitalize'>₹{order.emi.emiProcessingFee}</span>
            </div>

            <div className='flex justify-between items-center p-4 border-b'>
                <span className='text-sm capitalize'>Down Payment</span>
                <span className='text-sm font-semibold capitalize'>₹{order.emi.emiDownPayment}</span>
            </div>

            <div className='flex justify-between items-center p-4 border-b'>
                <span className='text-sm capitalize'>EMI</span>
                <span className='text-sm font-semibold capitalize'>₹{Math.round(Number(order.emi.emiAmount)).toLocaleString()} x {order.emi.emiTenure} {order.emi.emiTenure > 10 ? "Weeks" : "Months"}</span>
            </div>

            <div className='flex justify-between items-center p-4 border-b'>
                <span className='text-sm font-semibold capitalize'>Total Payment</span>
                <span className='text-sm font-semibold capitalize'>₹{order.totalPayment}</span>
            </div>

            <div className='flex justify-between items-center p-4 border-b'>
                <span className='text-sm capitalize'>Order Total</span>
                <span className='text-sm font-semibold capitalize'>₹{order.orderTotal}</span>
            </div>

            <div className='flex justify-between items-center p-4 border-b'>
                <span className='text-sm capitalize'>Order Date</span>
                <span className='text-sm font-semibold capitalize'>{format(new Date(), 'dd MMMM yyyy')}</span>
            </div>

            <div className='flex justify-between items-center p-4 border-b'>
                <span className='text-sm capitalize'>Customer Name</span>
                <span className='text-sm font-semibold capitalize'>{order.customer.name}</span>
            </div>

            <div className='flex justify-between items-center p-4 border-b'>
                <span className='text-sm capitalize'>Customer Phone</span>
                <span className='text-sm font-semibold capitalize'>{order.customer.phone}</span>
            </div>

            <div className='flex justify-between items-center p-4 border-b'>
                <span className='text-sm capitalize'>Customer Adhaar</span>
                <span className='text-sm font-semibold capitalize'>{order.customer.adhaarNumber}</span>
            </div>

            <div className='flex justify-between items-center p-4 border-b'>
                <span className='text-sm capitalize'>Customer PAN</span>
                <span className='text-sm font-semibold capitalize'>{order.customer.panNumber}</span>
            </div>

            <div className='flex justify-between items-center p-4 border-b'>
                <span className='text-sm capitalize'>Guarantor Name</span>
                <span className='text-sm font-semibold capitalize'>{order.guarantor.name}</span>
            </div>

            <div className='flex justify-between items-center p-4 border-b'>
                <span className='text-sm capitalize'>Guarantor Phone</span>
                <span className='text-sm font-semibold capitalize'>{order.guarantor.phone}</span>
            </div>

            <div className='flex justify-center items-center p-4'>
                <button className='text-xs bg-blue-500 btn capitalize hover:bg-blue-600 text-white rounded-lg w-full' onClick={handlePlaceOrder}>Confirm</button>
            </div>

        </>
    )
}

export default CreateOrder;