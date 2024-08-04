import React from "react";
import "./card.scss";
import testimage from "../../assets/testimage.png";
import share from "../../assets/share.svg";
import bookmark from "../../assets/bookmark.svg";
import time from "../../assets/time.svg";
import playlist from "../../assets/playlist.svg";
import status from "../../assets/status.svg";
import { Podcast } from "../../utils/types";

const Card: React.FC<Podcast> = (item) => {
  const { name, categories, experts, image } = item;
  let resizedImage;

  if (image) {
    resizedImage = image?.uri.replace("io/", "io/resize/300x160/");
  }

  return (
    <>
      <div className="card-wrapper">
        <div className="image-section">
          <img
            // src={testimage}
            src={resizedImage ?? testimage}
            alt="people watching at thier phone"
            className="card-image"
          />
          <div className="status">
            <img src={status} alt="status" className="status-image" />
            <p>30% completed</p>
          </div>
          <div className="playlist">
            <img src={playlist} alt="playlist" className="playlist-image" />
          </div>
          <div className="time">
            <img src={time} alt="time" className="time-icon" />
            <p>20m</p>
          </div>
          <div className="progress-wrapper">
            <div className="progress-bar"></div>
          </div>
        </div>
        <div className="content-wrapper">
          <div className="content-top">
            <p className="eyebrow">{categories[0]?.name ?? "John Oliver"}</p>
            <h2 className="headline">{name}</h2>
            <p className="author">{experts[0]?.firstName ?? "John Oliver"}</p>
            <p className="category">{categories[0]?.name ?? "John Oliver"}</p>
          </div>
          <div className="content-bottom">
            <img src={share} alt="share" className="bottom-icons" />
            <img src={bookmark} alt="bookmark" className="bottom-icons" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
