import OrderCard from '@/components/Orders/OrderCard'
import { getAllOrders, getAllProductsOfBranch, getBranches } from '@/services/api'
import { ProtectedRoute } from '@/utils/ProtectedRoute'
import React from 'react'
import { useDispatch } from 'react-redux'

const Orders = () => {
    const [loading, setLoading] = React.useState(false)
    const [orders, setOrders] = React.useState([])

    const dispatch = useDispatch()

    React.useEffect(() => {
        setLoading(true)

        const fetchOrders = async () => {
            try {
                const { data } = await getAllOrders();
                setOrders(data.data);
            } catch (error) {
                console.log(error);
            }

            setLoading(false)
        }

        fetchOrders()
    }, [])

    return (
        <ProtectedRoute>
            <div className='p-4'>

                <div className='w-full border-b pb-4'>
                    <div className='flex justify-start items-center gap-2'>
                    </div>
                </div>

                <div className='p-4 my-4 bg-white rounded-lg'>
                    <h1 className='font-bold'>Order List</h1>

                    <div className='mt-4 gap-2 flex flex-col'>
                        {orders.length > 0 ? (
                            orders.map((order, index) => <OrderCard key={index} order={order} />)
                        ) : (
                            <p className='text-center text-gray-500'>No Orders found</p>
                        )}
                    </div>
                </div>

            </div>

        </ProtectedRoute>
    )
}

export default Orders