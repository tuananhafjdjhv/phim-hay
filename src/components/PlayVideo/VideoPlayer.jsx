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
import { PlyrPlus } from "plyrplus";

const Videoplayer = () => {

 // Define your video source URL
 const source = 'https://example.com/your-video.mp4';

 // Create an array of chapter data
 const chaptersData = [
   {
     index: 0,
     timestamp: '00:00',
     chapterName: 'Introduction',
     description: 'This is a random description.',
   },
   {
     index: 1,
     timestamp: '00:30',
     chapterName: 'About Backend',
     description: 'This is a random description.',
   },
   {
     index: 2,
     timestamp: '01:32',
     chapterName: 'Frontend',
     description: 'This is a random description.',
   },
   // Add more chapters as needed
 ];

 // Define your custom styles for the player (optional)
 const playerStyle = {
   width: '100%',
   // Add more styles as needed
 };

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

  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    let player;

    if (videoElement && linkEmbed) {
      // Extract the HLS URL from the linkEmbed URL
      const hlsUrlMatch = linkEmbed.match(/url=([^&]*)/);
      const hlsUrl = hlsUrlMatch ? decodeURIComponent(hlsUrlMatch[1]) : null;

      if (hlsUrl) {
        player = videojs(videoElement, {
          autoplay: true,
          controls: true,
          sources: [
            {
              src: hlsUrl,
              type: "application/x-mpegURL",
            },
          ],
        });
      }

      return () => {
        if (player) {
          player.dispose();
        }
      };
    }
  }, [linkEmbed]);

  return (
    <div className=" p-4 rounded-lg shadow-lg">
      <p className="text-white font-semibold text-xl pt-2">{filename}</p>
      <div className="container pt-0 w-[100%] h-[100%] flex flex-col items-center justify-center relative">
        <div className=" text-white video-and-title w-[100%] h-[100%] pt-1  inset-0 m-auto  flex items-center justify-center">
          <div data-vjs-player className=" w-full h-full ">
            {/* <video
              className="video-js vjs-default-skin bg-black vjs-big-play-centered"
              onContextMenu={(e) => e.preventDefault()}
              id='videoPlayerHLS'
              ref={videoRef}
              controls
              style={{ width: "100%" }}
            /> */}
            <PlyrPlus source={source} chapters={chaptersData} style={playerStyle} />
          </div>
        </div>
      </div>
      <p className="text-white font-semibold text-s pt-2">{content}</p>
    </div>
  );
};

export default Videoplayer;
