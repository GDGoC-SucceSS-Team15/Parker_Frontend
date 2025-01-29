import Menu from "./Menu";
import Search_Button from "./../assets/Search_Button.png"
import Menu_Button from "./../assets/Menu_Button.png"
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const TopBar = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef(null); 
  const topBarRef = useRef(null); 

  // 검색어를 부모 컴포넌트로 전달
  const handleSearch = () => {
    if (input.trim() === "") {
      return;
    }
    onSearch(input);
  };

  const toggleMenu = () => {
    setIsMenuVisible((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsMenuVisible(false);
  };

  // 클릭한 곳이 메뉴 외부인 경우 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      // 메뉴 외부를 클릭한 경우
      if (
        menuRef.current && !menuRef.current.contains(event.target) && 
        topBarRef.current && !topBarRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {isMenuVisible && <div onClick={closeMenu}></div>}
      <TopBarDiv ref={topBarRef}>
        <MenuButton onClick={toggleMenu}>
          <img src={Menu_Button} alt="Menu_Button" />
        </MenuButton>
        <SearchInput 
          type="text"
          placeholder="검색어를 입력하세요."
          value={input}
          onChange={(e) => setInput(e.target.value)} 
        />
        <SearchButton onClick={handleSearch} >
          <img src={Search_Button} alt="Search_Button" />
        </SearchButton>
      </TopBarDiv>
      {isMenuVisible && (
        <div ref={menuRef}>
          <Menu />
        </div>
      )}
    </>
  );
};

export default TopBar;

const TopBarDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 7px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1200px;
  height: 50px;
  z-index: 10;
`;

const MenuButton = styled.button`
  background-color: #ffffff;
  border: none;
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 30px;
  padding-left: 10px;
  color: #000000;
  transition: transform 0.2s ease-in-out;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  color: #333333;
  background-color: #ffffff;
`;

const SearchButton = styled.button`
  background-color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;