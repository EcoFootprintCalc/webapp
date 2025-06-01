import MenuCard from "@/components/MenuCard";
import AccountCard from "@/components/AccountCard";
import {Suspense} from "react";
import MainProvider from "@/components/MainProvider";
import Loading from "@/components/Loading";
import Chat from "@/components/Chat";

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
            <Chat className="fixed bottom-6 right-6 w-90 bg-background rounded-2xl neumorphic hidden lg:flex flex-col z-50 p-2"/>
        </>
    )

};

export default Home;