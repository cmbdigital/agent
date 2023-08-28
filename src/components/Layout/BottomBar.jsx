import React from 'react'
import { HiOutlineHome, HiOutlineTag, HiOutlineUserGroup, HiBars3, HiOutlineNewspaper } from 'react-icons/hi2'
import { BiPlusCircle } from 'react-icons/bi'
import { useRouter } from 'next/router';
import Link from 'next/link';

const BottomBar = () => {

    const router = useRouter();
    const path = router.pathname;

    return (
        <nav className='lg:hidden flex items-center fixed bottom-0 w-full h-16 text-gray-500 bg-white border-t shadow-lg z-40 justify-between'>
            <Link href='/' className={`cursor-pointer flex justify-start items-center flex-col gap-1 p-2 w-full py-1 ${path === ("/") && "font-bold text-blue-500"}`}>

                <HiOutlineHome className='text-xl' />
                <h1 className='text-xs whitespace-nowrap'>Home</h1>

            </Link>
            <Link href='/products' className={`cursor-pointer flex justify-start items-center flex-col gap-1 p-2 w-full py-1 ${path.includes("/products") && "font-bold text-blue-500"}`}>

                <HiOutlineTag className='text-xl' />
                <h1 className='text-xs whitespace-nowrap'>Products</h1>
            </Link>
            <Link href='/customers' className={`cursor-pointer flex justify-start items-center flex-col gap-1 p-2 w-full py-1 ${path.includes("/customers") && "font-bold text-blue-500"}`}>

                <HiOutlineUserGroup className='text-xl' />
                <h1 className='text-xs whitespace-nowrap'>Customers</h1>
            </Link>
            <Link href='/orders' className={`cursor-pointer flex justify-start items-center flex-col gap-1 p-2 w-full py-1 ${path.includes("/orders") && "font-bold text-blue-500"}`}>

                <HiOutlineNewspaper className='text-xl' />
                <h1 className='text-xs whitespace-nowrap'>Orders</h1>
            </Link>
        </nav>
    )
}

export default BottomBar