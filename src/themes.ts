export interface ITheme {
    bg: string;
    header: {
        bg: string;
        filter: string;
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
        bg: "rgb(240, 242, 245)",
        header: {
            bg: "rgba(255, 255, 255, 0.58)",
            filter: "blur(5px)",
        },
        teaser: {
            bg: "linear-gradient(to bottom,rgb(241, 242, 245),#eee8f7)",
            shadow: "2px 3px 15px #dadada",
        },
        details: {
            shadow: "0px 5px 20px #dadada",
        },
    },
};
