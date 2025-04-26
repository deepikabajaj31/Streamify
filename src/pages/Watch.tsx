import { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, store } from "../store";
import { getRecommendedVideos } from "../store/reducers/getRecommendedVideos";
import { getVideoDetails } from "../store/reducers/getVideoDetails";
import { BiLike, BiDislike } from "react-icons/bi";
import { HiScissors } from "react-icons/hi";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import WatchCard from "../components/WatchCard";
import Navbar from "../components/Navbar";

const Watch = () => {
  const [showMoreStatus, setShowMoreStatus] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const currentPlaying = useSelector(
    (state: RootState) => state.youtubeApp.currentPlaying
  );
  const recommendedVideos = useSelector(
    (state: RootState) => state.youtubeApp.recommendedVideos
  );

  useEffect(() => {
    if (id) {
      store.dispatch(getVideoDetails(id));
      setShowMoreStatus(false);
    } else navigate("/");
  }, [id, navigate]);

  useEffect(() => {
    if (currentPlaying && id) store.dispatch(getRecommendedVideos(id));
  }, [currentPlaying, id]);

  return (
    <Fragment>
      {currentPlaying && currentPlaying?.videoId === id && (
        <div className="h-screen overflow-hidden">
          <div className="h-[7.5vh]">
            <Navbar />
          </div>
          <div className="flex flex-col md:flex-row h-[calc(100vh-7.5vh)] w-full overflow-auto">
          <div
  className="flex flex-col lg:flex-row gap-y-6 sm:gap-y-8 lg:gap-y-10 gap-x-4 sm:gap-x-5 p-4 sm:p-6 lg:p-7 mx-4 sm:mx-10 lg:mx-20 w-full"
>
              <div className="w-full max-w-full lg:max-w-3xl">
                <div>
                  <iframe
                    className="w-full max-w-full h-auto aspect-video"
                    src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className="mt-4 sm:mt-5">
                    <p className="text-sm sm:text-base lg:text-xl">
                      {currentPlaying.videoTitle}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-between mt-1 sm:mt-2">
                      <div className="text-xs sm:text-sm text-gray-400">
                        <span className="after:content-['•'] after:mx-1">
                          {currentPlaying.videoViews} views
                        </span>
                        <span>{currentPlaying.videoAge} ago</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 uppercase mt-2 sm:mt-0">
                        <div className="flex items-center gap-1 cursor-pointer">
                          <BiLike className="text-lg sm:text-xl" />
                          <strong>{currentPlaying.videoLikes}</strong>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <BiDislike className="text-lg sm:text-xl" />
                          <strong>dislike</strong>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <FaShare className="text-lg sm:text-xl" />
                          <strong>share</strong>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <HiScissors className="text-lg sm:text-xl" />
                          <strong>clip</strong>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <MdOutlinePlaylistAdd className="text-lg sm:text-xl" />
                          <strong>save</strong>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <BsThreeDots className="text-lg sm:text-xl" />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 flex-col border-solid border-gray-400 border-2 my-4 sm:my-5 pb-3 border-l-transparent border-r-transparent">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mr-0 sm:mr-5 mt-4">
                        <div>
                          <img
                            src={currentPlaying.channelInfo.image}
                            alt=""
                            className="rounded-full h-10 w-10 sm:h-12 sm:w-12"
                          />
                        </div>
                        <div className="w-full sm:w-5/6">
                          <h5 className="text-sm sm:text-base">
                            <strong>{currentPlaying.channelInfo.name}</strong>
                          </h5>
                          <h6 className="text-gray-400 text-xs sm:text-sm">
                            {currentPlaying.channelInfo.subscribers} subscribers
                          </h6>
                        </div>
                        <div>
                          <button className="uppercase bg-red-600 rounded-sm p-2 text-xs sm:text-sm tracking-wider">
                            subscribe
                          </button>
                        </div>
                      </div>
                      <div
                        className={`${
                          !showMoreStatus ? "max-h-16 overflow-hidden" : ""
                        } text-xs sm:text-sm w-full sm:w-11/12`}
                      >
                        <pre
                          style={{ fontFamily: `"Roboto", sans-serif` }}
                          className="whitespace-pre-wrap"
                        >
                          {currentPlaying.videoDescription}
                        </pre>
                      </div>
                      <div>
                        <button
                          className="uppercase text-xs sm:text-sm cursor-pointer"
                          onClick={() => setShowMoreStatus(!showMoreStatus)}
                        >
                          Show {showMoreStatus ? "less" : "more"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-auto mr-0 flex flex-col gap-2 sm:gap-3">
                {recommendedVideos.length &&
                  recommendedVideos.map((item) => {
                    return <WatchCard data={item} key={item.videoId} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Watch;
