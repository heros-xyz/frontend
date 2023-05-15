export const cssStyles = (width?: string, height?: string) => `
.swiper {
  width: ${width ? width : "100%"};
  height: ${height ? height : "100%"};
  padding-bottom: 20px;
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

.swiper-pagination {
  bottom : 0
}

.swiper-pagination-bullet-active {
  background-color: #1E16C1 !important;
}

.swiper-pagination-bullet {
  opacity: 1;
  background-color: #DDDDDD;
  width: 5px;
  height: 5px;
}

.swiper-button-prev,  .swiper-button-next{
  display: none
}

@media only screen and (min-width: 1024px) {
  .swiper {
    padding-bottom: 30px
  }

  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
  }

  .swiper-button-prev, .swiper-button-next{
    display: flex;
    color: #1E16C1;
  }
  .swiper-button-disabled {
    color: #797979;
    opacity: 1;
  }
  .swiper-button-prev:after, .swiper-button-next:after{
    font-size: 20px;
    font-weight: 700;
  }


}
`;

