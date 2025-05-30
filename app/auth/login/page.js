"use client";

import Logo from "@/components/Logo";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {useActionState} from "react";
import {login} from "@/lib/api";

const Login = () => {
    const [state, formAction, pending] = useActionState(login, {err: false});

    return (
        <div>
            <main className="flex flex-col w-full h-screen items-center justify-center gap-8 bg-background px-6">
                <div className="absolute inset-0 [background-size:30px_30px] [background-image:radial-gradient(#444444_1px,transparent_1px)] hidden lg:block"/>
                <div className="neumorphic p-4 rounded-2xl bg-background z-10 flex flex-col gap-8 items-center w-full md:w-2xl">
                    <Logo className="scale-90 my-4"/>
                    <form action={formAction} className="w-full flex flex-col gap-4">
                        <Input aria-label="Username" placeholder="Username" type="text" size="lg" name="user" required
                               classNames={{inputWrapper: "neumorphic data-[hover]:neumorphic-in data-[focus]:neumorphic-in h-12"}}/>
                        <Input aria-label="Password" placeholder="Password" type="password" size="lg" name="password" required
                               classNames={{inputWrapper: "neumorphic data-[hover]:neumorphic-in data-[focus]:neumorphic-in h-12"}}/>
                        <Button size="lg" color={state.err ? "danger" : "primary"} className="text-background w-full" disabled={pending} type="submit">Log in!</Button>
                        <a href="/auth/signup" className="text-foreground/50 text-sm font-normal text-center">Don&apos;t have an account? Sign up now!</a>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Login;