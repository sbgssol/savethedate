// import React, { useState, useRef, useEffect } from "react";
// import BorderedOnlyText from "./BorderShadownText";
// import BoxedNumber from "./BoxedNumber";

// // Import Josefin Sans from Google Fonts
// const josefinFont = `'Josefin Sans', sans-serif`;

// // Editable config object for all text and images
// const config = {
//   date: "2025-07-27T00:00:00",
//   names: {
//     en: { groom: "HỮU LÝ", bride: "CẨM TÚ" },
//     vi: { groom: "HỮU LÝ", bride: "CẨM TÚ" },
//   },
//   heading: {
//     en: "The wedding of",
//     vi: "Ngày Trọng Đại",
//   },
//   about: {
//     en: {
//       groom: "John is a passionate software engineer who loves music and hiking.",
//       bride: "Anna is a creative designer with a love for art and travel.",
//     },
//     vi: {
//       groom: "John là một kỹ sư phần mềm đam mê âm nhạc và leo núi.",
//       bride: "Anna là một nhà thiết kế sáng tạo, yêu nghệ thuật và du lịch.",
//     },
//   },
//   story: {
//     en: "Our journey began in college, blossomed through shared dreams, and grew stronger with every challenge. Now, we invite you to celebrate the next chapter of our love story.",
//     vi: "Chúng mình gặp nhau từ thời đại học, cùng nhau nuôi dưỡng ước mơ và vượt qua mọi thử thách. Giờ đây, chúng mình mong được chia sẻ chương mới của tình yêu cùng bạn.",
//   },
//   family: {
//     en: {
//       groomParents: "Mr. & Mrs. Nguyen",
//       brideParents: "Mr. & Mrs. Tran",
//     },
//     vi: {
//       groomParents: "Ông & Bà Nguyễn",
//       brideParents: "Ông & Bà Trần",
//     },
//   },
//   invitation: {
//     en: "We joyfully invite you to join us in celebrating our wedding.",
//     vi: "Chúng mình hân hoan mời bạn đến chung vui ngày cưới.",
//   },
//   ending: {
//     en: "Thank you for being part of our special day.",
//     vi: "Cảm ơn bạn đã là một phần trong ngày trọng đại của chúng mình.",
//   },
//   gallery: [
//     // Up to 20 placeholder images (use unsplash or your own)
//     "https://placehold.co/800x600/orange/white?text=Picture%201",
//     "https://placehold.co/800x600/red/white?text=Picture%202",
//     "https://placehold.co/800x600/green/white?text=Picture%203",
//     "https://placehold.co/800x600/blue/white?text=Picture%204",
//     "https://placehold.co/800x600/cyan/white?text=Picture%205",
//     "https://placehold.co/800x600/brown/white?text=Picture%206",
//   ],
//   aboutImages: ["https://placehold.co/150?text=Groom", "https://placehold.co/150?text=Bride"],
//   sections: [
//     { id: "notification", en: "Home", vi: "Trang Chủ" },
//     { id: "about", en: "About", vi: "Giới Thiệu" },
//     { id: "story", en: "Our Story", vi: "Chuyện Tình" },
//     { id: "family", en: "Family", vi: "Gia Đình" },
//     { id: "gallery", en: "Gallery", vi: "Hình Ảnh" },
//     { id: "invitation", en: "Invitation", vi: "Thiệp Mời" },
//     { id: "ending", en: "Thanks", vi: "Cảm Ơn" },
//   ],
// };

// function useCountdown(targetDate: string) {
//   const [time, setTime] = useState(getTimeLeft(targetDate));
//   useEffect(() => {
//     const timer = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
//     return () => clearInterval(timer);
//   }, [targetDate]);
//   return time;
// }
// function getTimeLeft(targetDate: string) {
//   const total = Date.parse(targetDate) - Date.now();
//   const seconds = Math.floor((total / 1000) % 60);
//   const minutes = Math.floor((total / 1000 / 60) % 60);
//   const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
//   const days = Math.floor(total / (1000 * 60 * 60 * 24));
//   return { total, days, hours, minutes, seconds };
// }

