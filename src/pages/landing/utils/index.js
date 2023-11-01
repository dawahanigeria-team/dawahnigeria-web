import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

export const useRequest = (requestType, routeName, payload = null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleRequest = (type, route, payloadData) => {
    setIsLoading(true);
    axios[type](`${process.env.REACT_APP_API_BASE_URL}${route}`, payloadData)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleRequest(requestType, routeName, payload);
  }, [requestType, routeName, payload]);

  return { isLoading, data };
};

export const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  fade: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: false,
  nextArrow: false,
};
export const settings1 = {
  dots: false,
  infinite: false,
  autoplay: false,
  fade: false,
  speed: 500,
  slidesToShow: 6,
  swipeToSlide: true,
  slidesToScroll: 1,
  prevArrow: false,
  nextArrow: false,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
  ],
};
