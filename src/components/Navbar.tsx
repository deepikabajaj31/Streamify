import { useState, useCallback, useEffect } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { TiMicrophone } from "react-icons/ti";
import { BsCameraVideo, BsBell, BsPersonCircle } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoAppsSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store, youtubeActions } from "../store";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideos";
import { auth } from "../Firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from "../assets/logo.png";
import { debounce } from "lodash";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [show, setShow] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchTerm = useSelector(
    (state: RootState) => state.youtubeApp.searchTerm
  );
  const [lastSearchTerm, setLastSearchTerm] = useState<string>("");

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim()) {
      debouncedSearch.flush();
      if (searchTerm.trim() && searchTerm !== lastSearchTerm) {
        console.log("Navbar: Triggering search for:", searchTerm);
        setLastSearchTerm(searchTerm);
        if (location.pathname !== "/search") {
          navigate("/search");
        } else {
          dispatch(youtubeActions.clearVideos());
          store.dispatch(getSearchPageVideos(false));
        }
      }
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    setShow(false);
  };

  const signOut = () => auth.signOut();

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      console.log("Navbar: Updating searchTerm to:", value);
      dispatch(youtubeActions.changeSearchTerm(value));
    }, 300),
    [dispatch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setInputValue("");
    dispatch(youtubeActions.clearSearchTerm());
    setLastSearchTerm("");
  };

  const handleLogoClick = () => {
    dispatch(youtubeActions.clearVideos());
    dispatch(youtubeActions.clearSearchTerm());
  };

  let url: string | undefined;
  if (user) url = auth.currentUser?.photoURL;

  return (
    <div className="flex justify-between items-center px-4 sm:px-6 lg:px-14 h-14 bg-[#212121] opacity-95 sticky top-0 z-50">
      <div className="flex items-center gap-4 sm:gap-6 text-2xl cursor-pointer">
        <GiHamburgerMenu className="hover:text-gray-300" />
        <Link to="/" onClick={handleLogoClick}>
          <div className="flex gap-2 items-center">
            <img src={logo} alt="streamify" className="w-16 sm:w-16" />
            <span className="text-lg sm:text-xl font-medium hidden sm:block">
              Streamify
            </span>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-2 sm:gap-5 flex-1 max-w-2xl">
        <form onSubmit={handleSearch} className="w-full">
          <div className="flex bg-zinc-900 items-center h-10 pl-4 rounded-full">
            <div className="flex gap-2 sm:gap-4 items-center flex-1">
              <AiOutlineSearch className="text-lg sm:text-xl" />
              <input
                type="text"
                className="w-full bg-zinc-900 focus:outline-none border-none text-sm sm:text-base"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search"
              />
              <AiOutlineClose
                className={`text-lg sm:text-xl cursor-pointer ${
                  !inputValue ? "invisible" : "visible"
                }`}
                onClick={handleClear}
              />
            </div>
            <button className="h-10 w-12 sm:w-16 flex items-center justify-center bg-zinc-800 rounded-r-full">
              <AiOutlineSearch className="text-lg sm:text-xl" />
            </button>
          </div>
        </form>
        <div className=" rounded-full bg-zinc-900 hover:bg-zinc-700 p-3">
          <TiMicrophone className="text-lg sm:text-xl   cursor-pointer  hidden sm:block" />
        </div>
      </div>
      <div className="flex gap-3 sm:gap-5 items-center text-lg sm:text-xl">
        <BsCameraVideo className="cursor-pointer hover:text-gray-300 hidden sm:block" />
        <IoAppsSharp className="cursor-pointer hover:text-gray-300 hidden sm:block" />
        <div className="relative cursor-pointer">
          <BsBell className="hover:text-gray-300" />
          <span className="absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1">
            9+
          </span>
        </div>
        {user ? (
          <div className="relative">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setShow(!show)}
            >
              <img
                src={url}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full"
                alt="User"
              />
              &nbsp;
              {!show && <span className="rotate-90">&gt;</span>}
              {show && <span className="rotate-90">&lt;</span>}
            </div>
            {show && (
              <span
                className="absolute right-0 mt-2 py-2 px-4 bg-black rounded-xl border border-gray-500 text-base cursor-pointer hover:bg-zinc-800"
                onClick={signOut}
                style={{ width: "max-content" }}
              >
                Sign out
              </span>
            )}
          </div>
        ) : (
          <button
            className="flex items-center rounded-full px-2 py-1 border border-gray-500 text-gray-500 hover:bg-zinc-600 text-sm sm:text-base"
            onClick={signInWithGoogle}
          >
            <BsPersonCircle className="mr-1 text-base" />
            <span>Sign in</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
