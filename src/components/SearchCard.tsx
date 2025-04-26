import { HomePageVideos } from "../Types";
import { Link } from "react-router-dom";

const SearchCard = ({ data }: { data: HomePageVideos }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
      <div className="relative w-full sm:w-auto">
        <span className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-xs sm:text-sm bg-gray-900 px-2 py-0.5 z-10">
          {data.videoDuration}
        </span>
        <Link to={`/watch/${data.videoId}`}>
          <img
            src={data.videoThumbnail}
            className="w-full h-auto aspect-video max-w-md rounded-lg"
            alt="thumbnail"
          />
        </Link>
      </div>
      <div className="flex gap-1 flex-col w-full sm:max-w-lg" style={{maxWidth:"45rem"}}>
        <h3 className="text-sm sm:text-base">
          <a href="#" className="line-clamp-2">
            {data.videoTitle}
          </a>
        </h3>
        <div className="text-xs sm:text-sm text-gray-400">
          <div>
            <div>
              <span className="after:content-['•'] after:mx-1">
                {data.videoViews} views
              </span>
              <span>{data.videoAge}</span>
            </div>
          </div>
        </div>
        <div className="min-w-fit my-1 sm:my-2">
          <a
            href="#"
            className="flex items-center gap-2 text-xs sm:text-sm text-gray-400"
          >
            <img
              src={data.channelInfo.image}
              alt="channel"
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-full"
            />
            <span>{data.channelInfo.name}</span>
          </a>
        </div>
        <div className="line-clamp-2 text-xs sm:text-sm text-gray-400">
          <p>{data.videoDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
