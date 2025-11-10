import { createPortal } from "react-dom";
import styled from "@emotion/styled";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(2px);
  display: grid;
  place-items: center;
  z-index: 50;
`;

const Box = styled.div`
  width: min(92vw, 420px);
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 20px 60px rgba(0,0,0,0.18);
  padding: 20px 22px;
  text-align: center;
`;

const Title = styled.h3`
  margin: 4px 0 10px;
  font-size: 18px;
  font-weight: 800;
`;

const Desc = styled.p`
  margin: 0 0 8px;
  font-size: 14px;
`;

const Sub = styled.p`
  margin: 6px 0 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export default function GameModal({ open, title, description, subText }) {
  if (!open) return null;
  return createPortal(
    <Overlay aria-modal="true" role="dialog">
      <Box>
        <Title>{title}</Title>
        {description && <Desc>{description}</Desc>}
        {subText && <Sub>{subText}</Sub>}
      </Box>
    </Overlay>,
    document.body
  );
}