// const FadeSlider: React.FC<{ images: string[]; isActive: boolean }> = ({ images, isActive }) => {
//   const [idx, setIdx] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const touchStartX = useRef<number | null>(null);
//   const touchEndX = useRef<number | null>(null);

//   useEffect(() => {
//     if (!isActive) {
//       setPaused(false); // reset pause when leaving the gallery
//       return;
//     }
//     if (paused) return;
//     const timer = setTimeout(() => setIdx((i) => (i + 1) % images.length), 3500);
//     return () => clearTimeout(timer);
//   }, [idx, images.length, paused, isActive]);

//   const prev = () => {
//     setIdx((i) => (i - 1 + images.length) % images.length);
//     setPaused(true);
//   };
//   const next = () => {
//     setIdx((i) => (i + 1) % images.length);
//     setPaused(true);
//   };

//   // Touch gesture handlers
//   const onTouchStart = (e: React.TouchEvent) => {
//     touchStartX.current = e.touches[0].clientX;
//   };
//   const onTouchMove = (e: React.TouchEvent) => {
//     touchEndX.current = e.touches[0].clientX;
//   };
//   const onTouchEnd = () => {
//     if (touchStartX.current !== null && touchEndX.current !== null) {
//       const dx = touchEndX.current - touchStartX.current;
//       if (Math.abs(dx) > 40) {
//         if (dx < 0) next();
//         else prev();
//       }
//     }
//     touchStartX.current = null;
//     touchEndX.current = null;
//   };

//   return (
//     <div
//       className="relative w-full h-72 flex items-center justify-center overflow-hidden rounded-xl shadow-lg"
//       onTouchStart={onTouchStart}
//       onTouchMove={onTouchMove}
//       onTouchEnd={onTouchEnd}
//     >
//       {images.map((img, i) => (
//         <img
//           key={i}
//           src={img}
//           alt=""
//           className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${i === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
//           draggable={false}
//         />
//       ))}
//       <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
//         {/* <div className="flex gap-4 mb-2 ">
//           <button
//             className="bg-white/70 hover:bg-white text-2xl rounded-full w-10 h-10 flex items-center justify-center shadow"
//             onClick={prev}
//             aria-label="Previous image"
//             type="button"
//           >
//             &#60;
//           </button>
//           <button
//             className="bg-white/70 hover:bg-white text-2xl rounded-full w-10 h-10 flex items-center justify-center shadow"
//             onClick={next}
//             aria-label="Next image"
//             type="button"
//           >
//             &#62;
//           </button>
//         </div> */}
//         <div className="flex gap-1">
//           {images.map((_, i) => (
//             <span key={i} className={`block w-2 h-2 rounded-full ${i === idx ? "bg-pink-400" : "bg-white/60"}`} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// function FlipDigit({ value }: { value: number }) {
//   const [prev, setPrev] = useState(value);
//   const [flipping, setFlipping] = useState(false);

//   useEffect(() => {
//     if (value !== prev) {
//       setFlipping(true);
//       const timeout = setTimeout(() => {
//         setFlipping(false);
//         setPrev(value);
//       }, 400);
//       return () => clearTimeout(timeout);
//     }
//   }, [value, prev]);

//   // Always show 2 digits
//   const prevStr = String(prev).padStart(2, "0");
//   const valueStr = String(value).padStart(2, "0");

//   return (
//     <span className="inline-block w-[70px] h-[72px] m-1">
//       <span
//         className={`relative block w-full h-full rounded-lg bg-white/90 border border-[#0e32a8] shadow-lg overflow-hidden transition-colors duration-200`}
//         style={{
//           perspective: 400,
//         }}
//       >
//         <span
//           className={`absolute inset-0 flex items-center justify-center text-[56px] font-bold transition-transform duration-400 ease-in-out
//                       ${flipping ? "animate-flip" : ""}
//                     `}
//           style={{
//             backfaceVisibility: "hidden",
//             transform: flipping ? "rotateX(-90deg)" : "rotateX(0deg)",
//             transition: "transform 0.4s cubic-bezier(.77,0,.18,1)",
//           }}
//         >
//           {prevStr}
//         </span>
//         <span
//           className={`absolute inset-0 flex items-center justify-center text-[56px] font-bold transition-transform duration-400 ease-in-out
//                       ${flipping ? "animate-flip-in" : ""}
//                     `}
//           style={{
//             backfaceVisibility: "hidden",
//             transform: flipping ? "rotateX(0deg)" : "rotateX(90deg)",
//             transition: "transform 0.4s cubic-bezier(.77,0,.18,1)",
//           }}
//         >
//           {valueStr}
//         </span>
//       </span>
//       <style>{`
//                   @keyframes flip {
//                     0% { transform: rotateX(0deg);}
//                     100% { transform: rotateX(-90deg);}
//                   }
//                   @keyframes flip-in {
//                     0% { transform: rotateX(90deg);}
//                     100% { transform: rotateX(0deg);}
//                   }
//                   .animate-flip {
//                     animation: flip 0.4s forwards;
//                   }
//                   .animate-flip-in {
//                     animation: flip-in 0.4s forwards;
//                   }
//                 `}</style>
//     </span>
//   );
// }

