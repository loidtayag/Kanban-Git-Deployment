import styled from "styled-components";
import React, { ReactNode, useRef, useState } from "react";
import Logo from "./components/sidebar/Logo";
import BoardTitles from "./components/sidebar/BoardTitles";
import DayOrNight from "./components/sidebar/DayOrNight";
import ToggleSidebar from "./components/sidebar/ToggleSidebar";
import GlobalStyles from "./styles/Global.styles";
import HiddenSidebar from "./components/sidebar/HiddenSidebar";
import BoardName from "./components/header/BoardName";
import TaskAdd from "./components/header/task_add/TaskAdd";
import Settings from "./components/header/Settings";
import {
  getBoards, getNightMode,
  getSelectedBoard, getSidebar
} from "./utils/helpers";
import ViewBoard from "./components/main/ViewBoard";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import { theme } from "./styles/theme.styles";
import { iBoard } from "./utils/interfaces";
import { ThemeContext, OnlineContext } from "./utils/context";
import Picture from "./components/header/Picture";

function App() {
  const [online, setOnline] = useState(false);
  const offlineData = useRef<iBoard[]>(getBoards());
  //Makes sure at least one board is initialised and a board is selected just to make NPE easier to deal with
  getBoards();
  const [showSidebar, setShowSidebar] = useState(getSidebar());
  const [selectedBoard, setSelectedBoard] = useState(getSelectedBoard());
  const [darkMode, setDarkMode] = useState(getNightMode());
  const [boardNames, setBoardNames] = useState<string[]>(
    getBoards().map((board: iBoard) => board.name)
  );

  if (!online) {
    offlineData.current = getBoards();
  }

  const toggleTheme = () => {
    if (darkMode) {
      localStorage.setItem("nightMode", "false");
      setDarkMode(false);
    } else {
      localStorage.setItem("nightMode", "true");
      setDarkMode(true);
    }
  };

  return (
    <OnlineContext.Provider value={online}>
      <ThemeContext.Provider value={darkMode ? theme.dark : theme.light}>
        {online && <Picture />}
        <div style={{ maxWidth: "100vw", maxHeight: "100vh" }}>
          <GlobalStyles />
          <Grid id={showSidebar ? "showSidebar" : "hideSidebar"}>
            {showSidebar && (
              <Sidebar>
                <Logo />
                <BoardTitles boardNames={boardNames} setBoardNames={setBoardNames}
                             setSelectedBoard={setSelectedBoard} />
                <div>
                  <DayOrNight toggleTheme={toggleTheme} />
                  <ToggleSidebar
                    setShowSidebar={() => {
                      localStorage.setItem("sidebar", !showSidebar as unknown as string);
                      setShowSidebar(!showSidebar);
                    }}
                  />
                </div>
              </Sidebar>
            )}
            {!showSidebar && (
              <HiddenSidebar
                onClick={() => {
                  localStorage.setItem("sidebar", !showSidebar as unknown as string);
                  setShowSidebar(!showSidebar);
                }}
              />
            )}
            <Header>
              <BoardName boardNames={boardNames} setBoardNames={setBoardNames} selectedBoard={selectedBoard}
                         setSelectedBoard={setSelectedBoard}>{selectedBoard.name}</BoardName>
              <TaskAdd setSelectedBoard={setSelectedBoard} />
              <Settings online={online} setOnline={setOnline} offlineData={offlineData}
                        setSelectedBoard={setSelectedBoard} setBoardNames={setBoardNames} />
            </Header>
            <ViewBoard
              selectedBoard={selectedBoard}
              setSelectedBoard={setSelectedBoard}
            />
          </Grid>
        </div>
      </ThemeContext.Provider>
    </OnlineContext.Provider>
  )
    ;
}

const Grid = styled.div.attrs(
  ({ id, children }: { id: string; children: ReactNode }) => ({
    id: id,
    children: children
  })
)`
  
  /* White space is left at the bottom of the Grid */
  min-height: 100vh;
  max-height: 100vh;
`;

export default App;
