import Providers from "@/components/Providers";
import {getFootprint, getUser} from "@/lib/api";

const Home = async ({children}) => {
    return <Providers user={await getUser()} footprint={await getFootprint()}>
        {children}
    </Providers>
};

export default Home;