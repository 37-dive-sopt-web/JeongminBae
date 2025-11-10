import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { loadRecords, clearRecords as clearAllRecords } from "../utils/ranking";

const Wrapper = styled.section`
  width: 1100px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.primarySoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 8px 20px rgba(25, 76, 46, 0.08);
  display: grid;
  gap: 16px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

const ResetButton = styled.button`
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.resetButton};
  background: ${({ theme }) => theme.colors.resetButton};
  color: #fff;
  font-weight: 700;
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  overflow: hidden;
  text-align: center;

  th, td {
    padding: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  thead {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const Empty = styled.p`
  text-align: center;
  padding: 32px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export default function RankingBoard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords(loadRecords());
  }, []);

  const clearRecords = () => {
    clearAllRecords();
    setRecords([]);
  };

  return (
    <Wrapper>
      <HeaderRow>
        <Title>랭킹 보드</Title>
        <ResetButton type="button" onClick={clearRecords}>기록 초기화</ResetButton>
      </HeaderRow>

      {records.length === 0 ? (
        <Empty>아직 기록이 없어요. 게임을 클리어해 주세요!</Empty>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>순위</th>
              <th>레벨</th>
              <th>클리어 시간(초)</th>
              <th>기록 시각</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item, index) => (
              <tr key={`${item.clearedAt}-${index}`}>
                <td>{index + 1}</td>
                <td>Level {item.level}</td>
                <td>{Number(item.time).toFixed(2)}</td>
                <td>{new Date(item.clearedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Wrapper>
  );
}
