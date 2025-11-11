import styled from "@emotion/styled";

// 카드 렌더링

const CardButton = styled.button`
  position: relative;
  width: var(--cell);
  aspect-ratio: 1 / 1;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  perspective: 900px;
  border-radius: 12px;

  &:focus { outline: none; }
  &:disabled { cursor: default; }

  &:focus-visible .focus-ring {
    opacity: 1;
    transform: scale(1);
  }
`;

const Inner = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 12px;
  transform-style: preserve-3d;
  transition: transform 0.4s ease;
  transform: ${({ open }) => (open ? "rotateY(180deg)" : "rotateY(0deg)")};
`;

const Face = styled.div`
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 28px;
`;

/* 닫힌 면(물음표) */
const Back = styled(Face)`
  background: ${({ theme }) => theme.colors.card};
  color: #fff;
`;

/* 열린 면(숫자) */
const Front = styled(Face)`
  transform: rotateY(180deg);
  border: 2px solid ${({ theme }) => theme.colors.primary};

  background: ${({ theme, matched }) =>
    matched ? theme.colors.cardMatched : theme.colors.cardFlip};
  color: ${({ theme, matched }) => (matched ? "#fff" : theme.colors.text)};
  box-shadow: ${({ matched }) =>
    matched ? "0 0 0 3px rgba(25, 76, 46, 0.18) inset" : "none"};
`;

/* 포커스 링: 회전 */
const FocusRing = styled.span`
  position: absolute;
  inset: -3px;
  border-radius: 14px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  pointer-events: none;
  opacity: 0;
  transform: scale(0.98);
  transition: opacity 0.2s ease, transform 0.2s ease;
`;

// open: 뒤집힌 상태, matched: 매칭 여부
export default function Card({ open, matched, value, onClick, disabled }) {
  return (
    <CardButton onClick={onClick} disabled={disabled} aria-pressed={open}>
      <Inner className="inner" open={open}>
        <Back>?</Back>
        <Front matched={matched}>{value}</Front>
        <FocusRing className="focus-ring" />
      </Inner>
    </CardButton>
  );
}
