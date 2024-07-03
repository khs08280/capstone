import React, { useState } from "react";
import styled from "styled-components";

interface CustomSelectListProps {
  isOpen: boolean;
}

const CustomSelectWrapper = styled.div`
  position: relative;
  width: 80%;
`;

const CustomSelectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 0.313rem;
  opacity: 0.8;
  font-weight: 600;
  padding: 0.625rem 0.938rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0.125rem solid #7d92e9;
  cursor: inherit;
  span {
    color: #7d92e9;
  }
`;

const CustomSelectList = styled.ul<CustomSelectListProps>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 9.375rem;
  overflow-y: auto;
  z-index: 9;
  border: 0.063rem solid #ccc;
  border-top: none;
  border-radius: 0 0 0.313rem 0.313rem;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #fff;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.isOpen ? "block" : "none")};
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #7d92e9;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track:hover {
    background-color: #f0f0f0;
  }
`;

const CustomSelectItem = styled.li`
  padding: 0.625rem;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

function CustomSelect({ options, selectedOption, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <CustomSelectWrapper>
      <CustomSelectHeader onClick={toggleDropdown}>
        {selectedOption || "미정"}
        <span>▼</span>
      </CustomSelectHeader>
      <CustomSelectList isOpen={isOpen}>
        {options.map((option, index) => (
          <CustomSelectItem
            key={index}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </CustomSelectItem>
        ))}
      </CustomSelectList>
    </CustomSelectWrapper>
  );
}

export default CustomSelect;
