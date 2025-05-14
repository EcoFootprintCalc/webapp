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

const AccountCard = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

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
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">My account</ModalHeader>
                            <ModalBody>
                                biggest boy
                            </ModalBody>
                            <ModalFooter className="mx-auto">
                                <Button color="danger" onPress={signout}>
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