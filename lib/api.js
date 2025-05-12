"use server";

export const fetchPresets = async () => {
    const response = await fetch(`${process.env.API_URL}/app/getpresets`);
    return await response.json();
}

export const postPreset = async (presetId, value) => {
    const response = await fetch(`${process.env.API_URL}/app/postdailypreset`, {
        method: "POST",
        body: JSON.stringify({presets: [{presetId : presetId, count: value}]}),
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