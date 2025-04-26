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
  const searchTerm = useSelector((state: RootState) => state.youtubeApp.searchTerm);
  const [lastSearchTerm, setLastSearchTerm] = useState<string>("");

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim()) {
      debouncedSearch.flush();
      if (searchTerm.trim() && searchTerm !== lastSearchTerm) {
        console.log("Navbar: Triggering search for:", searchTerm); // Debug log
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
      console.log("Navbar: Updating searchTerm to:", value); // Debug log
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

  let url: string | undefined;
  if (user) url = auth.currentUser?.photoURL;

  return (
    <div className="flex justify-between items-center pl-14 pr-4 h-14 bg-[#212121] opacity-95 sticky top-0 z-50">
      <div className="flex gap-6 items-center text-2xl cursor-pointer" style={{ width: "min-content" }}>
        <div>
          <GiHamburgerMenu />
        </div>
        <Link to="/">
          <div className="flex gap-2 items-center">
            <img src={logo} alt="streamify" style={{ width: "60%" }} />
            <span className="text-xl font-medium">Streamify</span>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-5">
        <form onSubmit={handleSearch}>
          <div className="flex bg-zinc-900 items-center h-10 px-4 pr-0">
            <div className="flex gap-4 items-center pr-5">
              <div>
                <AiOutlineSearch className="text-xl" />
              </div>
              <input
                type="text"
                className="w-96 bg-zinc-900 focus:outline-none border-none"
                value={inputValue}
                onChange={handleInputChange}
              />
              <AiOutlineClose
                className={`text-xl cursor-pointer ${!inputValue ? "invisible" : "visible"}`}
                onClick={handleClear}
              />
            </div>
            <button className="h-10 w-16 flex items-center justify-center bg-zinc-800">
              <AiOutlineSearch className="text-xl" />
            </button>
          </div>
        </form>
        <div className="text-xl p-3 bg-zinc-900 rounded-full cursor-pointer">
          <TiMicrophone />
        </div>
      </div>
      <div className="flex gap-5 items-center text-xl">
        <BsCameraVideo className="cursor-pointer" />
        <IoAppsSharp className="cursor-pointer" />
        <div className="relative cursor-pointer">
          <BsBell />
          <span className="absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1">9+</span>
        </div>
        {user ? (
          <div className="flex mb-4 cursor-pointer mt-4" onClick={() => setShow(!show)}>
            <img src={url} className="w-9 h-9 rounded-full" alt="User" />
            {!show && <span className="rotate-90">&gt;</span>}
            {show && <span className="rotate-90">&lt;</span>}
          </div>
        ) : (
          <button
            className="flex rounded-full px-2 py-1 mt-0.5 border border-white-500 text-white-500 hover:bg-zinc-600"
            onClick={signInWithGoogle}
          >
            <BsPersonCircle className="mt-1 text-base ml-1" />
            <span className="pl-1.5 pr-1 text-base">Sign in</span>
          </button>
        )}
        {user && show && (
          <span
            className="rounded-xl absolute mt-24 ml-20 py-2 px-4 bg-black z-50 border border-white-500 text-lg cursor-pointer"
            onClick={signOut}
          >
            Sign out
          </span>
        )}
      </div>
    </div>
  );
};

export default Navbar;