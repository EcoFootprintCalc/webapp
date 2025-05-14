import {Button} from "@heroui/button";
import {ChartLine, Ellipsis, Goal, LayoutDashboard, Users} from "lucide-react";
import LightToggle from "@/components/LightToggle";
import Logo from "@/components/Logo";

const MenuCard = () => {
    return (
        <div className="fixed w-full lg:w-[25%] xl:w-[20%] 2xl:w-[15%] p-6 lg:h-screen left-0 bottom-0 group">
            <div className="absolute inset-6 bg-primary invisible group-hover:visible transition-transform blur-[10px] animate-pulse rounded-2xl"/>
            <div className="
                relative w-full h-auto lg:h-full z-10 group-hover:scale-101 transition-transform flex flex-col items-center bg-background rounded-2xl
                neumorphic group-hover:shadow-none
            ">
                <div className="absolute inset-0 [background-size:30px_30px] [background-image:radial-gradient(#444444_1px,transparent_1px)] hidden lg:block"/>
                <Logo className="z-20 w-full items-center justify-center py-16 select-none bg-radial from-background to-transparent hidden lg:flex"/>
                <div className='hidden lg:flex flex-col gap-4 items-center w-full px-6'>
                    <Button color='primary' variant='light' size='lg' className="w-full font-medium" startContent={<LayoutDashboard/>}>Dashboard</Button>
                    <Button color='secondary' variant='light' size='lg' className="w-full font-medium" startContent={<Goal/>}>Goals</Button>
                    <Button color='secondary' variant='light' size='lg' className="w-full font-medium" startContent={<ChartLine/>}>History</Button>
                    <Button color='default' variant='light' size='lg' className="w-full font-medium" startContent={<Ellipsis/>}>More</Button>
                </div>

                <div className='flex lg:hidden flex-row gap-4 items-center justify-around w-full'>
                    <Button color='primary' variant='light' size='lg' isIconOnly className=""><LayoutDashboard/></Button>
                    <Button color='secondary' variant='light' size='lg' isIconOnly className=""><Goal/></Button>
                    <Button color='secondary' variant='light' size='lg' isIconOnly className=""><ChartLine/></Button>
                    <Button color='default' variant='light' size='lg' isIconOnly className=""><Ellipsis/></Button>
                </div>

                <div className='absolute bottom-4 flex-col items-center gap-4 hidden lg:flex'>
                    <LightToggle/>
                    <p className='text-foreground/50 text-sm font-normal'>designed in Szombathely</p>
                </div>
            </div>
        </div>
    );
}

export default MenuCard;