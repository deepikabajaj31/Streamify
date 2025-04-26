import {
  MdHomeFilled,
  MdOutlineSlowMotionVideo,
  MdSubscriptions,
  MdOutlineVideoLibrary,
  MdHistory,
  MdOutlineSmartDisplay,
  MdOutlineWatchLater,
  MdThumbUpOffAlt,
  MdSettings,
  MdOutlinedFlag,
  MdOutlineHelpOutline,
  MdOutlineFeedback,
  MdOutlineSportsVolleyball,
} from "react-icons/md";
import { TbMusic, TbDeviceGamepad2 } from "react-icons/tb";
import { FaRegCompass } from "react-icons/fa";
import { GiFilmStrip } from "react-icons/gi";

const mainLinks = [
  {
    icon: <MdHomeFilled className="text-lg sm:text-xl" />,
    name: "Home",
  },
  {
    icon: <FaRegCompass className="text-lg sm:text-xl" />,
    name: "Explore",
  },
  {
    icon: <MdOutlineSlowMotionVideo className="text-lg sm:text-xl" />,
    name: "Shorts",
  },
  {
    icon: <MdSubscriptions className="text-lg sm:text-xl" />,
    name: "Subscriptions",
  },
];

const secondaryLinks = [
  {
    icon: <MdOutlineVideoLibrary className="text-lg sm:text-xl" />,
    name: "Library",
  },
  {
    icon: <MdHistory className="text-lg sm:text-xl" />,
    name: "History",
  },
  {
    icon: <MdOutlineSmartDisplay className="text-lg sm:text-xl" />,
    name: "Your Videos",
  },
  {
    icon: <MdOutlineWatchLater className="text-lg sm:text-xl" />,
    name: "Watch Later",
  },
  {
    icon: <MdThumbUpOffAlt className="text-lg sm:text-xl" />,
    name: "Liked Videos",
  },
];

const subscriptionLinks = [
  {
    icon: <TbMusic className="text-lg sm:text-xl" />,
    name: "Music",
  },
  {
    icon: <MdOutlineSportsVolleyball className="text-lg sm:text-xl" />,
    name: "Sport",
  },
  {
    icon: <TbDeviceGamepad2 className="text-lg sm:text-xl" />,
    name: "Gaming",
  },
  {
    icon: <GiFilmStrip className="text-lg sm:text-xl" />,
    name: "Films",
  },
];

const helpLinks = [
  {
    icon: <MdSettings className="text-lg sm:text-xl" />,
    name: "Settings",
  },
  {
    icon: <MdOutlinedFlag className="text-lg sm:text-xl" />,
    name: "Report history",
  },
  {
    icon: <MdOutlineHelpOutline className="text-lg sm:text-xl" />,
    name: "Help",
  },
  {
    icon: <MdOutlineFeedback className="text-lg sm:text-xl" />,
    name: "Send feedback",
  },
];

const textLinks = [
  [
    "About",
    "Press",
    "Copyright",
    "Contact us",
    "Creator",
    "Advertise",
    "Developers",
  ],
  [
    "Terms",
    "Privacy",
    "Policy & Safety",
    "How YouTube works",
    "Test new features",
  ],
];

const Sidebar = () => {
  return (
    <div className="w-full sm:w-64 md:w-1/5.5 bg-[#212121] mt-3 overflow-auto pb-8 max-h-[calc(100vh-7.5vh)] hidden sm:block">
      <ul className="flex flex-col border-b-2 border-gray-700">
        {mainLinks.map(({ icon, name }) => {
          return (
            <li
              key={name}
              className={`pl-4 sm:pl-6 py-3 hover:bg-zinc-600 ${
                name === "Home" ? "bg-slate-600" : ""
              }`}
            >
              <a href="/" className="flex items-center gap-4 sm:gap-5">
                {icon}
                <span className="text-xs sm:text-sm tracking-wider">
                  {name}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
      <ul className="flex flex-col border-b-2 border-gray-700">
        {secondaryLinks.map(({ icon, name }) => {
          return (
            <li key={name} className={`pl-4 sm:pl-6 py-3 hover:bg-zinc-600`}>
              <a href="/" className="flex items-center gap-4 sm:gap-5">
                {icon}
                <span className="text-xs sm:text-sm tracking-wider">
                  {name}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
      <ul className="flex flex-col border-b-2 border-gray-700">
        {subscriptionLinks.map(({ icon, name }) => {
          return (
            <li key={name} className={`pl-4 sm:pl-6 py-3 hover:bg-zinc-600`}>
              <a href="/" className="flex items-center gap-4 sm:gap-5">
                {icon}
                <span className="text-xs sm:text-sm tracking-wider">
                  {name}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
      <ul className="flex flex-col border-b-2 border-gray-700">
        {helpLinks.map(({ icon, name }) => {
          return (
            <li key={name} className={`pl-4 sm:pl-6 py-3 hover:bg-zinc-600`}>
              <a href="/" className="flex items-center gap-4 sm:gap-5">
                {icon}
                <span className="text-xs sm:text-sm tracking-wider">
                  {name}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
      <ul className="flex gap-2 flex-wrap text-xs sm:text-sm p-4 text-zinc-400">
        {textLinks[0].map((name) => {
          return (
            <a key={name} href="/">
              {name}
            </a>
          );
        })}
      </ul>
      <ul className="flex gap-2 flex-wrap text-xs sm:text-sm p-4 text-zinc-400">
        {textLinks[1].map((name) => {
          return (
            <a key={name} href="/">
              {name}
            </a>
          );
        })}
      </ul>
      <span className="px-4 text-xs sm:text-sm text-zinc-400">
        © 2023 Google
      </span>
    </div>
  );
};

export default Sidebar;
