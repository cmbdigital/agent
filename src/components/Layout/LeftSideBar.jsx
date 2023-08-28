import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '@/services/api'
import { setAuth } from '@/redux/authSlice'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { HiOutlineHome, HiOutlineLogout, HiOutlineOfficeBuilding } from 'react-icons/hi'
import { HiBars3, HiChatBubbleLeftRight, HiHome, HiOutlineNewspaper, HiOutlineTag, HiOutlineUserGroup, HiUser } from 'react-icons/hi2'
import { FaBell, FaBookmark } from 'react-icons/fa'
import { BiPlusCircle } from 'react-icons/bi'

const LeftSideBar = () => {

    const router = useRouter()
    const dispatch = useDispatch()

    const [showModal, setShowModal] = React.useState(false);

    useEffect(() => {
        if (router.pathname === '/login' || router.pathname === '/register') {
            router.replace('/')
        }
    }, [])

    useEffect(() => {
        // add title to the page
        document.title = 'Products | B2B Dashboard'
    }, [])

    const handleLogout = async () => {
        try {
            const { data } = await logout()
            dispatch(setAuth(data))
            toast.success('Logout Successfull')
            router.replace('/auth')
        } catch (err) {
            console.log(err)
        }
    }

    const path = router.pathname;

    return (
        <div className='fixed z-40 h-full w-64 bg-[#1E2640] flex justify-start items-center flex-col'>
            <div className="mt-12">
                <Image src='/logo-white.png' height={200} width={200} alt="" objectFit="contain" />
            </div>

            <div className='p-3 w-full mt-6 text-gray-400'>
                <Link href="/" className={`cursor-pointer flex items-center gap-2 hover:bg-gray-700 rounded-md overflow-hidden w-full p-3 hover:text-white ${path === ("/") && "font-bold text-white bg-gray-700"}`}>
                    <HiOutlineHome />
                    <h1 className='text-xs whitespace-nowrap'>Home</h1>
                </Link>
                <Link href="/products" className={`cursor-pointer flex items-center gap-2 hover:bg-gray-700 rounded-md overflow-hidden w-full p-3 hover:text-white ${path.includes("/products") && "font-bold text-white bg-gray-700"} mt-1`}>
                    <HiOutlineTag />
                    <h1 className='text-xs whitespace-nowrap'>Products</h1>
                </Link>
                <Link href="/orders" className={`cursor-pointer flex items-center gap-2 hover:bg-gray-700 rounded-md overflow-hidden w-full p-3 hover:text-white ${path.includes("/orders") && "font-bold text-white bg-gray-700"} mt-1`}>
                    <HiOutlineNewspaper />
                    <h1 className='text-xs whitespace-nowrap'>Orders</h1>
                </Link>
                <Link href="/customers" className={`cursor-pointer flex items-center gap-2 hover:bg-gray-700 rounded-md overflow-hidden w-full p-3 hover:text-white ${path.includes("/customers") && "font-bold text-white bg-gray-700"} mt-1`}>
                    <HiOutlineUserGroup />
                    <h1 className='text-xs whitespace-nowrap'>Customers</h1>
                </Link>
                <div className={`cursor-pointer flex items-center gap-2 hover:bg-gray-700 rounded-md overflow-hidden w-full p-3 hover:text-white mt-1`} onClick={() => setShowModal(!showModal)}>
                    <HiOutlineLogout />
                    <h1 className='text-xs whitespace-nowrap'>Logout</h1>
                </div>
            </div>

            {
                showModal && <>
                    <div className="fixed z-50 left-0 top-0 h-screen w-full bg-black opacity-50" onClick={() => setShowModal(!showModal)}></div>
                    <div className='fixed z-50 left-0 lg:left-1/2 lg:-translate-x-1/2 bottom-0 lg:bottom-1/2 lg:translate-y-1/2 bg-white rounded-t-lg w-full lg:w-1/3 shadow-xl overflow-auto'>
                        <div className='p-4'>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-lg font-bold'>Logout</h1>
                                <button className='text-lg font-bold' onClick={() => setShowModal(!showModal)}>X</button>
                            </div>

                            <div className='mt-4'>
                                <p className='text-sm'>Are you sure you want to logout?</p>
                            </div>

                            <div className='mt-4 flex justify-end'>
                                <button className='text-sm btn-sm btn bg-gray-400 mr-2' onClick={() => setShowModal(!showModal)}>Cancel</button>
                                <button className='text-sm btn btn-sm btn-error' onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default LeftSideBar