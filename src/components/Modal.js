import React from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ modal, setModal }) => {
  const { open, address } = modal;
  let y = useSpring(0, { stiffness: 100 });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key={"modal"}
          initial={{ y: 400 }}
          animate={{
            y: 0,
            transition: {
              duration: 0.8,
            },
          }}
          exit={{
            y: 400,
            transition: {
              duration: 0.8,
            },
          }}
          className="modal"
          style={{ y }}
          drag="y"
          dragConstraints={{ bottom: 0, top: 0 }}
          onDragEnd={() => {
            if (y.get() > 60) {
              setModal({ open: false });
            }
          }}
        >
          <button onClick={() => setModal(false)}>
            <AiOutlineClose />
          </button>
          <div className="content-container">
            <h2>{address}</h2>
          </div>
          <div className="line"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
