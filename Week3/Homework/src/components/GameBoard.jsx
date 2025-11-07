// src/components/GameBoard.jsx
import { useState } from "react";
import styled from "@emotion/styled";
import { buildDeck } from "../utils/deck";

const BoardShell = styled.section`
  width: 1100px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.primarySoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(25, 76, 46, 0.08);
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 340px;   /* 좌: 보드 / 우: 정보 */
  gap: 16px;
`;

const LeftArea = styled.div``;

const BoardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0 10px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
`;

const ResetButton = styled.button`
  padding: 7px 10px;
  font-size: 12px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: #fff;
  background: ${({ theme }) => theme.colors.resetButton};
  cursor: pointer;
  line-height: 1;
  &:hover { background: ${({ theme }) => theme.colors.primaryHover}; }
  &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.primary}; outline-offset: 2px; }
`;

const BoardGrid = styled.div`
  --cell: 112px;                         /* 카드 한 변 길이 */
  display: grid;
  grid-template-columns: repeat(4, var(--cell));
  gap: 14px;
  justify-content: center;               /* 그리드 가운데 정렬 */
  padding: 8px 0 4px;
`;

const CardCell = styled.div`
  width: var(--cell);
  aspect-ratio: 1 / 1;                   /* 정사각형 유지 */
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.card};
  color: #ffffff;
  font-weight: 800;
  font-size: 28px;
  display: grid;
  place-items: center;
  user-select: none;
`;

const RightArea = styled.aside`
  background: ${({ theme }) => theme.colors.primaryDark};
  border-radius: 12px;
  padding: 12px;
  display: grid;
  gap: 12px;
`;

const SectionLabel = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 2px 0 6px;
`;

const LevelSelect = styled.select`
  width: 100%;
  height: 36px;
  padding: 0 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primarySoft};
  font-weight: 700;
`;

const StatRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

const StatBox = styled.div`
  background: ${({ theme }) => theme.colors.primarySoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  display: grid;
  gap: 4px;
  > small { font-size: 12px; color: #666; }
  > strong { font-size: 18px; font-weight: 800; }
`;

const MessageBox = styled.div`
  background: ${({ theme }) => theme.colors.primarySoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 12px;
  min-height: 48px;
  display: flex;
  align-items: center;
`;

const HistoryBox = styled.div`
  background: ${({ theme }) => theme.colors.primaryDark};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
`;

export default function GameBoard() {
  // 레벨1 기준 4×4 덱을 한 번 생성해 숫자만 보여줌 (뒤집기/매치 로직은 다음 단계)
  const [deck, setDeck] = useState(() => buildDeck(1));

  return (
    <BoardShell>
      {/* 좌측: 보드 */}
      <LeftArea>
        <BoardHeader>
          <Title>게임 보드</Title>
          <ResetButton type="button" aria-label="게임 리셋" onClick={() => setDeck(buildDeck(1))}>게임 리셋</ResetButton>
        </BoardHeader>

        <BoardGrid>
          {deck.map((card) => (
            <CardCell key={card.id} title={card.id}>
              {card.value}
            </CardCell>
          ))}
        </BoardGrid>
      </LeftArea>

      {/* 우측: 정보 패널 */}
      <RightArea>
        <LevelSelect aria-label="레벨 선택" defaultValue="1" disabled>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
        </LevelSelect>

        <StatRow>
          <StatBox><small>남은 시간</small><strong>45.00</strong></StatBox>
          <StatBox><small>성공한 쌍</small><strong>0/8</strong></StatBox>
          <StatBox><small>남은 쌍</small><strong>8</strong></StatBox>
        </StatRow>

        <SectionLabel>안내 메시지</SectionLabel>
        <MessageBox>카드를 눌러 게임을 시작</MessageBox>

        <SectionLabel>최근 히스토리</SectionLabel>
        <HistoryBox>아직 뒤집은 카드가 없어요</HistoryBox>
      </RightArea>
    </BoardShell>
  );
}