// const App: React.FC = () => {
//   const [lang, setLang] = useState<"en" | "vi">("en");
//   const [activeSection, setActiveSection] = useState(config.sections[0].id);
//   const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
//   const countdown = useCountdown(config.date);

//   // Track active section on scroll (snap version)
//   useEffect(() => {
//     const handleScroll = () => {
//       const sectionIds = config.sections.map((s) => s.id);
//       const scrollY = window.scrollY;
//       const vh = window.innerHeight;
//       let found = sectionIds[0];
//       for (let id of sectionIds) {
//         const el = sectionRefs.current[id];
//         if (el) {
//           const rect = el.getBoundingClientRect();
//           if (rect.top <= vh * 0.5 && rect.bottom > vh * 0.5) {
//             found = id;
//             break;
//           }
//         }
//       }
//       setActiveSection(found);
//     };
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Google Fonts
//   useEffect(() => {
//     const link = document.createElement("link");
//     link.href = "https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@700;900&display=swap";
//     link.rel = "stylesheet";
//     document.head.appendChild(link);
//     return () => {
//       document.head.removeChild(link);
//     };
//   }, []);

//   return (
//     <div
//       className="relative min-h-screen bg-gradient-to-b from-[#1E2D59] via-pink-50 to-white text-[#1E2D59] font-sans h-screen overflow-y-scroll scroll-smooth snap-mandatory snap-y"
//       onWheel={(e) => {
//         e.preventDefault();
//         const sectionIds = config.sections.map((s) => s.id);
//         const currentIdx = sectionIds.indexOf(activeSection);
//         let nextIdx = currentIdx;
//         if (e.deltaY > 0 && currentIdx < sectionIds.length - 1) nextIdx++;
//         else if (e.deltaY < 0 && currentIdx > 0) nextIdx--;
//         if (nextIdx !== currentIdx) {
//           sectionRefs.current[sectionIds[nextIdx]]?.scrollIntoView({ behavior: "smooth", block: "start" });
//         }
//       }}
//       style={{ overscrollBehaviorY: "none" }}
//     >
//       {/* Language Toggle */}
//       {/* <button
//         className="fixed top-4 right-4 "
//         onClick={() => setLang((l) => (l === "en" ? "vi" : "en"))}
//         aria-label={lang === "en" ? "Switch to Vietnamese" : "Chuyển sang tiếng Anh"}
//       >
//         <img src={lang === "en" ? "/vn.png" : "/en.png"} alt={lang === "en" ? "Vietnamese" : "English"} className="w-6 h-6 object-contain" />
//       </button> */}

