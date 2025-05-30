"use server";

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export const fetchPresets = async () => {
    const response = await fetch(`${process.env.API_URL}/app/getpresets`);
    return await response.json();
}

export const postPreset = async (presetId, value) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    const response = await fetch(`${process.env.API_URL}/app/postdailypreset`, {
        method: "POST",
        body: JSON.stringify({PresetId: presetId, Count: value}),
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}
    })
    const data = await response.json();

    return {footprint: data.currentFootprint, sum: data.summarizedDailyFootprint};
}

export const postCustom = async (prompt) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    const response = await fetch(`${process.env.API_URL}/app/postaiactivity`, {
        method: "POST",
        body: JSON.stringify({ActivityDescription: prompt}),
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}
    })
    const data = await response.json();

    console.log(data);

    return {footprint: data.currentActivityFootprint, sum: data.summarizedDailyFootprint};
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

    let signupResponse;
    const text = await response.text();
    console.log(text);
    try {
        signupResponse = await response.json();
    } catch (e) {
        // The response was not JSON (probably HTML error page)
        return { err: true, message: "Invalid server response" };
    }

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

    let data;
    try {
      data = await loginResponse.json();
    } catch (e) {
      // The response was not JSON (probably HTML error page)
      return { err: true, message: "Invalid server response" };
    }
    if (!data.token) return {err: true};

    const token = data.token;

    const cookieStore = await cookies();

    cookieStore.set({
        name: "auth_token",
        value: token,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true
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
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true
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

export const getDailyBreakdown = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    const response = await fetch(`${process.env.API_URL}/app/getsummarizeddailyfootprint`, {
        method: "GET",
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}
    });

    if (!response.ok) return undefined;
    const data = await response.json();

    return data.dailyFootprintAmount;
}

export const getMonthlyData = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    const response = await fetch(`${process.env.API_URL}/app/getovertimefootprint`, {
        method: "GET",
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}
    });

    if (!response.ok) return undefined;
    const data = await response.json();
    if (!data.success) return undefined;

    return {
        list: data.footprintList,
        max: data.footprintList.reduce((acc, cur) => Math.max(acc, cur.footprintAmount), 0),
        missingRatio: data.footprintList.reduce((acc, cur) => acc + (cur.footprintAmount === 0 ? 1 : 0), 0) / data.footprintList.length
    };
}

export const getMonthlyBreakdown = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    const response = await fetch(`${process.env.API_URL}/app/getmonthlyfootprint?date=${new Date().toISOString().split('T')[0]}`, {
        method: "GET",
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}
    });

    if (!response.ok) return undefined;
    const data = await response.json();

    return data.monthlyFootprint;
}

export const getFootprint = async () => {
    const data = await getDailyBreakdown();

    if (!data) return undefined;

    return data.reduce((acc, cur) => acc + cur.footprintAmount, 0);
}

export const getVehicles = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    const response = await fetch(`${process.env.API_URL}/user/getcars`, {
        method: "GET",
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}
    });

    if (!response.ok) return undefined;
    const data = await response.json();

    return data.cars;
}

export const addVehicle = async (prevState, formData) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    const response = await fetch(`${process.env.API_URL}/user/addcar`, {
        method: "POST",
        body: JSON.stringify({
            Brand: formData.get("make"),
            Type: formData.get("model"),
            AvgFuelConsumption: formData.get("consumption"),
            Name: formData.get("carname")
        }),
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}
    });

    if (!response.ok) return {err: true,  finish: true};

    const data = await response.json();
    if (!data.success) return {err: true,  finish: true};

    return {err: false,  finish: true, newVehicles: await getVehicles()};
}

export const saveTrip = async (prevState, formData) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    const response = await fetch(`${process.env.API_URL}/app/postdailytravel`, {
        method: "POST",
        body: JSON.stringify({
            Persons: (formData.get("passengers") ?? 0) + 1,
            Distance: formData.get("distance"),
            CarId: formData.get("vehicle")
        }),
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}
    });

    if (!response.ok) return {err: true,  finish: true};

    const data = await response.json();
    if (!data.success) return {err: true,  finish: true};

    return {err: false,  finish: true, newFootprint: data.summarizedDailyCost, tripFootprint: data.actualTripCost};
}

export const getCategories = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    const response = await fetch(`${process.env.API_URL}/app/getcategories`, {
        method: "GET",
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}
    });

    if (!response.ok) return undefined;
    const data = await response.json();

    const categories = {};
    for (const category of data) {
        categories[category.id] = category;
    }
    return categories;
}

export const getChatResponse = async (message) => {
    if (!message.trim()) return "Enter a message";

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    const response = await fetch(`${process.env.API_URL}/gemini/generatetext`, {
        method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({prompt: message})
    });

    if (!response.ok) return "Sorry something went wrong";
    const data = await response.json();

    return data.result;
}