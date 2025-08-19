

/**
 * A loading animation component.
 *
 * @returns {ReactElement} The loading animation
 */
const LoadingAnimation = () => {
  return (
    <div id="preloader">
      <div className="spinner"></div>

      <style jsx>{`
        /**
         * Overlay the whole page with a white background
         */
        #preloader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        /**
         * The spinner element
         */
        .spinner {
          width: 60px;
          height: 60px;
          border: 6px solid transparent;
          border-top: 6px solid #007bff;
          border-right: 6px solid #6610f2;
          border-radius: 50%;
          animation: spin 1.2s linear infinite, glow 2s ease-in-out infinite;
        }

        /**
         * Animations
         */

        /**
         * Rotate the spinner
         */
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /**
         * Add a glow effect to the spinner
         */
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.4),
              0 0 15px rgba(0, 123, 255, 0.2);
          }
          50% {
            box-shadow: 0 0 20px rgba(102, 16, 242, 0.6),
              0 0 40px rgba(102, 16, 242, 0.3);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;
