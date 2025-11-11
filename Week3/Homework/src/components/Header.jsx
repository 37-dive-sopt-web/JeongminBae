import styled from "@emotion/styled";

const HeaderBox = styled.header`

width: 1100px;       
  margin: 12px auto 20px;
  padding: 18px 16px;

  background: ${({ theme }) => theme.colors.primarySoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(25, 76, 46, 0.08);

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1` margin:0; font-size:30px; font-weight:700; ${({ theme }) => theme.colors.text}; `;
const Tabs = styled.nav` display:flex; gap:8px; `;
const TabBtn = styled.button`
  border:1px solid ${({ theme }) => theme.colors.primary}; 
  border-radius:999px; padding:6px 12px;
background: ${({ theme, active }) => active ? theme.colors.primary : "transparent"};
color: ${({ theme, active }) => active ? theme.colors.text : theme.colors.mutedText};
font-weight: 600;
cursor: pointer;
line-height: 1;

`;

export default function Header({ currentTab, onChangeTab }) {
  return (
    <HeaderBox>
      <Title>숫자 카드 짝 맞추기</Title>
      <Tabs>
        <TabBtn active={currentTab === "game"} onClick={() => onChangeTab("game")}>게임</TabBtn>
        <TabBtn active={currentTab === "ranking"} onClick={() => onChangeTab("ranking")}>랭킹</TabBtn>
      </Tabs>
    </HeaderBox>
  );
}


