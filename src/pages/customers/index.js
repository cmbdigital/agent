import CustomerCard from '@/components/Customers/CustomerCard'
import OrderCard from '@/components/Orders/OrderCard'
import { getAllAgentCustomers, getAllOrders } from '@/services/api'
import { ProtectedRoute } from '@/utils/ProtectedRoute'
import React from 'react'
import { useDispatch } from 'react-redux'

const Customers = () => {
    const [loading, setLoading] = React.useState(false)
    const [customers, setCustomers] = React.useState([])

    const dispatch = useDispatch()

    React.useEffect(() => {
        setLoading(true)

        const fetchCustomers = async () => {
            try {
                const { data } = await getAllAgentCustomers();
                setCustomers(data);
            } catch (error) {
                console.log(error);
            }

            setLoading(false)
        }

        fetchCustomers()
    }, [])

    return (
        <ProtectedRoute>
            <div className='p-4'>
                <div className='w-full border-b pb-4'>
                    <div className='flex justify-start items-center gap-2'>
                    </div>
                </div>

                <div className='p-4 my-4 bg-white rounded-lg'>
                    <h1 className='font-bold'>Customer List</h1>

                    <div className='mt-4 gap-2 flex flex-col'>
                        {customers?.length > 0 ? (
                            customers.map((customer, index) => <CustomerCard key={index} customer={customer} />)
                        ) : (
                            <p className='text-center text-gray-500'>No Customer found</p>
                        )}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default Customers