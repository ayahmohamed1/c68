import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ================= 1. CUSTOM VIDEO PLAYER =================
function CustomVideoPlayer({ src, poster }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="relative w-full max-w-md sm:max-w-lg mx-auto overflow-hidden rounded-2xl shadow-2xl bg-black z-20 aspect-square">
      <video
        ref={videoRef}
        className="w-full h-full object-cover cursor-pointer"
        poster={poster}
        controls={isPlaying}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        playsInline
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] cursor-pointer z-20"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#58323E]/90 text-[#f3e3ce] shadow-2xl border-2 border-[#f3e3ce]/40 backdrop-blur-md transition-all group-hover:bg-[#43232E]"
              aria-label="Play Video"
            >
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 ml-1 fill-current text-[#f3e3ce] drop-shadow-md"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ================= 2. MAIN APP COMPONENT =================
export default function App() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeHeroPhoto, setActiveHeroPhoto] = useState(null);
  const [activeCollageId, setActiveCollageId] = useState(null);

  const PHOTOS = [
    { id: 1, src: '/images/photo3.jpg', classes: 'absolute top-[19%] left-[2%] sm:left-[5%] w-[47%] sm:w-[35%] max-w-[340px]', rotate: -6 },
    { id: 2, src: '/images/photo4.jpg', classes: 'absolute top-[6%] right-[2%] sm:right-[5%] w-[47%] sm:w-[35%] max-w-[340px]', rotate: 6 },
    { id: 3, src: '/images/photo5.jpg', classes: 'absolute top-[50%] left-[2%] sm:left-[5%] w-[47%] sm:w-[35%] max-w-[340px]', rotate: -5 },
    { id: 4, src: '/images/photo6.jpg', classes: 'absolute top-[36%] right-[2%] sm:right-[5%] w-[47%] sm:w-[35%] max-w-[340px]', rotate: 5 },
    { id: 5, src: '/images/photo7.jpg', classes: 'absolute top-[81%] left-[2%] sm:left-[5%] w-[47%] sm:w-[35%] max-w-[340px]', rotate: -6 },
    { id: 6, src: '/images/photo8.jpg', classes: 'absolute top-[67%] right-[2%] sm:right-[5%] w-[47%] sm:w-[35%] max-w-[340px]', rotate: 5 },
  ];

  const handleRestart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`w-full bg-[#8c657a] text-white ${showMain ? 'overflow-y-auto' : 'h-screen overflow-hidden'}`}>
      
      {/* ================= SECTION 1: THE ENVELOPE ================= */}
      <AnimatePresence>
        {!showMain && (
          <motion.section
            key="envelope-screen"
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-[#8c657a]"
          >
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10 sm:mb-12 -rotate-6 font-hand text-3xl sm:text-4xl text-[#f3e3ce] relative right-12 sm:right-16 drop-shadow-md z-30"
            >
              open me!
            </motion.p>

            <div 
              className="relative flex items-center justify-center w-full max-w-sm cursor-pointer mt-6"
              onClick={() => setIsEnvelopeOpened(true)}
            >
              <motion.img 
                src="/images/envelope-closed.png"
                alt="Closed Envelope"
                className="relative z-20 w-72 sm:w-80 object-contain drop-shadow-2xl"
                animate={isEnvelopeOpened ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 1, rotate: -6 }}
                transition={{ duration: 0.8 }}
                onAnimationComplete={() => {
                  if (isEnvelopeOpened) {
                    setShowMain(true);
                  }
                }}
                whileHover={!isEnvelopeOpened ? { scale: 1.05 } : {}}
                whileTap={!isEnvelopeOpened ? { scale: 0.95 } : {}}
              />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ================= SECTION 2: GREETING HERO ================= */}
      <section id="hero-section" className="relative flex min-h-screen flex-col items-center justify-start pt-14 sm:pt-20 pb-16 px-4 text-center overflow-hidden">
        <div 
          className="absolute left-0 top-0 h-full w-20 sm:w-36 pointer-events-none z-0 opacity-95"
          style={{ backgroundImage: "url('/images/flowers-left.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'left top' }}
        ></div>
        <div 
          className="absolute right-0 top-0 h-full w-20 sm:w-36 pointer-events-none z-0 opacity-95"
          style={{ backgroundImage: "url('/images/flowers-right.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'right top' }}
        ></div>

        <div className="z-10 flex flex-col items-center">
          <p className="font-serif text-sm uppercase tracking-[0.15em] text-[#f3e3ce] drop-shadow-sm max-w-xs sm:max-w-md">
            To the most beautiful girl!
          </p>
          
          <h1 className="my-2 font-script text-[6.5rem] leading-none text-[#f3e3ce] drop-shadow-md sm:text-[9rem]">
            Heba
          </h1>
          
          <p className="font-serif text-sm uppercase tracking-[0.2em] text-[#f3e3ce] drop-shadow-sm">
           i love you
          </p>
        </div>

        <div className="relative z-10 mt-20 sm:mt-28 h-72 w-[320px] sm:h-96 sm:w-[440px] flex items-end justify-center">
          <div className="absolute bottom-0 h-48 w-full bg-[#dcc6ad] rounded-md shadow-inner sm:h-60"></div>
          
          {/* Left Polaroid (photo2.jpg) */}
          <motion.div 
            initial={{ rotate: -12 }}
            animate={{
              rotate: -12,
              scale: activeHeroPhoto === 'left' ? 1.08 : 1,
              y: activeHeroPhoto === 'left' ? -16 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            whileHover={{ scale: 1.08, y: -16, rotate: -12 }}
            onMouseEnter={() => setActiveHeroPhoto('left')}
            onMouseLeave={() => setActiveHeroPhoto(null)}
            onTouchStart={() => setActiveHeroPhoto('left')}
            onClick={() => {
              if (activeHeroPhoto === 'left') {
                setSelectedPhoto('/images/photo2.jpg');
              } else {
                setActiveHeroPhoto('left');
              }
            }}
            className={`absolute bottom-10 left-2 w-36 sm:w-48 -rotate-12 bg-white p-2 pb-5 sm:p-2.5 sm:pb-6 rounded-lg transition-all duration-300 cursor-pointer sm:bottom-14 sm:left-4 ${
              activeHeroPhoto === 'left'
                ? 'shadow-[0_20px_45px_rgba(0,0,0,0.45)] ring-2 ring-[#f3e3ce]/50'
                : 'shadow-polaroid'
            }`}
            style={{
              zIndex: activeHeroPhoto === 'left' ? 35 : (activeHeroPhoto === 'right' ? 10 : 15),
            }}
          >
            <div className="w-full aspect-[9/20] overflow-hidden rounded bg-neutral-100">
              <img src="/images/photo2.jpg" className="h-full w-full object-cover" alt="Pic 1" />
            </div>
          </motion.div>

          {/* Right Polaroid (photo1.jpg) */}
          <motion.div 
            initial={{ rotate: 12 }}
            animate={{
              rotate: 12,
              scale: activeHeroPhoto === 'right' ? 1.08 : 1,
              y: activeHeroPhoto === 'right' ? -16 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            whileHover={{ scale: 1.08, y: -16, rotate: 12 }}
            onMouseEnter={() => setActiveHeroPhoto('right')}
            onMouseLeave={() => setActiveHeroPhoto(null)}
            onTouchStart={() => setActiveHeroPhoto('right')}
            onClick={() => {
              if (activeHeroPhoto === 'right') {
                setSelectedPhoto('/images/photo1.jpg');
              } else {
                setActiveHeroPhoto('right');
              }
            }}
            className={`absolute bottom-8 right-2 w-36 sm:w-48 rotate-12 bg-white p-2 pb-5 sm:p-2.5 sm:pb-6 rounded-lg transition-all duration-300 cursor-pointer sm:bottom-12 sm:right-4 ${
              activeHeroPhoto === 'right'
                ? 'shadow-[0_20px_45px_rgba(0,0,0,0.45)] ring-2 ring-[#f3e3ce]/50'
                : 'shadow-polaroid'
            }`}
            style={{
              zIndex: activeHeroPhoto === 'right' ? 35 : (activeHeroPhoto === 'left' ? 10 : 20),
            }}
          >
            <div className="w-full aspect-[9/20] overflow-hidden rounded bg-neutral-100">
              <img src="/images/photo1.jpg" className="h-full w-full object-cover" alt="Pic 2" />
            </div>
          </motion.div>

          <div 
            className="relative z-20 h-32 w-full bg-[#f3e3ce] shadow-[-2px_-4px_12px_rgba(0,0,0,0.08)] rounded-b-md sm:h-40 pointer-events-none"
            style={{ clipPath: 'polygon(0 0, 50% 15%, 100% 0, 100% 100%, 0 100%)' }}
          ></div>
        </div>

        <div className="z-10 mt-16 mb-8 rounded-full bg-[#58323E] px-14 py-3.5 font-serif text-sm uppercase tracking-[0.3em] text-[#f3e3ce] shadow-xl hover:scale-105 transition-transform cursor-pointer border border-[#f3e3ce]/20">
          I love u
        </div>
      </section>

      {/* ================= SECTION 3: VIDEO & LETTER ================= */}
      <section className="relative flex min-h-screen flex-col items-center justify-start sm:justify-center py-20 px-4 overflow-hidden">
        <div 
          className="absolute left-0 top-0 h-full w-20 sm:w-36 pointer-events-none z-0 opacity-95"
          style={{ backgroundImage: "url('/images/flowers-left.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'left top' }}
        ></div>
        <div 
          className="absolute right-0 top-0 h-full w-20 sm:w-36 pointer-events-none z-0 opacity-95"
          style={{ backgroundImage: "url('/images/flowers-right.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'right top' }}
        ></div>

        <div className="z-10 w-full px-2 max-w-4xl">
          <CustomVideoPlayer 
            src="/images/video.mp4" 
            poster="/images/poster.jpg"
          />
        </div>

        {/* التعديل الجذري: الورقة أصبحت خلفية مطاطية تتسع للنص، مع هوامش أمان ضخمة لا يمكن اختراقها */}
        <div 
          className="z-10 mt-16 sm:mt-24 relative w-[95%] sm:w-[85%] max-w-[700px] mx-auto drop-shadow-2xl flex flex-col items-center justify-center text-center"
          style={{
            backgroundImage: "url('/images/lace paper.png')",
            backgroundSize: '150% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height:'800px'
          }}
        >
          <div className="w-full pt-[24%] pb-[28%] px-[18%] sm:pt-[22%] sm:pb-[26%] sm:px-[22%]">
            <p className="font-letter text-[16px] sm:text-2xl lg:text-3xl font-bold text-[#4a362f] mb-3 sm:mb-5">
              To my favorite person,
            </p>
            <p className="font-letter text-[11.5px] sm:text-[15px] lg:text-[17px] leading-[1.9] sm:leading-[2.2] font-bold text-[#4a362f]">
              My beautiful girl!
              Thank you for all the happiness, comfort, and laughter you’ve brought into my life. 
              Having you by my side is truly one of the most beautiful things in my life, 
              and I’m grateful for you every single day. For all years, you’ve been my everything,
              my best friend, and the person I can tell all my secrets to.
              No one has ever been loved by me the way you are, and no one ever will.
              I love you so much, habibty
              i dont imagine my life without you. you are my sweetheart!
            </p>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: PHOTO COLLAGE ================= */}
      <section className="relative w-full overflow-hidden px-4 py-10 sm:px-10 min-h-screen">
        
        <div 
          className="absolute left-0 top-0 h-full w-20 sm:w-36 pointer-events-none z-0 opacity-95"
          style={{ backgroundImage: "url('/images/flowers-left.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'left top' }}
        ></div>
        <div 
          className="absolute right-0 top-0 h-full w-20 sm:w-36 pointer-events-none z-0 opacity-95"
          style={{ backgroundImage: "url('/images/flowers-right.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'right top' }}
        ></div>

        <div className="relative mx-auto w-full max-w-5xl h-[2450px] sm:h-[3200px] z-10 mt-10">
          
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-2 sm:top-6 left-[6%] sm:left-[8%] font-serif text-3xl sm:text-5xl uppercase leading-snug tracking-widest text-[#f3e3ce] drop-shadow-md z-20"
          >
            MY FAV PICS <br /> OF YOU
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute top-[32%] left-0 w-full text-center z-30 pointer-events-none"
          >
            <p className="font-sans text-[13px] sm:text-[18px] text-white font-semibold tracking-wide drop-shadow-lg px-2">
            </p>
          </motion.div>

          {PHOTOS.map((photo, i) => {
            const isActive = activeCollageId === photo.id;
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8, rotate: photo.rotate }}
                animate={{ 
                  opacity: 1, 
                  scale: isActive ? 1.08 : 1, 
                  rotate: photo.rotate,
                }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.08 }}
                onMouseEnter={() => setActiveCollageId(photo.id)}
                onMouseLeave={() => setActiveCollageId(null)}
                onTouchStart={() => setActiveCollageId(photo.id)}
                onClick={() => {
                  if (isActive) {
                    setSelectedPhoto(photo.src);
                  } else {
                    setActiveCollageId(photo.id);
                  }
                }}
                className={`bg-white p-2 pb-4 sm:p-3 sm:pb-6 rounded-xl transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'shadow-[0_20px_45px_rgba(0,0,0,0.45)] ring-2 ring-[#f3e3ce]/50' 
                    : 'shadow-[0_10px_30px_rgba(0,0,0,0.28)]'
                } ${photo.classes}`}
                style={{
                  zIndex: isActive ? 50 : 10
                }}
              >
                <div className="w-full aspect-[9/20] overflow-hidden rounded-md bg-neutral-100">
                  <img 
                    src={photo.src} 
                    alt={`Collage pic ${photo.id}`} 
                    className="h-full w-full object-cover" 
                  />
                </div>
              </motion.div>
            );
          })}

        </div>

        <div className="relative z-20 mt-8 pb-12 flex justify-center">
          <motion.button
            type="button"
            onClick={handleRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-[#58323e] px-10 py-4 font-serif text-sm uppercase tracking-widest text-[#f3e3ce] shadow-xl border border-[#f3e3ce]/20"
          >
            Read it again
          </motion.button>
        </div>

      </section>

      {/* ================= LIGHTBOX MODAL ================= */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] max-w-sm sm:max-w-md w-full bg-white p-2.5 pb-5 sm:p-3 sm:pb-6 rounded-2xl shadow-2xl flex flex-col items-center"
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#58323e] text-[#f3e3ce] shadow-lg border border-white/40 hover:scale-110 transition-transform font-bold"
                aria-label="Close"
              >
                ✕
              </button>
              <div className="w-full aspect-[9/20] max-h-[82vh] overflow-hidden rounded-xl bg-neutral-100">
                <img
                  src={selectedPhoto}
                  alt="Expanded view"
                  className="h-full w-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}