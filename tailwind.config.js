module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: {
                    light: "#f2b9a0",
                    DEFAULT: "#f19066",
                    dark: "#f56425",
                },
                success: "#10B981",
                warning: "#FBBF24",
                error: "#EF4444",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
