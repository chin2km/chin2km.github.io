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
        bg: "rgb(234, 239, 247)",
        header: {
            bg: "rgba(234, 239, 247, 0.84)",
            filter: "blur(5px)",
            shadow: "rgba(130,130,130,0.1) 0px 8px 7px 0px, rgba(0,0,0,0.09) 2px 3px 5px 0px"
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
