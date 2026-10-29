
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function JewelleryLookbook() {
  const image = "/fa.png";
  const ringImage = "/ring.png";

  const products = [
    {
      id: 1,
      name: "LOTUS TITANE",
      price: "₹3800",
      size: "7MM FLAT TRAGUS",
      material: "180 GRADE TITANIUM",
      x: 43,
      y: 45,
    },
    {
      id: 2,
      name: "CELESTE CUFF",
      price: "₹4200",
      size: "CRYSTAL EAR CUFF",
      material: "GOLD PLATED TITANIUM",
      x: 38,
      y: 34,
    },
    {
      id: 5,
      name: "SCULPTED GOLD",
      price: "₹3200",
      size: "ORGANIC MINI STUD",
      material: "GOLD PLATED TITANIUM",
      x: 54,
      y: 51.5,
    },
  ];

  const [active, setActive] = useState(null);
  const activeProduct = products.find((p) => p.id === active);

  return (
    <section className="jl-editorial">
      <style>{`
        .jl-editorial {
          width: 100%;
          min-height: 100vh;
          padding: 40px 0;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          background: #080808;
          color: #fff;
          font-family: inherit;
        }

        .jl-editorial *,
        .jl-editorial *::before,
        .jl-editorial *::after {
          box-sizing: border-box;
        }

        .jl-frame {
          position: relative;
          width: 40vw;
          min-width: 320px;
          max-width: 520px;
          margin: 0 auto;
          overflow: hidden;
          isolation: isolate;
          background: #080808;
        }

        .jl-photo {
          display: block;
          width: 100%;
          height: auto;
          user-select: none;
          -webkit-user-drag: none;
        }

        /* Hotspot container stays centered on its coordinates */

        .jl-marker {
          position: absolute;
          z-index: 3;
          width: 100px;
          height: 100px;
          padding: 0;
          border: 0;
          background: transparent;
          transform: translate(-50%, -50%);
          display: grid;
          place-items: center;
          overflow: visible;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        /* Ring image */

        .jl-ring-image {
          display: block;
          width: 0;
          height: 0;
          max-width: none;
          max-height: none;
          margin: 0;
          padding: 0;
          object-fit: contain;
          object-position: center center;
          transform-origin: 50% 50%;
          flex-shrink: 0;
          pointer-events: none;
          will-change: transform, width, height;
          transition:
            width 0.4s cubic-bezier(.22, 1, .36, 1),
            height 0.4s cubic-bezier(.22, 1, .36, 1);
        }

        .jl-marker.is-active .jl-ring-image {
          width: 120px;
          height: 120px;
        }

        .jl-marker:focus-visible {
          outline: 1px solid white;
          outline-offset: 4px;
          border-radius: 50%;
        }

        /* Product information */

        .jl-product-info {
          position: absolute;
          z-index: 5;
          left: 7%;
          bottom: 7%;
          width: 86%;
          margin: 0;
          padding: 0;
          color: #fff;
          background: transparent;
          border: none;
          box-shadow: none;
          pointer-events: none;
        }

        .jl-product-name {
          margin: 0 0 20px;
          padding: 0;
          color: #fff;
          background: transparent;
          font-size: clamp(16px, 1.2vw, 20px);
          font-weight: 400;
          line-height: 1.15;
          letter-spacing: 0;
          font-family: "futura", sans-serif;
          text-transform: uppercase;
        }

        .jl-product-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 3px;
          padding: 0;
          color: #fff;
          background: transparent;
          font-size: clamp(8px, .65vw, 10px);
          font-weight: 400;
          line-height: 1.35;
          font-family: "overpass", sans-serif;
          text-transform: uppercase;
        }

        @media (min-width: 1600px) {
          .jl-frame {
            width: 30vw;
            max-width: 600px;
          }
        }

        @media (max-width: 900px) {
          .jl-frame {
            width: 45vw;
            min-width: 300px;
          }
        }

        @media (max-width: 600px) {
          .jl-editorial {
            min-height: auto;
            padding: 20px 0;
          }

          .jl-frame {
            width: 82vw;
            min-width: 0;
            max-width: none;
          }

          .jl-marker {
            width: 100px;
            height: 100px;
          }

          .jl-marker.is-active .jl-ring-image {
            width: 120px;
            height: 120px;
          }

          .jl-product-info {
            left: 7%;
            bottom: 6%;
            width: 86%;
          }

          .jl-product-name {
            margin-bottom: 9px;
            font-size: 12px;
          }

          .jl-product-meta {
            gap: 3px;
            font-size: 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .jl-ring-image {
            transition: none;
          }
        }
      `}</style>

      <div className="jl-frame">
        <img
          className="jl-photo"
          src={image}
          alt="Editorial close-up showcasing ear jewellery"
          draggable="false"
        />

        {/* Interactive ring hotspots */}
        {products.map((product) => (
          <motion.button
            key={product.id}
            type="button"
            className={`jl-marker ${
              active === product.id ? "is-active" : ""
            }`}
            style={{
              left: `${product.x}%`,
              top: `${product.y}%`,
            }}
            aria-label={`View ${product.name}`}
            aria-pressed={active === product.id}
            onMouseEnter={() => setActive(product.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(product.id)}
            onBlur={() => setActive(null)}
            onClick={() =>
              setActive((current) =>
                current === product.id ? null : product.id
              )
            }
          >
            <motion.img
              className="jl-ring-image"
              src={ringImage}
              alt=""
              draggable="false"
              animate={
                active === product.id
                  ? { rotate: 360 }
                  : { rotate: 0 }
              }
              transition={
                active === product.id
                  ? {
                      rotate: {
                        duration: 12,
                        ease: "linear",
                        repeat: Infinity,
                      },
                    }
                  : {
                      duration: 0.35,
                      ease: "easeOut",
                    }
              }
            />
          </motion.button>
        ))}

        {/* Product details with blur animation */}
        <AnimatePresence mode="wait">
          {activeProduct && (
            <motion.div
              key={activeProduct.id}
              className="jl-product-info"
              initial={{
                opacity: 0,
                y: 10,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: -6,
                filter: "blur(8px)",
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h3 className="jl-product-name">
                {activeProduct.name}
              </h3>

              <div className="jl-product-meta">
                <span>{activeProduct.price}</span>
                <span>{activeProduct.size}</span>
                <span>{activeProduct.material}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}



