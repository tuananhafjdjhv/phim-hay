import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactHlsPlayer from "react-hls-player";
import ReactPlayer from "react-player";
import { useRef } from "react";
import Hls from "hls.js";

import videojs from "video.js";
import "video.js/dist/video-js.css";
import "video.js/dist/video-js.min.css";
import { useParams } from "react-router-dom";
import LayOut from "../LayOut/LayOut";
import "./playvideo.css"

const PlayVideo = () => {
  const { slug } = useParams();
  const [error, setError] = useState(null);
  const [linkEmbed, setLinkEmbed] = useState(null);
  const [name, setName] = useState("");
  const [filename, setFilename] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    axios
      .get(`https://phimapi.com/phim/${slug}`)
      .then((response) => {
        console.log(response.data);

        const link = response.data.episodes[0].server_data[0].link_embed;
        const filename = response.data.episodes[0].server_data[0].filename;
        const content = response.data.movie.content;
        const name = response.data.movie.name;
        setLinkEmbed(link);
        setName(name);
        setFilename(filename);
        setContent(content);
      })
      .catch((error) => {
        setError(error);
      });
  }, [slug]);

  // const videoRef = useRef(null);

  // useEffect(() => {
  //   const videoElement = videoRef.current;
  //   let player;

  //   if (videoElement && linkEmbed) {
  //     // Extract the HLS URL from the linkEmbed URL
  //     const hlsUrlMatch = linkEmbed.match(/url=([^&]*)/);
  //     const hlsUrl = hlsUrlMatch ? decodeURIComponent(hlsUrlMatch[1]) : null;

  //     if (hlsUrl) {
  //       player = videojs(videoElement, {
  //         autoplay: true,
  //         controls: true,
  //         sources: [
  //           {
  //             src: hlsUrl,
  //             type: "application/x-mpegURL",
  //           },
  //         ],
  //       });
  //     }

  //     return () => {
  //       if (player) {
  //         player.dispose();
  //       }
  //     };
  //   }
  // }, [linkEmbed]);

  useEffect(() => {
    if (linkEmbed) {
      const video = document.getElementById("hls-video");
      if (Hls.isSupported()) {
        const hls = new Hls();
        const hlsUrlMatch = linkEmbed.match(/url=([^&]*)/);
        const hlsUrl = hlsUrlMatch ? decodeURIComponent(hlsUrlMatch[1]) : null;
        if (hlsUrl) {
          hls.loadSource(hlsUrl);
          hls.attachMedia(video);
        }
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // This will handle Safari, where HLS is supported natively
        const hlsUrlMatch = linkEmbed.match(/url=([^&]*)/);
        const hlsUrl = hlsUrlMatch ? decodeURIComponent(hlsUrlMatch[1]) : null;
        if (hlsUrl) {
          video.src = hlsUrl;
        }
      }
    }
  }, [linkEmbed]);

  return (
    <div className="video-container">
      <p className="video-title">{filename}</p>
      <div className="video-player">
        <video
          id="hls-video"
          controls
          autoPlay
        >
          Your browser does not support the video tag.
        </video>
      </div>
      <p className="video-description">{content}</p>
    </div>
  );
};

export default PlayVideo;
