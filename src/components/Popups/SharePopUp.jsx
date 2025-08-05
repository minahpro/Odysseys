import React from "react";
import MainPopup from "../Popups/MainPopup";
import {
  TwitterIcon,
  FacebookIcon,
  InstapaperIcon,
  WhatsappIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TwitterShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
} from "react-share";

function SharePopUp({ handleOpen, handleClose, link }) {
  return (
    <MainPopup
      open={handleOpen}
      close={handleClose}
      title="Share On.."
      contentClass="max-w-md"
    >
      <div className="flex items-center flex-wrap gap-4">
        <TwitterShareButton url={link} title="Share on Twitter">
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <FacebookShareButton url={link} title="Share on Facebook">
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <TelegramShareButton url={link} title="Share on Youtube">
          <TelegramIcon size={32} round={true} />
        </TelegramShareButton>
        <WhatsappShareButton url={link} title="Share on Whatsapp">
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
        <LinkedinShareButton url={link} title="Share on Linkedin">
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
        <PinterestShareButton url={link} title="Share on Pinterest">
          <PinterestIcon size={32} round={true} />
        </PinterestShareButton>
        <RedditShareButton url={link} title="Share on Reddit">
          <RedditIcon size={32} round={true} />
        </RedditShareButton>
        <InstapaperShareButton url={link} title="Share on Instapaper">
          <InstapaperIcon size={32} round={true} />
        </InstapaperShareButton>
      </div>
    </MainPopup>
  );
}

export default SharePopUp;
