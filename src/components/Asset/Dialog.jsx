import { useCallback, useEffect, useMemo, useRef } from "react";
import styles from "./Dialog.module.scss";
import useTheme from "../../hooks/useTheme";

const Dialog = ({ open, locked, onClose, children, ...props }) => {
  const modalRef = useRef(null);
  const { theme, getColor } = useTheme();
  const dialogClasses = useMemo(() => {
    const _arr = [styles["dialog"]];
    if (!open) _arr.push(styles["dialog--closing"]);

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
    ({ target }) => {
      const { current: el } = modalRef;
      if (target === el) {
        // clicked inside the dialog
        return;
      }
      if (target.contains(el)) {
        // clicked inside a child element of the dialog
        return;
      }
      if (!locked) {
        onClose();
      }
    },
    [locked, onClose]
  );

  const onAnimEnd = useCallback(() => {
    const { current: el } = modalRef;
    if (!open) el.close();
  }, [open]);

  useEffect(() => {
    const { current: el } = modalRef;
    if (open) {
      el.show();
      const rect = el.getBoundingClientRect();
      if (rect.left < 0) {
        el.style.right = "auto";
        el.style.left = "10%";
      }
    }
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, open, onClose]);

  return (
    <dialog
      ref={modalRef}
      className={dialogClasses}
      onClose={onClose}
      onCancel={onCancel}
      onClick={onClick}
      onAnimationEnd={onAnimEnd}
    >
      <div
        className={styles["dialog__container"]}
        style={{ color: getColor(theme.minorBg) }}
      >
        {children}
      </div>
    </dialog>
  );
};

export default Dialog;