//       {/* Sections */}
//       <main className="flex flex-col gap-0 p-0">
//         {/* Notification Section */}
//         <section
//           ref={(el) => {
//             sectionRefs.current["notification"] = el as HTMLDivElement | null;
//           }}
//           id="notification"
//           className="min-h-screen h-screen flex flex-col items-center justify-between text-center bg-[#ffffff] snap-start overflow-hidden relative pb-28"
//         >
//           {/* Banner backgrounds */}
//           <img
//             src="/pink-flower.png"
//             alt="Banner BG 1"
//             className="absolute left-0 bottom-0 w-full h-full object-contain object-bottom opacity-20 pointer-events-none select-none z-10"
//             aria-hidden="true"
//           />
//           <img
//             src="/cam-tu-cau.png"
//             alt="Banner BG 1"
//             className="absolute left-0 bottom-0 w-full h-full object-contain object-bottom opacity-10 pointer-events-none select-none z-10"
//             aria-hidden="true"
//           />
//           {/* <img
//             src="/banner-bg-2.png"
//             alt="Banner BG 2"
//             className="absolute right-0 bottom-0 w-full h-full object-cover object-bottom opacity-40 pointer-events-none select-none z-0"
//             aria-hidden="true"
//           /> */}
//           <h2 className="font-fleur font-medium text-[50px]  text-[#1a53af]">{config.heading[lang]}</h2>
//           <div className="relative z-10 flex flex-col items-center gap-1">
//             {/* <svg width="420" height="90" viewBox="0 0 420 90" className="mx-auto mt-2" style={{ display: "block" }}>
//               <path id="wedding-arc" d="M20,80 Q210,0 400,80" fill="transparent" />
//               <text fontFamily="'Imperial ', cursive" fontSize="40" fill="#3b82f6" letterSpacing="0.2em" style={{ fontWeight: 400 }}>
//                 <textPath href="#wedding-arc" startOffset="50%" textAnchor="middle" dominantBaseline="middle">
//                   {config.heading[lang]}
//                 </textPath>
//               </text>
//             </svg> */}
//             <BorderedOnlyText
//               textFill="#0e32a8"
//               strokeWidth="2px"
//               strokeColor="#FFFFFF"
//               shadowWidth="10px"
//               shadowColor="#1F305E"
//               shadowBlur="1px"
//               className="font-rowdies text-[95px] uppercase"
//               str={"Hữu Lý"}
//             />
//             <img src="/hearts-blue.png" alt="Heart" className="m-0" />
//             <BorderedOnlyText
//               textFill="#0e32a8"
//               strokeWidth="2px"
//               strokeColor="#FFFFFF"
//               shadowWidth="10px"
//               shadowColor="#1F305E"
//               shadowBlur="1px"
//               className="font-rowdies text-[95px] uppercase"
//               str={"Cẩm Tú"}
//             />
//           </div>
//           <div>
//             <div className="flex flex-col items-center gap-2 relative z-10">
//               <div className="flex gap-3 text-[60px] font-bold font-tourney text-[#0e32a8]">
//                 {[
//                   { value: countdown.days, key: "days" },
//                   { value: countdown.hours, key: "hours" },
//                   { value: countdown.minutes, key: "minutes" },
//                   { value: countdown.seconds, key: "seconds" },
//                 ].map((item, idx, arr) => (
//                   <React.Fragment key={item.key}>
//                     <BoxedNumber
//                       className="text-[60px] rounded-[18px] p-0 m-0 w-[90px] h-[85px] flex justify-center items-center font-tiltNeon bg-gradient-to-t from-[#1F305E] to-[#0000B8] text-white font-medium shadow-xl"
//                       strokeWidth="12px"
//                     >
//                       {item.value.toString().padStart(2, "0")}
//                     </BoxedNumber>
//                   </React.Fragment>
//                 ))}
//               </div>
//               {/* <div className="w-full flex items-center justify-between">
//                 <BoxedNumber
//                   className="text-[70px] rounded-[20px] p-0m m-0 w-[95px] h-[90px] flex justify-center items-center font-tourney bg-[#1F305E] text-white"
//                   strokeWidth="12px"
//                 >
//                   {24}
//                 </BoxedNumber>
//                 <BoxedNumber
//                   className="text-[70px] rounded-[20px] p-0m m-0 w-[95px] h-[90px] flex justify-center items-center font-tourney bg-[#1F305E] text-white"
//                   strokeWidth="12px"
//                 >
//                   {"07"}
//                 </BoxedNumber>
//                 <BoxedNumber
//                   className="text-[70px] rounded-[20px] p-0m m-0 w-[95px] h-[90px] flex justify-center items-center font-tourney bg-[#1F305E] text-white"
//                   strokeWidth="12px"
//                 >
//                   {25}
//                 </BoxedNumber>
//               </div> */}
//             </div>
//           </div>

