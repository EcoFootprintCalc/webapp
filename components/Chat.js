"use client";
import {useState} from "react";
import {getChatResponse} from "@/lib/api";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {cn} from "@/lib/utils";
import {ChartLine, MessageCircleQuestion} from "lucide-react";
import {Modal, ModalBody, ModalContent, ModalHeader} from "@heroui/modal";
import {useDisclosure} from "@heroui/react";

const Chat = ({className}) => {
    const [messages, setMessages] = useState([]);
    const [pending, setPending] = useState(false);

    return (
        <div className={className}>
            <div className="p-4 flex-1 overflow-y-auto max-h-[50dvh]">
                {messages.map((msg, index) => (
                    <div key={index}
                         className={cn("mb-2 text-sm", msg.role === "user" ? "text-right italic" : "text-left")}>
                        <p className="block px-2 py-1 rounded bg-muted">{msg.content}</p>
                    </div>
                ))}
                {pending && <div className="text-sm text-muted">Sanyi is typing...</div>}
            </div>
            <form onSubmit={async event => {
                event.preventDefault();
                setPending(true);
                const formData = new FormData(event.currentTarget);
                const message = formData.get("message");
                event.currentTarget.reset();
                setMessages((prev) => [...prev, {role: "user", content: message}]);
                const response = await getChatResponse(message);
                setMessages((prev) => [...prev, {role: "bot", content: response}]);
                setPending(false);
            }} className="flex flex-row">
                <Input
                    name="message" type="text" autoComplete="off"
                    placeholder="Ask how to be more eco-friendly..." aria-label="Message"
                    variant="flat"
                />
                <Button type="submit" className="p-2" color="primary" variant="faded" isDisabled={pending}>Send</Button>
            </form>
        </div>
    );
};

export const ChatModal = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <Button color='secondary' variant='light' size='lg' isIconOnly onPress={onOpenChange}><MessageCircleQuestion/></Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'
                   classNames={{
                       base: "bg-background shadow-xl"
                   }}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Eco-friendly advice assistant</ModalHeader>
                            <ModalBody className='flex flex-col gap-2 mb-2'>
                                <Chat/>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default Chat;