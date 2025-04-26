import { HomePageVideos } from "../Types";
import { Link } from "react-router-dom";

const Card = ({ data }: { data: HomePageVideos }) => {
  return (
    <div className="w-full max-w-xs flex flex-col gap-2 sm:gap-3">
      <div className="relative">
        <span className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-xs sm:text-sm bg-gray-900 px-2 py-0.5 z-10">
          {data.videoDuration}
        </span>
        <Link to={`/watch/${data.videoId}`}>
          <img
            src={data.videoThumbnail}
            className="w-full h-auto aspect-video rounded-lg"
            alt="thumbnail"
          />
        </Link>
      </div>
      <div className="flex gap-2 sm:gap-3">
        <div className="min-w-fit">
          <a href="#">
            <img
              src={data.channelInfo.image}
              alt="channel"
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-full"
            />
          </a>
        </div>
        <div>
          <h3>
            <a href="#" className="line-clamp-2 text-sm sm:text-base">
              {data.videoTitle}
            </a>
          </h3>
          <div className="text-xs sm:text-sm text-gray-400">
            <div>
              <a href="#" className="hover:text-white">
                {data.channelInfo.name}
              </a>
            </div>
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

export default Card;
