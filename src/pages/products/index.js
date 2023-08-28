import ProductCard from '@/components/Products/ProductCard'
import ProductTable from '@/components/Products/ProductTable'
import { setPayload } from '@/redux/payloadSlice'
import { getAllProductsOfBranch, getBranches } from '@/services/api'
import { ProtectedRoute } from '@/utils/ProtectedRoute'
import React from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

const Products = () => {

    const [showModal, setShowModal] = React.useState(false)
    const [tab, setTab] = React.useState('agent')
    const [users, setUsers] = React.useState([])
    const [products, setProducts] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [branches, setBranches] = React.useState([])
    const [selectedBranch, setSelectedBranch] = React.useState()

    const dispatch = useDispatch()

    React.useEffect(() => {
        setLoading(true)

        const fetchBranches = async () => {
            try {
                const { data } = await getBranches();
                setBranches(data.data);
            } catch (error) {
                console.log(error);
            }

            setLoading(false)
        }

        fetchBranches()
    }, [])

    const handleSelectBranch = (e) => {
        dispatch(setPayload({ branch: e.target.value }))
        setSelectedBranch(e.target.value)
    }

    const fetchProducts = async () => {

        if (!selectedBranch) {
            return toast.error('Please select a branch')
        }

        try {
            const { data } = await getAllProductsOfBranch(selectedBranch);
            setProducts(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ProtectedRoute>
            <div className='p-4'>

                <div className='w-full border-b pb-4'>
                    <div className='flex justify-start items-center gap-2'>
                        <select className='select py-2 px-2 border rounded-lg border-gray-400 font-medium bg-white capitalize text-xs w-full' onChange={handleSelectBranch}>
                            <option selected disabled>Select Branch</option>
                            {branches.map((branch, index) => (
                                <option key={index} value={branch._id}>{branch.name}</option>
                            ))}
                        </select>
                    </div>
                    <button className='text-xs bg-blue-500 btn capitalize hover:bg-blue-400 text-white rounded-full px-6 mt-4' onClick={fetchProducts}>
                        Fetch Products
                    </button>
                </div>

                <div className='p-4 my-4 bg-white rounded-lg'>
                    <h1 className='font-bold'>Product List</h1>

                    <div className='mt-4 gap-2 flex flex-col'>
                        {products.length > 0 ? (
                            products.map((product, index) => <ProductCard key={index} product={product} branch={selectedBranch} />)
                        ) : (
                            <p className='text-center text-gray-500'>No products found</p>
                        )}
                    </div>
                </div>

            </div>

        </ProtectedRoute>
    )
}

export default Products