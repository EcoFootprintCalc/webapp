export default function manifest() {
    return {
        name: 'Sanyi',
        short_name: 'Sanyi',
        description: 'Calculate your ecological footprint with Sanyi',
        start_url: '/calculator',
        display: 'standalone',
        background_color: '#292d30',
        theme_color: '#292d30',
        icons: [
            {
                "src": "/web-app-manifest-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/web-app-manifest-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ]
    }
}