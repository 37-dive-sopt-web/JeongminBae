import styled from "@emotion/styled";
import { useState } from "react";
import Card from "./Card";
import GameModal from "./GameModal";
import useModal from "../hooks/useModal";
import useGame from "../hooks/useGame";

/* ====== Styled ====== */
const BoardShell = styled.section`
  width: 1100px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.primarySoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(25, 76, 46, 0.08);
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 340px;
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
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: #fff;
  background: ${({ theme }) => theme.colors.resetButton};
  cursor: pointer;
  line-height: 1;
  &:hover { opacity: .92; }
  &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.primary}; outline-offset: 2px; }
`;

const BoardGrid = styled.div`
  --cell: 112px;
  display: grid;
  gap: 14px;
  justify-content: center;
  padding: 8px 0 4px;
`;

const BoardGridLv1 = styled(BoardGrid)`
  --cell: 112px;
  grid-template-columns: repeat(4, var(--cell));
`;

const BoardGridLv2 = styled(BoardGrid)`
  --cell: 92px;
  grid-template-columns: repeat(6, var(--cell));
`;

const BoardGridLv3 = styled(BoardGrid)`
  --cell: 74px;
  grid-template-columns: repeat(6, var(--cell));
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

const HistoryList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 8px;
  background: ${({ theme }) => theme.colors.primarySoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  height: 220px;
  overflow: auto;
  grid-auto-rows: 34px;
  align-content: start;
`;

const HistoryItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 6px 8px;
  border-radius: 6px;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ success }) => (success ? "#54b691" : "#e65f5fff")};
  line-height: 1.2;
`;

/* ====== Component ====== */
export default function GameBoard() {
  const [level, setLevel] = useState(1);
  const modal = useModal();

  const {
    deck, openIds, matched, message,
    totalPairs, matchedPairs, remainingPairs,
    timeLabel, history: turnHistory,
    inputLocked, reset, flip,
  } = useGame(level, {
    onFinish: ({ type, level, timeSpent }) => {
      // 모달 띄우기 + 3초 후 자동 시작 + 게임 리셋
      if (type === "win") {
        modal.show(
          {
            title: "!!!축하해요!!!",
            description: `Level ${level}을 ${timeSpent?.toFixed?.(2) ?? "-"}초 만에 클리어했어요`,
            subText: "3초 후 자동으로 새 게임이 시작돼요",
          },
          { autoCloseMs: 3000, onAutoClose: reset }
        );
      } else {
        modal.show(
          {
            title: "아쉬워요...",
            description: "제한 시간이 만료되어 실패했어요.",
            subText: "3초 후 자동으로 새 게임이 시작돼요",
          },
          { autoCloseMs: 3000, onAutoClose: reset }
        );
      }
    },
  });

  // 카드 목록 한 번만 생성
  const Cards = deck.map((card) => {
    const isOpen = openIds.includes(card.id) || matched.has(card.id);
    return (
      <Card
        key={card.id}
        open={isOpen}
        matched={matched.has(card.id)}
        value={card.value}
        onClick={() => flip(card.id)}
        disabled={inputLocked || (openIds.length === 2 && !isOpen)}
      />
    );
  });

  return (
    <BoardShell>
      {/* 좌측: 보드 */}
      <LeftArea>
        <BoardHeader>
          <Title>게임 보드</Title>
          <ResetButton type="button" aria-label="게임 리셋" onClick={reset}>
            게임 리셋
          </ResetButton>
        </BoardHeader>

        {level === 1 ? (
          <BoardGridLv1>{Cards}</BoardGridLv1>
        ) : level === 2 ? (
          <BoardGridLv2>{Cards}</BoardGridLv2>
        ) : (
          <BoardGridLv3>{Cards}</BoardGridLv3>
        )}
      </LeftArea>

      {/* 우측 : 패널 */}
      <RightArea>
        <LevelSelect aria-label="레벨 선택" value={String(level)} onChange={(e) => setLevel(Number(e.target.value))}>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
        </LevelSelect>

        <StatRow>
          <StatBox><small>남은 시간</small><strong>{timeLabel}</strong></StatBox>
          <StatBox><small>성공한 쌍</small><strong>{matchedPairs}/{totalPairs}</strong></StatBox>
          <StatBox><small>남은 쌍</small><strong>{remainingPairs}</strong></StatBox>
        </StatRow>

        <SectionLabel>안내 메시지</SectionLabel>
        <MessageBox>{message}</MessageBox>

        <SectionLabel>최근 히스토리</SectionLabel>
        <HistoryList>
          {turnHistory.length === 0 ? (
            <li style={{ color: "#6b7280", textAlign: "center" }}>아직 뒤집은 카드가 없어요</li>
          ) : (
            turnHistory.map((h) => (
              <HistoryItem key={h.ts} success={h.success}>
                <span>{h.a}, {h.b}</span>
                <strong>{h.success ? "성공" : "실패"}</strong>
              </HistoryItem>
            ))
          )}
        </HistoryList>
      </RightArea>

      {/* 모달 */}
      <GameModal
        open={modal.open}
        title={modal.data?.title}
        description={modal.data?.description}
        subText={
          modal.countdown != null
            ? `${modal.countdown}초 후 자동으로 새 게임이 시작돼요`
            : modal.data?.subText
        }
      />
    </BoardShell>
  );
}