//           {/* FlipDigit component */}
//           {/*
//             Place this above App in the same file or extract as needed.
//           */}
//         </section>

//         {/* About Section */}
//         <section
//           ref={(el: HTMLDivElement | null) => {
//             sectionRefs.current["about"] = el;
//           }}
//           id="about"
//           className="px-4 bg-[#EDF6FF] snap-start"
//           style={{ minHeight: "100dvh", height: "100dvh" }}
//         >
//           <div className="pt-12">
//             <h2 className="text-2xl font-bold mb-6 text-center">{lang === "en" ? "About Us" : "Về Chúng Mình"}</h2>
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
//               <div className="flex flex-col items-center gap-2">
//                 <img src={config.aboutImages[0]} alt="Groom" className="w-28 h-28 rounded-full object-cover border-4 border-pink-200 shadow" />
//                 <div className="font-semibold" style={{ fontFamily: josefinFont }}>
//                   {config.names[lang].groom}
//                 </div>
//                 <div className="text-sm text-center max-w-xs">{config.about[lang].groom}</div>
//               </div>
//               <div className="flex flex-col items-center gap-2">
//                 <img src={config.aboutImages[1]} alt="Bride" className="w-28 h-28 rounded-full object-cover border-4 border-pink-200 shadow" />
//                 <div className="font-semibold" style={{ fontFamily: josefinFont }}>
//                   {config.names[lang].bride}
//                 </div>
//                 <div className="text-sm text-center max-w-xs">{config.about[lang].bride}</div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Story Section */}
//         <section
//           ref={(el: HTMLDivElement | null) => {
//             sectionRefs.current["story"] = el;
//           }}
//           id="story"
//           className="px-4 bg-[#EDF6FF] snap-start"
//           style={{ minHeight: "100dvh", height: "100dvh" }}
//         >
//           <div className="pt-12">
//             <h2 className="text-2xl font-bold mb-6 text-center">{lang === "en" ? "Our Story" : "Chuyện Tình"}</h2>
//             <div className="max-w-xl mx-auto text-center text-base leading-relaxed">{config.story[lang]}</div>
//           </div>
//         </section>

//         {/* Family Info Section */}
//         <section
//           ref={(el: HTMLDivElement | null) => {
//             sectionRefs.current["family"] = el;
//           }}
//           id="family"
//           className="px-4 bg-[#EDF6FF] snap-start"
//           style={{ minHeight: "100dvh", height: "100dvh" }}
//         >
//           <div className="pt-12">
//             <h2 className="text-2xl font-bold mb-6 text-center">{lang === "en" ? "Family" : "Gia Đình"}</h2>
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
//               <div className="flex flex-col items-center gap-1">
//                 <div className="font-semibold text-pink-400">{lang === "en" ? "Groom's Parents" : "Ba mẹ chú rể"}</div>
//                 <div>{config.family[lang].groomParents}</div>
//                 <div className="mt-2 font-bold" style={{ fontFamily: josefinFont }}>
//                   {config.names[lang].groom}
//                 </div>
//               </div>
//               <div className="flex flex-col items-center gap-1">
//                 <div className="font-semibold text-pink-400">{lang === "en" ? "Bride's Parents" : "Ba mẹ cô dâu"}</div>
//                 <div>{config.family[lang].brideParents}</div>
//                 <div className="mt-2 font-bold" style={{ fontFamily: josefinFont }}>
//                   {config.names[lang].bride}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Gallery Section */}
//         <section
//           ref={(el: HTMLDivElement | null) => {
//             sectionRefs.current["gallery"] = el;
//           }}
//           id="gallery"
//           className="px-4 bg-[#EDF6FF] snap-start"
//           style={{ minHeight: "100dvh", height: "100dvh" }}
//         >
//           <div className="pt-12">
//             <h2 className="text-2xl font-bold mb-6 text-center">{lang === "en" ? "Gallery" : "Hình Ảnh"}</h2>
//             <FadeSlider images={config.gallery} isActive={activeSection === "gallery"} />
//           </div>
//         </section>

