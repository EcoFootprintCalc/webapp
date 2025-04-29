import {Nunito, Rubik} from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const rubik = Rubik({
    variable: "--font-rubik",
    subsets: ["latin"]
})

const nunito = Nunito({
    variable: "--font-nunito",
    subsets: ["latin"]
})

export const metadata = {
    title: "Sanyi",
    description: "Eco footprint calculator",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
        </head>
        <body
            className={`${rubik.variable} ${nunito.variable} antialiased bg-black`}
        >
        <Providers>
            {children}
        </Providers>
        </body>

        </html>
    );
}
