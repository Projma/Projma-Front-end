import { useCallback, useEffect, useMemo, useRef } from "react";
import styles from "./Modal.module.scss";
import useTheme from "../../hooks/useTheme";

const Modal = ({ open, locked, onClose, children, ...props }) => {
  const modalRef = useRef(null);
  const { theme, getColor } = useTheme();

  const dialogClasses = useMemo(() => {
    const _arr = [styles["modal"]];
    if (!open) _arr.push(styles["modal--closing"]);
    return _arr.join(" ");
  }, [open]);

  const onCancel = useCallback(
    (e) => {
      e.preventDefault();
      if (!locked) onClose();
    },
    [locked, onClose]
  );

  const onClick = useCallback(
    ({ target, stopPropagation }) => {
      const { current: el } = modalRef;
      if (target === el && !locked) onClose();
      stopPropagation(); // Stop the event from bubbling up
    },
    [locked, onClose]
  );

  const onAnimEnd = useCallback(() => {
    const { current: el } = modalRef;
    if (!open) el.close();
  }, [open]);

  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const { current: el } = modalRef;
    if (open) el.showModal();
  }, [open]);

  return (
    <dialog
      ref={modalRef}
      className={dialogClasses}
      onClose={(e) => {
        e.stopPropagation();
        onClose();
      }}
      onCancel={onCancel}
      onClick={onClick}
      onAnimationEnd={onAnimEnd}
    >
      <div
        className={styles["modal__container"]}
        style={{ color: getColor(theme.minorBg) }}
        onClick={handleContainerClick}
      >
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
