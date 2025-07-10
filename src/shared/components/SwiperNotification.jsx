import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SwiperNotification = forwardRef((props, ref) => {
  const [messages, setMessages] = React.useState([]);
  const swiperRef = useRef(null);

  useImperativeHandle(ref, () => ({
    notify: (msg) => {
      setMessages((prev) => [...prev, msg]);
      setTimeout(() => {
        setMessages((prev) => prev.slice(1));
      }, 3000); // Oculta después de 3 segundos
    },
  }));

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        width: 300,
      }}
    >
      {messages.length > 0 && (
        <Swiper
          ref={swiperRef}
          slidesPerView={1}
          allowTouchMove={false}
          loop={false}
        >
          {messages.map((msg, idx) => (
            <SwiperSlide key={idx}>
              <div
                style={{
                  background: "#0d6efd",
                  color: "#fff",
                  padding: "16px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                {msg}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
});

export default SwiperNotification;
