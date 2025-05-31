"use client"

import {Info, Lightbulb} from "lucide-react";
import {Button} from "@heroui/button";
import {Modal, ModalBody, ModalContent, ModalHeader} from "@heroui/modal";
import {useDisclosure} from "@heroui/react";

const Recommendation = ({recommendation}) => {
    const {isOpen, onOpenChange, onClose} = useDisclosure();

    return (
        <div className="relative bg-background rounded-2xl p-4 flex flex-col items-center">
            <div className="w-full flex flex-row items-center justify-between gap-2">
                <div>
                    <Lightbulb size="24"/>
                </div>
                <p>{recommendation.short}</p>
                <Button isIconOnly className="w-16 m-0" onPress={onOpenChange}><Info size="24"/></Button>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'
                   classNames={{
                       base: "bg-background shadow-xl"
                   }}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Recommendation</ModalHeader>
                            <ModalBody className='flex flex-col gap-2 mb-2'>
                                <p>{recommendation.long}</p>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default Recommendation;