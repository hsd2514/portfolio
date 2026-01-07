"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const BlurFade = ({ children, delay = 0, className, inView = false, blur = "6px" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const shouldAnimate = inView ? isInView : true;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, filter: `blur(${blur})` }}
      animate={shouldAnimate ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        delay: delay,
        duration: 0.4,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default BlurFade;
