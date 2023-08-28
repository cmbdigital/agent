import { getCustomer, getOrder } from '@/services/api';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const CustomerDetails = () => {

    const router = useRouter();
    const { id } = router.query;

    const [customer, setCustomer] = React.useState({});

    useEffect(() => {
        document.title = 'Customer Details'
    }, [])

    useEffect(() => {
        // fetch product details
        const fetchCustomerDetails = async () => {
            try {
                const { data } = await getCustomer(id);
                setCustomer(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchCustomerDetails();
    }, [id])

    return (

        <div className='p-4'>

            <div className='w-full bg-white rounded-lg p-4 mx-auto'>
                <div className='flex justify-between items-center'>
                    <h1 className='uppercase font-bold text-sm'>Customer Details</h1>
                </div>
            </div>

            <div className='w-full bg-white rounded-lg p-4 mx-auto mt-10'>
                <h1 className='uppercase font-bold text-sm'>Customer Details</h1>

                <div className='gap-4 mt-4'>
                    <div className='flex justify-between items-center w-full'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Name</label>
                            <p className='text-sm'>{customer?.name}</p>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Code</label>
                            <p className='text-sm'>{customer?.phone}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full mt-4'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Adhaar Number</label>
                            <p className='text-sm'>{customer?.adhaarNumber}</p>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>PAN Number</label>
                            <p className='text-sm'>{customer?.panNumber}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full mt-4'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Branch Code</label>
                            <p className='text-sm'>{customer?.branchCode}</p>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>PAN Number</label>
                            <p className='text-sm'>{customer?.pan}</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className='w-full bg-white rounded-lg p-4 mx-auto mt-10'>
                <h1 className='uppercase font-bold text-sm'>Guarantor Details</h1>

                <div className='gap-4 mt-4'>
                    <div className='flex justify-between items-center w-full'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Name</label>
                            <p className='text-sm'>{customer?.guarantorName}</p>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Adhaar Number</label>
                            <p className='text-sm'>{customer?.guarantorAdhaarNumber}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full mt-4'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Phone</label>
                            <p className='text-sm'>{customer?.guarantorPhone}</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className='w-full bg-white rounded-lg p-4 mx-auto mt-10'>
                <h1 className='uppercase font-bold text-sm'>Address Details</h1>

                <div className='gap-4 mt-4'>
                    <div className='flex justify-between items-center w-full'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Address</label>
                            <p className='text-sm'>{customer?.address}</p>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>City</label>
                            <p className='text-sm'>{customer?.city}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full mt-4'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>State</label>
                            <p className='text-sm'>{customer?.state}</p>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Pincode</label>
                            <p className='text-sm'>{customer?.pincode}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CustomerDetails