module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: "#f19066",
                success: "#10B981",
                warning: "#FBBF24",
                error: "#EF4444",
                peach: {
                    100: "#f2bfa7",
                    200: "#f0ad8d",
                    300: "#f3a683",
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
