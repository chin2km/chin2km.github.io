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
    "👋🏻 Hey there",
    "I am Chintu Kishen Kuthirangattil Mohandas. I'm an Indian 🇮🇳 💪  living in Hamburg, Germany 🇩🇪",
    `I am a fullstack software developer with over ${getExperience(10, 1, 2012)} years of work experience...`,
    "I love developing software products based on web technologies ❣️. And sometimes I design them too, like this one 😉",
    "I've got a keen eye for details. plus, I'm really good at team work 🤩",
    "I work with latest tools & tech like: ReactJs, NodeJs, Redux, RxJs, MongoDb, TypeScript etc 🚀",
    "some of my works ( only the ones I'm allowed to share 👀🙏🏻) are detailed below ↓",
    "enjoy your time here and have a nice day 😇",
];

export const CONTACT_CHAT: string[] = [
    "Hello again 👀",
    "here are some of the places on web where you can find me...",
    "or alternatively you can email me @ me.chintukm@gmail.com",
    "looking forward to new connections 😇",
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
    link?: string;
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

export const WORKS: IWork[] = [
    {
        name: "Designers Portal",
        description: "Responsive Web Design, Development",
        tags: [REACT, MATERIAL],
    },
    {
        name: "StarWars",
        description: "React.JS app, Development",
        tags: [REACT, REDUX, RESPONSIVE, MATERIAL],
        link: "http://www.chin2km.com/React-Redux-Tuto/",
    },
    {
        name: "Workflow System",
        description: "Responsive Web Design, Development",
        tags: [ANGULAR, RESPONSIVE, MATERIAL],
    },
    {
        name: "Fantasy League",
        description: "Web Design,Responsive Design, Online Game",
        tags: [ANGULAR, RESPONSIVE, MATERIAL],
    },
    {
        name: "Glasswall",
        description: "Web Design,Responsive Design, Development",
        tags: [ANGULAR, RESPONSIVE, MATERIAL],
    },
    {
        name: "OnePush",
        description: "Responsive Web Design, Development",
        tags: [ANGULAR, RESPONSIVE, MATERIAL],
        link: "http://www.chin2km.com/Angular-Again/",
    },
    {
        name: "Infusion",
        description: "Web Design, Development",
        tags: [ANGULAR, RESPONSIVE, MATERIAL],
    },
    {
        name: "Leadersboard",
        description: "Web Design, Development",
        tags: [ANGULAR, RESPONSIVE, MATERIAL],
    },
    {
        name: "Assets Syncer",
        description: "Cross-platfrom App Development",
        tags: [ELECTRON, ANGULAR, DESKTOP],
    },
    {
        name: "Solution Studio",
        description: "Desktop Development(Windows), Responsive",
        tags: [WPF, XAML, DESKTOP],
    },
    {
        name: "Groups",
        description: "Desktop Development(Windows), Chat App",
        tags: [WPF, XAML, DESKTOP],
        link: "https://1drv.ms/v/s!Aitx-4hcnVYtiYJ_EGZqDPBNLzQM_w",
    },
    {
        name: "Learning Paths",
        description: "Responsive Web Design, Development",
        tags: [ANGULAR, RESPONSIVE, MATERIAL],
        link: "http://www.chin2km.com/My-Angular1.5-App/",
    },
    {
        name: "Chin2km Portfolio old",
        tags: [REACT, RESPONSIVE, UI_UX],
        description: "Web Design,Mobile Responsive Design",
        link: "http://www.chin2km.com",
    },
];