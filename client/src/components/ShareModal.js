import React from 'react';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
} from 'react-share';

const ShareModal = ({ url }) => {
  return (
    <div className="d-flex justify-content-between px-4 py-2">
      <EmailShareButton url={url}>
        <EmailIcon round={true} size={32} />
      </EmailShareButton>

      <FacebookShareButton url={url}>
        <FacebookIcon round={true} size={32} />
      </FacebookShareButton>

      <TelegramShareButton url={url}>
        <TelegramIcon round={true} size={32} />
      </TelegramShareButton>

      <TwitterShareButton url={url}>
        <TwitterIcon round={true} size={32} />
      </TwitterShareButton>

      <WhatsappShareButton url={url}>
        <WhatsappIcon round={true} size={32} />
      </WhatsappShareButton>

      <RedditShareButton url={url}>
        <RedditIcon round={true} size={32} />
      </RedditShareButton>
    </div>
  );
};

export default ShareModal;
