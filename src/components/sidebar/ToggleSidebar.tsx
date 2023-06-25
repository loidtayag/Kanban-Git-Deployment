import styled from "styled-components";
import React, { ReactNode } from "react";
import { textTheme, theme } from "../../styles/theme.styles";

export default function ToggleSidebar({
  setShowSidebar,
}: {
  setShowSidebar: () => void;
}) {
  return (
    <Flex>
      <Visual onClick={setShowSidebar}>
        <Embed />
      </Visual>
      <Textual>Hide sidebar</Textual>
    </Flex>
  );
}

const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1ch;
`;

const Visual = styled.button.attrs(
  ({ onClick, children }: { onClick: () => void; children: ReactNode }) => ({
    onClick: onClick,
    children: children,
  })
)<{
  onClick: () => void;
  children: ReactNode;
}>`
  width: 2.4rem;
  border-style: none;
  cursor: pointer;
  background-color: inherit;
  margin-right: 2ch;
  padding-left: 0.3rem;
  margin-top: 1ch;
`;

const Embed = styled.img.attrs(() => ({
  alt: "Hide sidebar",
  src: "/hide.SVG",
}))`
  filter: ${theme.iconColor};
`;

const Textual = styled.p`
  color: ${theme.textColor};
  ${textTheme};
`;
