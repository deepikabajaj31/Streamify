import { useEffect } from "react";
import { RootState, store, youtubeActions } from "../store";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import { getHomePageVideos } from "../store/reducers/getHomePageVideos";
import { HomePageVideos } from "../Types";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state: RootState) => {
    return state.youtubeApp.videos;
  });

  useEffect(() => {
    dispatch(youtubeActions.clearVideos()); // Clear videos before fetching
    store.dispatch(getHomePageVideos(false));
    return () => {
      dispatch(youtubeActions.clearVideos());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <div className="h-[7.5vh]">
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <Sidebar />
        {videos.length ? (
          <InfiniteScroll
            dataLength={videos.length}
            next={() => store.dispatch(getHomePageVideos(true))}
            hasMore={videos.length < 500}
            loader={<Spinner />}
            className="w-full overflow-auto"
            height="100%"
            style={{ width: "100%" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 sm:gap-y-10 lg:gap-y-14 gap-x-4 sm:gap-x-6 lg:gap-x-8 p-2 sm:p-4 lg:p-8 w-full max-w-screen-xl mx-auto justify-items-center overflow-hidden">
              {videos.map((item: HomePageVideos, index: number) => {
                return <Card data={item} key={index} />;
              })}
            </div>
          </InfiniteScroll>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Home;
