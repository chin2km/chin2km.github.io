export interface ITheme {
    bg: string;
    header: {
        bg: string;
        filter: string;
        shadow: string;
    };
    teaser: {
        bg: string;
        shadow: string;
    };
    details: {
        shadow: string;
    };
}
export interface ThemeProp {
    theme: ITheme;
}

export const THEMES: Record<string, ITheme> = {
    dark: {
        bg: "rgb(27, 27, 27)",
        header: {
            bg: "rgba(27, 27, 27, 0.5)",
            filter: "blur(5px)",
            shadow: "none"
        },
        teaser: {
            bg: "linear-gradient(to bottom, rgb(27, 27, 27), #000)",
            shadow: "2px 3px 15px #000",
        },
        details: {
            shadow: "0px 5px 20px #000000de",
        },
    },
    light: {
        bg: "#e9f2ff",
        header: {
            bg: "rgba(230, 240, 255, 0.7)",
            filter: "blur(5px)",
            shadow: "rgba(130,130,130,0.1) 0px 8px 7px 0px, rgba(0,0,0,0.09) 2px 3px 5px 0px"
        },
        teaser: {
            bg: "linear-gradient(to bottom,#d4dde8,#e9f2ff)",
            shadow: "2px 3px 15px #dadada",
        },
        details: {
            shadow: "0px 5px 20px #dadada",
        },
    },
};
