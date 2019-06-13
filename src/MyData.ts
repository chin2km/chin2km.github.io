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
    tags?: string[];
    link?: string[];
    images: number;
    chat: string[];
}
const REACT = "ReactJs";
const STYLED = "StyledComponents";
const TYPESCRIPT = "Typescript";
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
        name: "Built by chin2km",
        tags: [REACT, STYLED, TYPESCRIPT],
        link: [
            "here is the link to the application..",
            hrefHtml("http://chin2km.github.io"),
            "and here is the link to the code repo..",
            hrefHtml("https://github.com/chin2km/chin2km.github.io"),
        ],
        images: 4,
        chat: [
            `'Built by chin2km' is my works portfolio ${inlineEmoji(
                `😇`,
            )} the site you are browsing now! Its a responsive web application built using React ${inlineEmoji(`❤️`)}`,
            `Its a PWA too. By being a PWA its installable as a webapp on Mobile/Desktop. And it works offline too ${inlineEmoji(
                `⚡️`,
            )}`,
            `I built it using technologies like React, Styled-components and is written in TypeScript`,
            `I had a portfolio in the past which was built using AngularJs. Here -> ${hrefHtml(
                "http://chin2km.github.io/chin2km-old-portfolio",
            )}`,
            `I loved building this, and found it difficult to give it a name and finally I settled with the name "built by chin2km" ${inlineEmoji(
                `👻`,
            )} `,
        ],
    },
    {
        name: "Designers Portal",
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
        tags: [REACT, REDUX, RESPONSIVE, MATERIAL],
        link: ["here is the link to the application..", hrefHtml("http://chin2km.github.io/React-Redux-Tuto")],
        images: 4,
        chat: [
            `'StarWars - The Dark Side' is a pet application I developed for mastering in the (then) new technologies like React Redux Redux-Saga etc`,
            `This application makes use of ${hrefHtml(
                "http://swapi.co",
            )} endpoint to display details about people and things in StarWar`,
            `I designed the UI/UX and developed it with ${inlineEmoji(`❤️`)} as always.`,
        ],
    },
    {
        name: "Workflow System",
        tags: [ANGULAR, RESPONSIVE, MATERIAL],
        images: 4,
        chat: LOREM_IPSUM,
    },
    {
        name: "Fantasy League",
        tags: [ANGULAR, RESPONSIVE, MATERIAL],
        images: 3,
        chat: [
            `'Fantasy League' is a Game where Cricket Fans in a big Corporate predict the outcome of Cricket matches and earn point when their predictions are correct`,
            `I used AngularJs and Materialize.css to build it`,
            `I designed the UI/UX and developed it with ${inlineEmoji(`❤️`)} as always.`,
        ],
    },
    {
        name: "Glasswall",
        tags: [ANGULAR, RESPONSIVE, MATERIAL],
        images: 4,
        chat: [
            `'Glasswall' is an Incidents Management tool built for a big corporate in India. This tool allows the HR team in the company to effectively keep track of incidents.`,
            `It had functionalities like Excel reports, calendar management, admin panels and a very complex dashboard.`,
            `I used AngularJs and Materialize.css to build it`,
            `I designed the UI/UX and developed it with ${inlineEmoji(`❤️`)} as always.`,
        ],
    },
    {
        name: "OnePush",
        tags: [ANGULAR, RESPONSIVE, MATERIAL],
        link: ["here is the link to the application..", hrefHtml("http://chin2km.github.io/Angular-Again")],
        images: 4,
        chat: [
            `'OnePush' is an pet application to do complex searches in Github repositories.`,
            `I used AngularJs and Materialize.css to build it`,
            `I designed the UI/UX and developed it with ${inlineEmoji(`❤️`)} as always.`,
        ],
    },
    {
        name: "Infusion",
        tags: [ANGULAR, RESPONSIVE, MATERIAL],
        images: 2,
        chat: [
            `'Infusion' is the website for annual sports meet for a big Corporate Company in India.`,
            `It had functionalities like admin CMS, daily news updates and functionality to register for sports events.`,
            `I used AngularJs and Materialize.css to build it.`,
            `I designed the UI/UX and developed it with ${inlineEmoji(`❤️`)} as always.`,
        ],
    },
    {
        name: "Leadersboard",
        tags: [ANGULAR, RESPONSIVE, MATERIAL],
        images: 3,
        chat: [
            `'Leadersboard' is a portal where Interviews with Leaders in the company is published.`,
            `It had functionalities like admin CMS, and a very classy UI.`,
            `I used AngularJs and Materialize.css to build it.`,
            `I designed the UI/UX and developed it with ${inlineEmoji(`❤️`)} as always.`,
        ],
    },
    {
        name: "Assets Syncer",
        tags: [ELECTRON, ANGULAR, DESKTOP],
        images: 1,
        chat: [
            `'Assets Syncer' is a cross-platform ElectronJs Taskbar/menu-bar application which syncs the data from Shoe Designers local machine with the server.`,
            `I used ElectronJs and AngularNode to build it.`,
            `I designed the UI/UX and developed it with ${inlineEmoji(`❤️`)} as always.`,
        ],
    },
    {
        name: "Solution Studio",
        tags: [WPF, XAML, DESKTOP],
        images: 3,
        chat: [
            `'Solution Studio' is a Windows Desktop application which is used to generate customized VisualStudio Project Solutions which makes reuse of code and good practices easy.`,
            `It was written in C#, WPF, XAML Ui.`,
            `I designed the UI/UX and developed it with ${inlineEmoji(`❤️`)} as always.`,
        ],
    },
    {
        name: "Groups",
        tags: [WPF, XAML, DESKTOP],
        link: ["here is the link to the demo..", hrefHtml("https://1drv.ms/v/s!Aitx-4hcnVYtiYJ_EGZqDPBNLzQM_w")],
        images: 6,
        chat: [
            `'Groups' is a Windows Desktop application which allows to create WhatsApp kinda groups with Contacts from Link/Skype. Skype didn't had such functionalities in the past ${inlineEmoji(
                `😉`,
            )}.`,
            `It was written in C#, WPF, XAML Ui.`,
            `I designed the UI/UX and developed it with ${inlineEmoji(`❤️`)} and care as always.`,
        ],
    },
    {
        name: "Learning Paths",
        tags: [ANGULAR, RESPONSIVE, MATERIAL],
        link: ["here is the link to the demo..", hrefHtml("http://chin2km.github.io/My-Angular1.5-App")],
        images: 3,
        chat: [
            `'Learning Paths' is a website which can advice Students to choose the best possible Learning Paths for them.`,
            `I used ElectronJs and AngularJs to build it.`,
            `I designed the UI/UX and developed it with ${inlineEmoji(`❤️`)} as always.`,
        ],
    },
    {
        name: "Chin2km Portfolio old",
        tags: [REACT, RESPONSIVE, UI_UX],
        images: 4,
        link: ["here is the link to the demo..", hrefHtml("http://chin2km.github.io/chin2km-old-portfolio")],
        chat: [
            `'Chin2km portfolio'. This is my old portfolio I built in 2014 ${inlineEmoji(`😅`)}.`,
            `I used AngularJs and lot of css3 animations in SASS to build it.`,
            `I designed the UI/UX and developed it with ${inlineEmoji(`❤️`)} as always.`,
        ],
    },
];
