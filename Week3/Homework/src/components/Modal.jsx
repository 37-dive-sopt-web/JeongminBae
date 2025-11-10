import { createPortal } from "react-dom";
import styled from "@emotion/styled";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.35);
  display: grid;
  place-items: center;
  z-index: 1000;
`;

const Dialog = styled.div`
  min-width: 320px;
  max-width: 420px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0,0,0,.2);
  padding: 16px;
  outline: none;
`;

const Title = styled.h3`
  margin: 0 0 8px;
  font-size: 18px;
`;

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return createPortal(
    <Overlay role="presentation" onClick={(e) => {
      if (e.target === e.currentTarget) onClose?.();
    }}>
      <Dialog role="dialog" aria-modal="true" aria-labelledby="modal-title">
        {title && <Title id="modal-title">{title}</Title>}
        {children}
      </Dialog>
    </Overlay>,
    document.body
  );
}
