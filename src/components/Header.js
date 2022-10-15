import React, { useState } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";

const Header = ({ setCategory }) => {
  const [isMenu, setMenu] = useState(false);
  let y = useSpring(0, { stiffness: 100 });
  return (
    <AnimatePresence>
      <header className="header">
        <div className="logo">PIWO</div>
        <div className="burger-container">
          <button onClick={() => setMenu(!isMenu)} className="burger">
            <div></div>
          </button>
        </div>
      </header>
      {isMenu && (
        <motion.nav
          key={"nav"}
          initial={{ y: -800 }}
          animate={{
            y: 0,
            transition: {
              duration: 0.8,
            },
          }}
          exit={{
            y: -800,
            transition: {
              duration: 0.8,
            },
          }}
          style={{ y }}
          className="nav"
          drag="y"
          dragConstraints={{ bottom: 0, top: 0 }}
          onDragEnd={() => {
            if (y.get() < -80) {
              setMenu(false);
            }
          }}
        >
          <h2>Upss, tu pojawi się więcej info na temat projektu :)</h2>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Header;
