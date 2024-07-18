import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import VideoCard from "../../components/VideoCard/VideoCard";
import "./detail.css";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

const Detail = () => {
  const navigate = useNavigate()
  const { slug } = useParams();
  const [videoData, setVideoData] = useState();
  const [movie, setMovie] = useState();
  const [posterUrl, setPosterUrl] = useState();
  const [name, setName] = useState();
  const [time, setTime] = useState();
  const [content, setContent] = useState();

  const handleXenphimClick = (slug) => {
    navigate(`/detail/${slug}/xem-phim`);
  };
  // const { title, imageUrl, description } = videoData;
  // console.log(slug);
  useEffect(() => {
    fetchData(slug);
  }, [slug]);
  const fetchData = () => {
    try {
      const response = axios
        .get(`https://phimapi.com/phim/${slug}`)
        .then((res) => {
          // setVideoData(res.data);
          setMovie(res.data.movie);
          setPosterUrl(res.data.movie.poster_url);
          setName(res.data.movie.name);
          setTime(res.data.movie.time);
          setContent(res.data.movie.content);
          console.log(res.data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="cast-container">
        <div className="cast-wrap d-flex">
          <div className="movie-poster">
            <img src={posterUrl} alt="" />

            <button
              onClick={() => handleXenphimClick(slug)}
              className="btn btn-primary btn-lg btn-block space-x-1 flex"
            >
              {/* <FaPlay className="fa fa-television"/> */}
              <p>Xem phim</p>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-lg btn-block"
              data-toggle="modal"
              data-target="#trailerMovie"
            >
              Trailer
            </button>
          </div>

          <div className="cast-info">
            <div className="cast-name text-xl ">
              <h1>{name}</h1>
            </div>
            <div className="cast-job">
              <a href="#">{time}</a>
            </div>
            <div className="movie-social flex">
              <Link href="#" className="flex space-x-2">
                <FaHeart size={25} color="orange" className="pt-1"></FaHeart>{" "}
                <p>Lưu phim</p>
              </Link>
              <Link className="flex space-x-2">
                <FaSquareFacebook className="pt-1" size={25} color="orange" />{" "}
                <p>Chia sẻ</p>
              </Link>
            </div>
            <div className="movie-rate">
              <div className="movie-rate__point">
                <FaStar size={25} color="orange" />
                <p>
                  <span>8.1</span> /10
                  <br />
                  <span className="rv hover:underline cursor-pointer">
                    56 Đánh giá
                  </span>
                </p>
              </div>
              <div className="movie-rate__rate-star">
                <p>Đánh giá phim: </p>
                <FaStar size={25} color="orange" />
                <FaStar size={25} color="orange" />
                <FaStar size={25} color="orange" />
                <FaStar size={25} color="orange" />
                <CiStar size={30} color="orange" />
                <CiStar size={30} color="orange" />
              </div>
            </div>
            <div className="cast-bio movie-nav-tabs">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="overview-tab"
                    data-toggle="tab"
                    href="#overview"
                    role="tab"
                    aria-controls="overview"
                    aria-selected="true"
                  >
                    Giới thiệu
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="review-tab"
                    data-toggle="tab"
                    href="#review"
                    role="tab"
                    aria-controls="review"
                    aria-selected="false"
                  >
                    Đánh giá
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="cast-tab"
                    data-toggle="tab"
                    href="#cast"
                    role="tab"
                    aria-controls="cast"
                    aria-selected="false"
                  >
                    Diễn viên
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="overview"
                  role="tabpanel"
                  aria-labelledby="overview-tab"
                >
                  <p className="text-sm">{content}</p>
                </div>
                <div
                  className="tab-pane fade"
                  id="review"
                  role="tabpanel"
                  aria-labelledby="review-tab"
                >
                  <p>
                    Liên Minh Công Lý, tên tiếng Anh “Justice League”, là bộ
                    phim mà sự tồn tại của nó giống như một cuốn sách giáo khoa
                    vậy. Bạn có thể nghĩ việc đặt tất cả những siêu hành hùng
                    nổi tiếng bậc nhất của DC vào một bộ phim là lựa chọn cực kỳ
                    tuyệt vời khiến khán giả phải sướng mê cả người. Nhưng thực
                    tế cũng giống như một cuốn sách giáo khoa với đầy thông tin
                    của những bậc vĩ nhân, mỗi người vài trang giấy mà đứa học
                    sinh nào nhìn vào cũng thấy choáng ngợp,… và ngu đi từng
                    phút một.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid pading-md">
        <section className="wrap post-news">
          <div className="wrap-heading">
            <h2 className="wrap-heading__title">
              <a href="list-movies.html">Phim liên quan</a>
            </h2>
          </div>

          <div className="row">
            <div className="col-md-4">
              <article className="card">
                <a href="news_post.html">
                  <img
                    className="card-img-top"
                    src="images/news/news-5.jpg"
                    alt="Bạn biết gì về bộ tộc nữ chiến binh Amazon đang làm mưa làm gió trên các rạp phim toàn thế giới?"
                  />
                </a>
                <div className="card-block">
                  <h4 className="card-title">
                    <a href="#">
                      Bạn biết gì về bộ tộc nữ chiến binh Amazon đang làm mưa
                      làm gió trên các rạp phim toàn thế giới?
                    </a>
                  </h4>
                  <p className="card-text">
                    Wonder Woman là một nhân vật hư cấu của vũ trụ điện ảnh DC.
                    Với hình hài từ đất được nhào nặn bởi nữ hoàng Hippolyta
                    cùng với sự sống được nữ thần Tình yêu Aphrodite...
                  </p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">02/11/2017</small>
                </div>
              </article>
            </div>

            <div className="col-md-4">
              <article className="card">
                <a href="news_post.html">
                  <img
                    className="card-img-top"
                    src="images/news/news-6.jpg"
                    alt="Card image cap"
                  />
                </a>
                <div className="card-block">
                  <h4 className="card-title">
                    <a href="#">
                      Warner Bros. tiết lộ thêm thông tin thú vị về hai bom tấn
                      "Wonder Woman" và "Aquaman"
                    </a>
                  </h4>
                  <p className="card-text">
                    Giống như "Justice League" trên phim ảnh, các ngôi sao của
                    DC đã tụ hội lại với nhau tại ComicCon thứ 4 vừa qua để
                    quảng cáo cho bộ phim sắp ra mắt của Warner Bros...
                  </p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">02/11/2017</small>
                </div>
              </article>
            </div>

            <div className="col-md-4">
              <article className="card">
                <img
                  className="card-img-top"
                  src="images/news/news-7.jpg"
                  alt="Quên hết hiềm khích đi, hôm nay là ngày sung sướng nhất của fan Marvel và DC"
                />
                <div className="card-block">
                  <h4 className="card-title">
                    <a href="#">
                      Quên hết hiềm khích đi, hôm nay là ngày sung sướng nhất
                      của fan Marvel và DC
                    </a>
                  </h4>
                  <p className="card-text">
                    Như thường lệ, lễ hội truyện tranh San Diego Comic-Con là
                    dịp để các hãng giới thiệu các dự án tiếp theo. Comic-Con đã
                    khiến người hâm mộ chết ngất trong sung sướng...
                  </p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">02/11/2017</small>
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>
      {/* </main> */}
    </>
  );
};

export default Detail;
