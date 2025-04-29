import Image from "next/image";
import {Tooltip} from "@heroui/tooltip";

const AccountCard = () => {
    return (
        <div className="fixed top-6 right-6 group">
            <div className="absolute inset-0 bg-primary invisible group-hover:visible transition-transform blur-[6px] animate-pulse rounded-2xl"/>
            <Tooltip content="My Account">
                <div className="
                relative z-10 group-hover:scale-101 transition-transform bg-background rounded-full lg:rounded-2xl
                neumorphic group-hover:shadow-none p-2 lg:p-3 flex flex-row items-center gap-4
                ">

                    <div className="hidden lg:flex flex-col text-right font-light">
                        Welcome back
                        <span className="font-semibold">Abdullah Saleh</span>
                    </div>
                    <div className='w-12 h-12 relative rounded-full overflow-hidden'>
                        <Image alt="Profile pic" src="/bigstew.jpg" fill className='object-cover'/>
                    </div>

                </div>
            </Tooltip>
        </div>
    );
}

export default AccountCard;