"use client";

import {Button} from "@heroui/button";
import {Car, MapPinned, Plus} from "lucide-react";
import {addToast, NumberInput, useDisclosure} from "@heroui/react";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/modal";
import {Divider} from "@heroui/divider";
import {Input} from "@heroui/input";
import {useActionState, useEffect, useMemo, useState} from "react";
import {addVehicle} from "@/lib/api";

const hashColor = (str) => {
    if (!str) return 'hsl(0,0%,80%)';

    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash |= 0;
    }
    return `hsl(${hash % 360},67%,50%)`;
}

const Vehicles = ({loadedVehicles = []}) => {
    const [vehicles, setVehicles] = useState(loadedVehicles);

    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const {isOpen: isTripOpen, onOpen: onTripOpen, onOpenChange: onTripOpenChange} = useDisclosure();

    const {isOpen: isAddOpen, onOpen: onAddOpen, onOpenChange: onAddOpenChange} = useDisclosure();
    const [enteredName, setEnteredName] = useState('');
    const newColor = useMemo(() => hashColor(enteredName), [enteredName]);

    const [addState, addAction, addPending] = useActionState(addVehicle, {err: false});

    useEffect(() => {
        if (addState.finish) {
            if (addState.err) addToast({
                title: "Error",
                description: "Something went wrong",
                color: "danger", timeout: 2000, shouldShowTimeoutProgress: true
            })
            else {
                addToast({
                    title: "Vehicle added",
                    description: "New vehicle has been added successfully",
                    color: "success", timeout: 2000, shouldShowTimeoutProgress: true
                });
                setVehicles(addState.newVehicles);
            }
            onAddOpenChange();
        }


    }, [addState]);

    return (
        <div className="relative w-full bg-background rounded-2xl p-4 flex flex-col items-center lg:items-start">
            {vehicles.length === 0 &&
                <>
                    <h4 className="w-full text-center my-4 text-lg">You don&apos;t have any saved vehicles!</h4>
                    <Button color='primary' variant='light' size='lg' className="w-full font-medium" startContent={<Plus/>} onPress={onAddOpen}>Add your first vehicle now!</Button>
                </>
            }
            {vehicles.length > 0 &&
                <>
                    {vehicles.map(v => (
                        <div key={v.id} className="w-full flex flex-col gap-2 mt-2">
                            <div className="flex flex-row items-center w-full gap-4">
                                <Car size={32} style={{color: hashColor(v.name)}}/>
                                <p className="max-w-1/2 truncate">{v.name}</p>
                                <p className="ml-auto text-foreground/50 max-w-1/3 truncate">{v.brand} {v.type}</p>
                                <Button color='primary' variant='light' isIconOnly
                                        onPress={() => {
                                            setSelectedVehicle(v);
                                            onTripOpen();
                                        }}
                                ><MapPinned/></Button>
                            </div>
                            <Divider/>
                        </div>
                    ))}
                    <Button color='primary' variant='light' className="w-full mt-2" startContent={<Plus/>} onPress={onAddOpen}>Add another vehicle</Button>
                </>
            }

            <Modal isOpen={isTripOpen} onOpenChange={onTripOpenChange} backdrop='blur'
                   classNames={{base: "bg-background shadow-xl"}}>
                <ModalContent>
                    {selectedVehicle && ((onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Record a trip with {selectedVehicle.name}</ModalHeader>
                            <form>
                                <ModalBody className='flex flex-col gap-2 mb-2'>
                                    <div className="flex flex-row items-center">
                                        <Car size={64} className="flex-1/2" style={{color: hashColor(selectedVehicle.name)}}/>
                                        <div className="flex flex-col gap-1 flex-1/2">
                                            <p className="font-bold text-lg">{selectedVehicle.name}</p>
                                            <p className="text-foreground/50">{selectedVehicle.brand} {selectedVehicle.type}</p>
                                            <p>{selectedVehicle.avgFuelConsumption} L / 100 km</p>
                                        </div>
                                    </div>
                                    <Divider className="my-1"/>
                                    <NumberInput placeholder="Distance traveled" aria-label="Kilometers traveled" name="distance" className="w-full" required
                                                 minValue={1} step={1} size='lg' endContent={"km"}
                                                 classNames={{inputWrapper: "neumorphic data-[hover]:neumorphic-in data-[focus]:neumorphic-in h-12"}}
                                    />
                                </ModalBody>
                                <ModalFooter className="flex flex-row justify-evenly bg-black/10">
                                    <Button color="primary" className="text-background w-1/3" onPress={onClose}>
                                        Save
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    ))}
                </ModalContent>
            </Modal>
            <Modal isOpen={isAddOpen} onOpenChange={onAddOpenChange} backdrop='blur'
                   classNames={{base: "bg-background shadow-xl"}}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">New vehicle</ModalHeader>
                            <form action={addAction}>
                                <ModalBody className='flex flex-col gap-2 mb-2'>
                                    <div className="flex flex-row items-center">
                                        <Car size={48} className="flex-1/3" style={{color: newColor}}/>
                                        <div className="grid grid-cols-2 gap-2 flex-2/3">
                                            <Input placeholder="Make" aria-label="Make" name="make" className="col-span-1" required
                                                   classNames={{inputWrapper: "neumorphic data-[hover]:neumorphic-in data-[focus]:neumorphic-in h-12"}}/>
                                            <Input placeholder="Model" aria-label="Model" name="model" className="col-span-1" required
                                                   classNames={{inputWrapper: "neumorphic data-[hover]:neumorphic-in data-[focus]:neumorphic-in h-12"}}/>
                                            <NumberInput placeholder="Fuel consumption" aria-label="Fuel consumption" name="consumption" className="col-span-2 text-sm font-light"
                                                         required
                                                         minValue={0} step={0.1} endContent="L/100km"
                                                         classNames={{inputWrapper: "neumorphic data-[hover]:neumorphic-in data-[focus]:neumorphic-in h-12"}}/>
                                        </div>
                                    </div>
                                    <Divider/>
                                    <Input placeholder="Name" aria-label="Name" name="carname" required className="col-span-2"
                                           value={enteredName} onValueChange={setEnteredName}
                                           classNames={{inputWrapper: "neumorphic data-[hover]:neumorphic-in data-[focus]:neumorphic-in h-12"}}/>

                                </ModalBody>
                                <ModalFooter className="flex flex-row justify-evenly bg-black/10">
                                    <Button color="primary" className="text-background w-1/3" type="submit" isLoading={addPending}>
                                        Save
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};
export default Vehicles;