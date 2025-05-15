"use client"

import Image from "next/image";
import {Tooltip} from "@heroui/tooltip";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@heroui/modal";
import {Button} from "@heroui/button";
import {useDisclosure} from "@heroui/react";
import {signout} from "@/lib/api";
import {Divider} from "@heroui/divider";
import {useState} from "react";
import {cn} from "@/lib/utils";
import {Input} from "@heroui/input";


const profilePics = [
    {id: 0, src: "/salt.png"},
    {id: 1, src: "/fg.png"},
    {id: 2, src: "/joe.png"},
    {id: 3, src: "/turbo.png"}
]

const AccountCard = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [userPic, setUserPic] = useState(0);

    return (
        <div className="fixed top-6 right-6 group">
            <div className="absolute inset-0 bg-primary invisible group-hover:visible transition-transform blur-[6px] animate-pulse rounded-2xl"/>
            <Tooltip content="My Account">
                <div className="
                relative z-10 group-hover:scale-101 transition-transform bg-background rounded-full lg:rounded-2xl
                neumorphic group-hover:shadow-none p-2 lg:p-3 flex flex-row items-center gap-4 cursor-pointer
                " onClick={onOpen}>

                    <div className="hidden lg:flex flex-col text-right font-light">
                        Welcome back
                        <span className="font-semibold">Abdullah Saleh</span>
                    </div>
                    <div className='w-12 h-12 relative rounded-full overflow-hidden'>
                        <Image alt="Profile pic" src="/bigstew.jpg" fill className='object-cover'/>
                    </div>
                </div>
            </Tooltip>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'
                   classNames={{
                       base: "bg-background shadow-xl"
                   }}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Account settings</ModalHeader>
                            <ModalBody className='flex flex-col gap-2 mb-2'>
                                <div className='flex flex-col gap-2'>
                                    <h4>Profile picture</h4>
                                    <div className="flex flex-row items-center justify-evenly select-none">
                                        {profilePics.map(pic => (
                                            <div key={pic.id} className={cn("w-[23%] aspect-square relative overflow-hidden rounded-xl cursor-pointer z-50 hover:grayscale-0",
                                                userPic !== pic.id ? "grayscale-50 neumorphic" : '')}
                                                 onClick={() => setUserPic(pic.id)}
                                            >
                                                <Image alt="Profile pic" src={pic.src} fill className={cn('object-cover pointer-events-none transition-transform',
                                                    userPic === pic.id ? "scale-110" : '')}/>
                                                <div className={cn("absolute inset-0 neumorphic-in", userPic === pic.id ? "visible" : "invisible")}/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Divider/>
                                <h4>Change password</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <Input placeholder="Current password" type="password" className='col-span-1'
                                           classNames={{inputWrapper: "neumorphic data-[hover]:neumorphic-in data-[focus]:neumorphic-in h-12"}}/>
                                    <Input placeholder="New password" type="password" className='col-span-1'
                                           classNames={{inputWrapper: "neumorphic data-[hover]:neumorphic-in data-[focus]:neumorphic-in h-12"}}/>

                                </div>
                            </ModalBody>
                            <ModalFooter className="flex flex-row justify-evenly bg-black/10">
                                <Button color="primary" className="text-background w-1/3" onPress={onClose}>
                                    Save
                                </Button>
                                <Button color="danger" className="w-1/3" onPress={signout}>
                                    Sign out
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default AccountCard;