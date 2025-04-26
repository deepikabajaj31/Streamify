import { useEffect } from "react";
import { RootState, store, youtubeActions } from "../store";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SearchCard from "../components/SearchCard";
import { HomePageVideos } from "../Types";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom"; // Add useLocation
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideos";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // Track location changes
  const videos = useSelector((state: RootState) => state.youtubeApp.videos);
  const searchTerm = useSelector((state: RootState) => state.youtubeApp.searchTerm);

  useEffect(() => {
    // Only run on initial mount or when location changes to /search
    if (searchTerm === "") {
      navigate("/");
    } else {
      dispatch(youtubeActions.clearVideos());
      store.dispatch(getSearchPageVideos(false));
    }
  }, [dispatch, navigate, location.pathname]); // Depend on location.pathname instead of searchTerm

  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <Sidebar />
        {videos.length ? (
          <div className="pl-8 flex flex-col gap-5 w-full">
            <InfiniteScroll
              dataLength={videos.length}
              next={() => store.dispatch(getSearchPageVideos(true))}
              hasMore={videos.length < 500}
              loader={<Spinner />}
              height={700}
            >
              {videos.map((item: HomePageVideos, index: number) => (
                <div className="my-5" key={index}>
                  <SearchCard data={item} />
                </div>
              ))}
            </InfiniteScroll>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Search;