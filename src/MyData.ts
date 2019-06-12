import { hrefHtml, inlineEmoji } from "./utils/styleSettings";

const getExperience = (month: number, day: number, year: number) => {
    let yearNow = new Date().getFullYear();
    let monthNow = new Date().getMonth() + 1;
    let dayNow = new Date().getDate();
    if ((monthNow === month && dayNow < day) || monthNow < month) {
        return yearNow - year - 1;
    } else {
        return yearNow - year;
    }
};

export const INTRO: string[] = [
    `${inlineEmoji(`👋🏻`)} Hey there`,
    `I am Chintu Kishen Kuthirangattil Mohandas. I'm an Indian${inlineEmoji(
        `🇮🇳`,
    )}living in Hamburg, Germany ${inlineEmoji(`🇩🇪`)}`,
    `I am a fullstack software developer with over ${getExperience(10, 1, 2012)} years of work experience...`,
    `I love developing software products based on web technologies ${inlineEmoji(
        `❣️`,
    )}. And sometimes I design them too, like this one ${inlineEmoji(`😉`)}`,
    `I've got a keen eye for details. Plus, I'm really good at team work ${inlineEmoji(`🤩`)}`,
    `I work with latest tools & tech like: ReactJs, NodeJs, Redux, RxJs, MongoDb, TypeScript etc ${inlineEmoji(`🚀`)}`,
    `Some of my works ( only the ones I'm allowed to share 👀🙏🏻) are detailed below ${inlineEmoji(`↓`)}`,
    `Enjoy your time here and have a nice day ${inlineEmoji(`😇`)}`,
];

export const CONTACT_CHAT: string[] = [
    `Hello again ${inlineEmoji(`👀`)}`,
    "here are some of the places on web where you can find me...",
    `or alternatively you can email me @ ${hrefHtml("mailto:me.chintukm@gmail.com")}`,
    `looking forward to new connections ${inlineEmoji(`😇`)}`,
];

export interface ISocial {
    name: string;
    link: string;
}

export const SOCIAL: ISocial[] = [
    {
        name: "github",
        link: "https://github.com/chin2km",
    },
    {
        name: "twitter",
        link: "https://twitter.com/chin2km",
    },
    {
        name: "linkedin",
        link: "https://in.linkedin.com/in/chin2km",
    },
    {
        name: "instagram",
        link: "https://www.instagram.com/chintukm",
    },
    {
        name: "facebook",
        link: "https://www.facebook.com/chin2km",
    },
    {
        name: "gmail",
        link: "mailto:me.chintukm@gmail.com",
    },
];

export interface IWork {
    name: string;
    description: string;
    tags?: string[];
    link?: string[];
    images: number;
    chat: string[];
}
const REACT = "ReactJs";
const ANGULAR = "AngularJs";
const ELECTRON = "ElectronJs";
const MATERIAL = "MaterialUi";
const REDUX = "Redux";
const RESPONSIVE = "ResponsiveUi";
const UI_UX = "UI/UX";
const WPF = "WPF";
const XAML = "XAML";
const DESKTOP = "Desktop";

const LOREM_IPSUM = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gdignissimos ducimus qui blanditiis praesentium voluptatum deleniti.",
    "Ut enim ad minim veniam, quis nostrud exercitation",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore. Grerum facilis est et expedita distinctio. Nam libero tempore..",
    "Excepteur sint occaecat cupidatat non proident quibusdam et aut officiis debitis aut rerum necessitatibus saepe even.",
    "I laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ❤️",
];

export const WORKS: IWork[] = [
    {
        name: "Designers Portal",
        description: "Responsive Web Design, Development",
        tags: [ANGULAR, MATERIAL],
        images: 4,
        chat: [
            "Designers Portal is a online shop for one of the well known Sports Shoes brand",
            "It allows the shoe designers in the company to showcase their work in progress designs and also allows them to see the designs from other designers",
            "It has features like Timelines for the Shoe Design, Calendar management etc",
            "Its built using AngularJs, Material bootstrap",
            "I was the main developer in the team. I enjoyed developing it and giving inputs on UI/UX too",
        ],
    },
    {
        name: "StarWars",
        description: "React.JS app, Development",
        tags: [REACT, REDUX, RESPONSIVE, MATERIAL],
        link: ["here is the link to the application..", hrefHtml("http://chin2km.github.io/React-Redux-Tuto")],
        images: 4,
        chat: LOREM_IPSUM,
    },
    {
        name: "Workflow System",
        description: "Responsive Web Design, Development",
        tags: [ANGULAR, RESPONSIVE, MATERIAL],
        images: 4,
        chat: LOREM_IPSUM,
    },
    {
        name: "Fantasy League",
        description: "Web Design,Responsive Design, Online Game",
        tags: [ANGULAR, RESPONSIVE, MATERIAL],
        images: 3,
        chat: LOREM_IPSUM,
    },
    {
        name: "Glasswall",
        description: "Web Design,Responsive Design, Development",
        tags: [ANGULAR, RESPONSIVE, MATERIAL],
        images: 4,
        chat: LOREM_IPSUM,
    },
    {
        name: "OnePush",
        description: "Responsive Web Design, Development",
        tags: [ANGULAR, RESPONSIVE, MATERIAL],
        link: ["here is the link to the application..", hrefHtml("http://chin2km.github.io/Angular-Again")],
        images: 4,
        chat: LOREM_IPSUM,
    },
    {
        name: "Infusion",
        description: "Web Design, Development",
        tags: [ANGULAR, RESPONSIVE, MATERIAL],
        images: 2,
        chat: LOREM_IPSUM,
    },
    {
        name: "Leadersboard",
        description: "Web Design, Development",
        tags: [ANGULAR, RESPONSIVE, MATERIAL],
        images: 3,
        chat: LOREM_IPSUM,
    },
    {
        name: "Assets Syncer",
        description: "Cross-platfrom App Development",
        tags: [ELECTRON, ANGULAR, DESKTOP],
        images: 1,
        chat: LOREM_IPSUM,
    },
    {
        name: "Solution Studio",
        description: "Desktop Development(Windows), Responsive",
        tags: [WPF, XAML, DESKTOP],
        images: 3,
        chat: LOREM_IPSUM,
    },
    {
        name: "Groups",
        description: "Desktop Development(Windows), Chat App",
        tags: [WPF, XAML, DESKTOP],
        link: ["here is the link to the demo..", hrefHtml("https://1drv.ms/v/s!Aitx-4hcnVYtiYJ_EGZqDPBNLzQM_w")],
        images: 6,
        chat: LOREM_IPSUM,
    },
    {
        name: "Learning Paths",
        description: "Responsive Web Design, Development",
        tags: [ANGULAR, RESPONSIVE, MATERIAL],
        link: ["here is the link to the demo..", hrefHtml("http://chin2km.github.io/My-Angular1.5-App")],
        images: 3,
        chat: LOREM_IPSUM,
    },
    {
        name: "Chin2km Portfolio old",
        tags: [REACT, RESPONSIVE, UI_UX],
        description: "Web Design,Mobile Responsive Design",
        images: 4,
        chat: LOREM_IPSUM,
    },
];
