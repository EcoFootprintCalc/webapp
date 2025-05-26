import MenuCard from "@/components/MenuCard";
import AccountCard from "@/components/AccountCard";
import {Suspense} from "react";
import MainProvider from "@/components/MainProvider";
import Loading from "@/components/Loading";

const Home = async ({children}) => {
    return (
        <>
            <MenuCard/>
            <Suspense fallback={<Loading/>}>
                <MainProvider>
                    <AccountCard/>
                    {children}
                </MainProvider>
            </Suspense>
        </>
    )

};

export default Home;