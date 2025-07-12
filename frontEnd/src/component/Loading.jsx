const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent overflow-hidden">
      <div className="loading-bar"></div>
      <div className="loading-bar-second"></div>

      <style>{`
        .loading-bar {
          position: absolute;
          height: 100%;
          background: #16a34a; /* layer utama hijau gelap */
          animation: loading-bar 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          transform-origin: left;
        }

        .loading-bar-second {
          position: absolute;
          height: 100%;
          background: #22c55e; /* layer kedua hijau terang */
          animation: loading-bar-second 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          transform-origin: left;
        }

        @keyframes loading-bar {
          0% {
            left: -35%;
            right: 100%;
          }
          60% {
            left: 100%;
            right: -90%;
          }
          100% {
            left: 100%;
            right: -90%;
          }
        }

        @keyframes loading-bar-second {
          0% {
            left: -200%;
            right: 100%;
          }
          60% {
            left: 107%;
            right: -8%;
          }
          100% {
            left: 107%;
            right: -8%;
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
