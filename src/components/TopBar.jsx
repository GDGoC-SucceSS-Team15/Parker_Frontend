import Menu from "./Menu";
import { IoSearchSharp } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import Warning from "./../assets/WarningIcon.svg";
import Crackdown from "./../assets/cctv.svg";
import Parking from "./../assets/parking.svg";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import CustomModal from "./Modals/CustomModal";
import UploadModal from "./Ai/UploadModal";
import ResultModal from "./Ai/Result/ResultModal";

const TopBar = ({ onSearch, onToggle }) => {
  const [input, setInput] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef(null);
  const topBarRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);

  const [modal, setModal] = useState(false);
  const [result, setResult] = useState(null);

  // 검색어를 부모 컴포넌트로 전달
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    if (!input.trim()) {
      alert("검색어를 입력하세요.");
      return;
    }
    onSearch(input);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  // 필터링
  const handleClick = (filterType) => {
    onToggle(filterType);
  };

  // 클릭한 곳이 메뉴 외부인 경우 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        topBarRef.current &&
        !topBarRef.current.contains(event.target)
      ) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <TopBarDiv ref={topBarRef}>
        <MenuButton onClick={toggleMenu}>
          <FiMenu color="#636363" size={20} />
        </MenuButton>
        <SearchInput
          type="text"
          placeholder="검색어를 입력하세요."
          value={input}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <SearchButton onClick={handleSearch}>
          <IoSearchSharp color="#636363" size={20} />
        </SearchButton>
      </TopBarDiv>

      {isMenuVisible && (
        <MenuWrapper ref={menuRef}>
          <Menu />
        </MenuWrapper>
      )}

      <ButtonWrapper>
        <FilterButton onClick={() => handleClick("parking")}>
          <img src={Parking} alt="parking" />
          {/* <LuSquareParking color="#015900" size={22} /> */}
          주차공간
        </FilterButton>
        <FilterButton onClick={() => handleClick("crackdown")}>
          <img src={Crackdown} alt="crackdown" />
          단속구역
        </FilterButton>
        <FilterButton onClick={() => setOpenModal(true)}>
          <img src={Warning} alt="probability" />
          단속 여부
        </FilterButton>
      </ButtonWrapper>

      <CustomModal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
      >
        <UploadModal setModal={setModal} setResult={setResult} />
      </CustomModal>
      <ResultModal
        isOpen={modal}
        onRequestClose={() => {
          setModal(false);
          setOpenModal(false);
        }}
        type={result?.class_id}
      />
    </>
  );
};

export default TopBar;

// 스타일 컴포넌트 추가
const MenuWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20;
  background-color: white;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

const TopBarDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 7px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1200px;
  height: 37px;
  z-index: 10;
`;

const MenuButton = styled.button`
  background-color: #ffffff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 30px;
  padding-left: 10px;
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
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const ButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  padding: 5px 7px;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 37px;
  top: 70px;
  z-index: 5;
`;

const FilterButton = styled.button`
  display: flex;
  background-color: #ffffff;
  border: none;
  justify-content: center;
  padding: 10px 0;
  border-radius: 20px;
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
  width: 30%;
  color: #333;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease, color 0.3s ease;
  align-items: center;
  gap: 10px;

  img {
    //width: 20px;
    height: 18px;
    vertical-align: middle;
    object-fit: contain;
    margin-top: -2px;
  }

  &:hover {
    background-color: #f0f0f0;
    color: #000;
  }
`;
