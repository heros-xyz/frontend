export const cssStyles = (width?: string, height?: string) => `
.swiper {
  width: ${width ? width : "100%"};
  height: ${height ? height : "100%"};
  background: transparent;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: transparent;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.swiper-pagination-bullet-active {
  background-color: #FFC5EF !important;
}

.swiper-pagination-bullet {
  background-color: #DDDDDD;
  width: 5px;
  height: 5px;
}
`;
