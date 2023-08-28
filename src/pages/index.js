import PendingCollection from '@/components/Dashboard/PendingCollection'
import { collectEMI, getFinancedProducts } from '@/services/api'
import { ProtectedRoute } from '@/utils/ProtectedRoute'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import CollectEmiModal from '@/components/Dashboard/CollectEmiModal'
import { useDispatch, useSelector } from 'react-redux'
import { setDashboard } from '@/redux/dashboardSlice'

const Dashboard = () => {

  const dispatch = useDispatch()
  const [showModal, setShowModal] = React.useState(false);
  const financedProducts = useSelector(state => state.dashboard.dashboard);
  const [selectedOrder, setSelectedOrder] = React.useState(null)

  const fetchFinancedProducts = async () => {
    try {
      const { data } = await getFinancedProducts()
      dispatch(setDashboard((data)))
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  useEffect(() => {
    fetchFinancedProducts()
  }, [])

  const handleCollectEMI = async (id) => {
    setSelectedOrder(id);
    setShowModal(!showModal)
  }

  return (
    <ProtectedRoute>
      <div className='p-4 flex flex-col gap-4'>
        <div className='w-full bg-white rounded-lg p-4 mx-auto'>
          <h1 className='uppercase font-bold text-sm'>Dashboard</h1>

          <div className='mt-2'>
            <h1 className='font-semibold text-sm'>Date: {new Date().toDateString()}</h1>
          </div>
          <div className='mt-2'>
            <h1 className='font-semibold text-sm'>Next Collection</h1>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-2 mt-2'>
              {
                financedProducts?.map((product, index) => (product.emi.emiPendingDates[0] && <div key={index} className="stats shadow bg-gray-100 hover:border-black border cursor-pointer" onClick={() => handleCollectEMI(product)}>
                  <div className="stat">
                    <div className="stat-title">Amount to Collect</div>
                    <div className="stat-value text-lg">₹{Math.ceil(product.emi.emiAmount)}</div>
                    <div className="stat-desc">
                      Date: {new Date(product.emi.emiPendingDates[0]).toDateString()}
                      <br />
                      From: {product.customer.name}
                    </div>
                  </div>
                </div>))
              }
            </div>

          </div>
        </div>

        {/* PRODUCT FINANCED */}
        <div className='rounded-xl bg-white h-80 w-full p-4 overflow-hidden'>
          <div className='flex justify-between items-center'>
            <h1 className='uppercase font-bold text-sm'>Product Financed</h1>
            <h1 className='uppercase font-bold text-sm'>{financedProducts.length}</h1>
          </div>

          <div className='flex flex-col gap-2 mt-2 overflow-auto h-72 pb-6'>
            {
              financedProducts.map((product, index) => (
                <Link href={`/products/${product.product.skuId}`}>
                  <div key={index} className='flex flex-col lg:flex-row justify-between items-start lg:items-center bg-gray-100 p-3 rounded-lg hover:border-black border cursor-pointer'>

                    <div className='flex items-center gap-2'>
                      <img src='/empty.webp' className='h-12 w-12 rounded-lg' />
                      <div>
                        <h1 className='text-sm'>{product.product.name}</h1>
                        <h1 className='text-sm font-semibold'>₹{product.product.discountedPrice}</h1>
                      </div>
                    </div>

                    <div>
                      <h1 className='text-sm'>{new Date(product.date).toDateString()}</h1>
                      <h1 className='text-sm font-semibold'>EMI tenure: {product.emi.emiTenure} {product.emi.emiTenure > 10 ? "Weeks" : "Months"}</h1>
                    </div>
                  </div>
                </Link>
              ))
            }
          </div>

        </div>

        <div className=''>
          <div className='rounded-xl bg-white h-80 w-full p-4 overflow-hidden'>
            <h1 className='uppercase font-bold text-sm'>Pending Collection Till Now</h1>

            <div className='flex flex-col gap-2 overflow-auto h-72 pb-6 mt-4'>
              {
                financedProducts.map((product, index) => (<PendingCollection product={product} key={index} />))
              }
            </div>
          </div>
        </div>
      </div>

      {
        showModal && <CollectEmiModal showModal={showModal} setShowModal={setShowModal} selectedOrder={selectedOrder} fetchFinancedProducts={fetchFinancedProducts} />
      }

    </ProtectedRoute>
  )
}

export default Dashboard