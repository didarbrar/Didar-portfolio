import { useState, useRef, useEffect, memo } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const videoLoadingRef = useRef(false);
  const videoUrlRef = useRef("");

  useEffect(() => {
    // Pre-fetch video in the background if available
    if (props.video && !videoLoadingRef.current && !videoUrlRef.current) {
      videoLoadingRef.current = true;
      fetch(`src/assets/${props.video}`)
        .then((response) => response.blob())
        .then((blob) => {
          videoUrlRef.current = URL.createObjectURL(blob);
        })
        .catch(() => {
          videoLoadingRef.current = false;
        });
    }
  }, [props.video]);

  const handleMouseEnter = () => {
    if (props.video) {
      setIsVideo(true);
      if (videoUrlRef.current) {
        setVideo(videoUrlRef.current);
      }
    }
  };

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        target="_blank"
        data-cursor={"disable"}
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        <img src={props.image} alt={props.alt} />
        {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
      </a>
    </div>
  );
};

export default memo(WorkImage);
