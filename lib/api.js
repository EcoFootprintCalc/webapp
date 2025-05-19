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
    if (!data.token) return {err: true};

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
    if (!data.token) return {err: true};

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

export const editUser = async (prevState, formData) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) return {err: true};

    let passwordOk = false;
    let picOk = false;

    if (formData.get("oldpassword") && formData.get("newpassword")) {
        const passwordResponse = await fetch(`${process.env.API_URL}/user/changepassword`, {
            method: "POST",
            body: JSON.stringify({
                oldPassword: formData.get("oldpassword"),
                newPassword: formData.get("newpassword"),
            }),
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}
        });

        if (!passwordResponse.ok) passwordOk = 'failure';
        else {
            const data = await passwordResponse.json();
            if (data.success) passwordOk = data.success ? 'success' : 'failure';
        }
    }

    if (formData.get("pic")) {
        const picResponse = await fetch(`${process.env.API_URL}/user/changeavatar`, {
            method: "POST",
            body: JSON.stringify({
                AvatarId: formData.get("pic")
            }),
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}
        });

        if (!picResponse.ok) picOk = 'failure';
        else {
            const data = await picResponse.json();
            if (data.success) picOk = data.success ? 'success' : 'failure';
        }
    }

    return {err: false, success: true, passwordOk, picOk};
}

export const getUser = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    const response = await fetch(`${process.env.API_URL}/user/getprofile`, {
        method: "GET",
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}
    })

    if (!response.ok) return undefined;
    const data = await response.json();

    return data.user;
}