import React from "react";
import Loader from "./Loader";
import { Toaster } from "react-hot-toast";
import { useLoadingWithRefresh } from "@/hooks/useLoadingWithRefresh";
// import Footer from "./Footer";
import { useRouter } from "next/router";
import BottomBar from "./BottomBar";
import Navbar from "./Navbar";
import LeftSideBar from "./LeftSideBar";

const Layout = ({ children }) => {
    const router = useRouter();
    const { loading } = useLoadingWithRefresh();

    const path = router.pathname;

    return loading ? (
        <Loader />
    ) : (
        <>
            {!path.includes("auth") && <Navbar />}
            {!path.includes("auth") && <div className='hidden lg:block w-2/12'>
                <LeftSideBar />
            </div>}
            <main className={`min-h-screen mx-auto text-sm tracking-tighter ${!path.includes("auth") && "pt-12 pb-20 lg:ml-64"} bg-gray-100`}>
                {children}
            </main>
            {!path.includes("auth") && <BottomBar />}
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            {/* {!path.includes("auth") && <Footer />} */}
        </>
    );
};

export default Layout;
