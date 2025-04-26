import { useEffect } from "react";
import { RootState, store, youtubeActions } from "../store";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SearchCard from "../components/SearchCard";
import { HomePageVideos } from "../Types";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideos";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const videos = useSelector((state: RootState) => state.youtubeApp.videos);
  const searchTerm = useSelector(
    (state: RootState) => state.youtubeApp.searchTerm
  );

  useEffect(() => {
    if (searchTerm === "") {
      navigate("/");
    } else {
      dispatch(youtubeActions.clearVideos());
      store.dispatch(getSearchPageVideos(false));
    }
  }, [dispatch, navigate, location.pathname]);

  return (
    <div className="h-screen overflow-hidden">
      <div className="h-[7.5vh]">
        <Navbar />
      </div>
      <div className="flex flex-col sm:flex-row h-[calc(100vh-7.5vh)]">
        <Sidebar />
        {videos.length ? (
          <div className="pl-4 sm:pl-6 lg:pl-8 flex flex-col gap-4 sm:gap-5 w-full overflow-auto">
            <InfiniteScroll
              dataLength={videos.length}
              next={() => store.dispatch(getSearchPageVideos(true))}
              hasMore={videos.length < 500}
              loader={<Spinner />}
              className="h-[calc(100vh-7.5vh)]"
              height={700}
            >
              {videos.map((item: HomePageVideos, index: number) => (
                <div className="my-4 sm:my-5" key={index}>
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
