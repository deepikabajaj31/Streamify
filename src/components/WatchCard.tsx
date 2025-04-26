import { RecommendedVideos } from "../Types";
import { Link } from "react-router-dom";

const WatchCard = ({ data }: { data: RecommendedVideos }) => {
  return (
    <div className="flex gap-2 sm:gap-3 items-start w-full max-w-md mx-auto">
      <div className="relative w-full sm:w-1/2 md:w-auto">
        <span className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-xs sm:text-sm bg-gray-900 px-2 py-0.5 z-10">
          {data.videoDuration}
        </span>
        <Link to={`/watch/${data.videoId}`}>
          <img
            src={data.videoThumbnail}
            className="w-full h-auto aspect-video max-w-44 sm:max-w-48 md:max-w-52 lg:max-w-60 rounded-lg object-cover"
            alt="thumbnail"
          />
        </Link>
      </div>
      <div className="flex gap-1 sm:gap-2 flex-col w-full">
        <h4 className="text-sm sm:text-base max-w-full">
          <a href="#" className="line-clamp-2">
            {data.videoTitle}
          </a>
        </h4>
        <div className="text-xs sm:text-sm text-gray-400">
          <div>
            <a href="#" className="hover:text-white">
              {data.channelInfo.name}
            </a>
          </div>
          <div>
            <div>
              <span className="after:content-['•'] after:mx-1">
                {data.videoViews} views
              </span>
              <span>{data.videoAge}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchCard;
