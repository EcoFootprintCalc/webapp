"use server";

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export const fetchPresets = async () => {
    const response = await fetch(`${process.env.API_URL}/app/getpresets`);
    return await response.json();
}

export const postPreset = async (presetId, value) => {
    const response = await fetch(`${process.env.API_URL}/app/postdailypreset`, {
        method: "POST",
        body: JSON.stringify({presets: [{presetId: presetId, count: value}]}),
        headers: {"Content-Type": "application/json"}
    })
    return (await response.json()).calculatedCo2;
}

export const postCustom = async (prompt) => {
    const response = await fetch(`${process.env.API_URL}/app/postdailypresetai`, {
        method: "POST",
        body: JSON.stringify({DayDescription: prompt}),
        headers: {"Content-Type": "application/json"}
    })
    return (await response.json()).calculatedCo2;
}

export const signup = async (prevState, formData) => {
    const response = await fetch(`${process.env.API_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify({
            UserName: formData.get("user"),
            Email: formData.get("email"),
            Pwd: formData.get("password"),
            ProfileIMG: 1
        }),
        headers: {"Content-Type": "application/json"}
    })

    if (!response.ok) return {err: true};

    const signupResponse = await response.json();
    if (!signupResponse.success) {
        console.log(signupResponse);
        return {err: true};
    }

    const loginResponse = await fetch(`${process.env.API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({
            Username: formData.get("user"),
            Password: formData.get("password")
        }),
        headers: {"Content-Type": "application/json"}
    })

    if (!loginResponse.ok) return {err: true};

    const data = await loginResponse.json();
    if (!data.token) {
        console.log(data);
        return {err: true};
    }

    const token = data.token;

    const cookieStore = await cookies();

    cookieStore.set({
        name: "auth_token",
        value: token,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: "Strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7
    });

    redirect("/");

    return {err: false};
}

export const login = async (prevState, formData) => {
    const loginResponse = await fetch(`${process.env.API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({
            Username: formData.get("user"),
            Password: formData.get("password")
        }),
        headers: {"Content-Type": "application/json"}
    })

    if (!loginResponse.ok) return {err: true};

    const data = await loginResponse.json();
    if (!data.token) {
        console.log(data);
        return {err: true};
    }

    const token = data.token;

    const cookieStore = await cookies();

    cookieStore.set({
        name: "auth_token",
        value: token,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: "Strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7
    });

    redirect("/");

    return {err: false};
}

export const signout = async () => {
    const cookieStore = await cookies();
    cookieStore.set({
        name: "auth_token",
        value: '',
        secure: process.env.NODE_ENV !== 'development',
        sameSite: "Strict",
        path: "/",
        maxAge: -1
    });
    redirect("/auth/login");
}