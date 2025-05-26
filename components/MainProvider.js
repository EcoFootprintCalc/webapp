import {getFootprint, getUser} from "@/lib/api";
import {UserProvider} from "@/components/Providers";

const MainProvider = async ({children}) => {
    return (
        <UserProvider user={await getUser()} sum={await getFootprint()}>
            {children}
        </UserProvider>
    );
}

export default MainProvider;