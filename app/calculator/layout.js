import Providers from "@/components/Providers";
import {getFootprint, getUser} from "@/lib/api";
import MenuCard from "@/components/MenuCard";
import AccountCard from "@/components/AccountCard";

const Home = async ({children}) => {
    return <Providers user={await getUser()} footprint={await getFootprint()}>
        <MenuCard/>
        <AccountCard/>
        {children}
    </Providers>
};

export default Home;