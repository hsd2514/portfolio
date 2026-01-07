"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const BlurFadeText = ({
  text,
  className = "",
  delay = 0,
  as: Component = "p",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        delay: delay,
        duration: 0.4,
        ease: "easeOut",
      }}
    >
      <Component className={className}>
        {text}
      </Component>
    </motion.div>
  );
};

export default BlurFadeText;