//         {/* Invitation Section */}
//         <section
//           ref={(el: HTMLDivElement | null) => {
//             sectionRefs.current["invitation"] = el;
//           }}
//           id="invitation"
//           className="px-4 bg-[#EDF6FF] snap-start"
//           style={{ minHeight: "100dvh", height: "100dvh" }}
//         >
//           <div className="pt-12">
//             <h2 className="text-2xl font-bold mb-6 text-center">{lang === "en" ? "Invitation" : "Thiệp Mời"}</h2>
//             <div className="max-w-xl mx-auto text-center text-lg font-medium">{config.invitation[lang]}</div>
//           </div>
//         </section>

//         {/* Ending Words Section */}
//         <section
//           ref={(el: HTMLDivElement | null) => {
//             sectionRefs.current["ending"] = el;
//           }}
//           id="ending"
//           className="px-4 bg-[#EDF6FF] snap-start"
//           style={{ minHeight: "100dvh", height: "100dvh" }}
//         >
//           <div className="pt-12">
//             <div className="max-w-xl mx-auto text-center text-base italic text-[#1E2D59]/80">{config.ending[lang]}</div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default App;

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LangButton from "./components/LangBtn";
import en from "./locales/en.json";
import vi from "./locales/vi.json";
import "./index.css";

const translations = { en, vi };
const sections = ["home", "about", "gallery", "stories", "rsvp"] as const;
type Section = (typeof sections)[number];

type Lang = "en" | "vi";

export default function App() {
  // const [lang, setLang] = useState<Lang>("en");
  // const [currentIndex, setCurrentIndex] = useState(0);

  // const handleWheel = (e: React.WheelEvent) => {
  //   if (e.deltaY > 0 && currentIndex < sections.length - 1) {
  //     setCurrentIndex((prev) => prev + 1);
  //   } else if (e.deltaY < 0 && currentIndex > 0) {
  //     setCurrentIndex((prev) => prev - 1);
  //   }
  // };

  const [lang, setLang] = useState<Lang>("en");
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastTouchY = useRef<number | null>(null);
  const scrollLock = useRef(false);

  const t = translations[lang];

  const goToSection = (delta: number) => {
    if (scrollLock.current) return;
    scrollLock.current = true;
    setTimeout(() => (scrollLock.current = false), 800); // throttle

    setCurrentIndex((prev) => {
      const next = prev + delta;
      return Math.max(0, Math.min(sections.length - 1, next));
    });
  };

  // Desktop scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) goToSection(1);
      else if (e.deltaY < 0) goToSection(-1);
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  // Mobile swipe
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      lastTouchY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (lastTouchY.current === null) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = lastTouchY.current - touchEndY;

      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) goToSection(1); // swipe up
        else goToSection(-1); // swipe down
      }

      lastTouchY.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // const t = translations[lang];

  return (
    // <div className="h-screen w-screen overflow-hidden" onWheel={handleWheel}>
    <div className="h-screen w-screen overflow-hidden">
      {/* <div className="fixed top-4 right-4 z-50">
        <LangButton lang={lang} setLang={setLang} />
      </div> */}
      <div className="fixed top-4 right-4 z-50">
        <LangButton lang={lang} setLang={setLang} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.6 }}
          className="h-screen w-screen flex items-center justify-center text-center px-4"
        >
          {sections[currentIndex] === "home" && <h1 className="text-5xl font-bold">{t.home.title}</h1>}
          {sections[currentIndex] === "about" && <h1 className="text-5xl font-bold">{t.about.title}</h1>}
          {sections[currentIndex] === "gallery" && <h1 className="text-5xl font-bold">{t.gallery.title}</h1>}
          {sections[currentIndex] === "stories" && <h1 className="text-5xl font-bold">{t.stories.title}</h1>}
          {sections[currentIndex] === "rsvp" && (
            <div className="text-left space-y-4">
              <h1 className="text-4xl font-bold">{t.rsvp.title}</h1>
              <form className="space-y-4">
                <div>
                  <label>{t.rsvp.question}</label>
                  <br />
                  <select className="border p-2 rounded">
                    <option value="yes">{t.rsvp.yes}</option>
                    <option value="no">{t.rsvp.no}</option>
                  </select>
                </div>
                <div>
                  <label>{t.rsvp.howMany}</label>
                  <br />
                  <input type="number" className="border p-2 rounded w-full" />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  {t.rsvp.confirm}
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
