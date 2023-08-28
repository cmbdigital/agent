import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux';

const Navbar = () => {

    const router = useRouter();

    const { pathname } = router;

    const { user } = useSelector(state => state.auth)

    return (
        <div className='fixed h-12 border-b w-full flex justify-center items-center bg-white text-sm font-bold shadow-sm'>
            <img src='/logo.png' className='w-28 h-auto absolute left-2' />
            Hi, {user?.name}
        </div>
    )
}

export default Navbar