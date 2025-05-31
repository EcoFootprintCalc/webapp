import {heroui} from "@heroui/react";

export default heroui(
    {
        defaultTheme: "dark",
        defaultExtendTheme: "dark",
        themes: {
            dark: {
                colors: {
                    'foreground': '#c9caca',
                    'background': '#292d30',
                    'primary': '#5ce59c',
                    'secondary': '#dfa0d2',
                    'accent': '#008FC4',
                    'default': {
                        foreground: '#bdbdbd',
                        "100": '#292d30',
                        "200": '#272b2e',
                        DEFAULT: '#292d30'
                    },
                    danger: '#e9373d'
                }
            }
        },
        layout: {

        }
    }
);

// https://www.realtimecolors.com/?colors=c9caca-292d30-5ce59c-dfa0d2-2ec8fc&fonts=Nunito-Rubik