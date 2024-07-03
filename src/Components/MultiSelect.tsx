import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

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
  cursor: pointer;
`;

const CustomSelectList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 9;
  max-height: 200px;
  overflow-y: auto;
  border: 0.063rem solid #ccc;
  border-top: none;
  border-radius: 0 0 0.313rem 0.313rem;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #fff;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);

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

const SelectedOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.25rem;
`;

const SelectedOption = styled.div`
  display: flex;
  align-items: center;
  background-color: #7d92e9;
  color: white;
  border-radius: 0.25rem;
  padding: 0.125rem 0.125rem 0.125rem 8px;
  margin-right: 0.25rem;
  font-size: 0.875rem;
  cursor: pointer;
`;

const OptionRemoveButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  font-size: 1rem;
  margin-left: 0.25rem;
  cursor: pointer;
`;

function MultiSelect({
  options,
  defaultMessage = "Default Message",
  onSelectionChange,
  initialSelectedOptions = [] as string[],
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [currentOption, setCurrentOption] = useState<string>("");

  useEffect(() => {
    // 초기값이 변경될 때만 호출되도록 추가
    if (initialSelectedOptions.length > 0) {
      setSelectedOptions(initialSelectedOptions);
    }
  }, [initialSelectedOptions]);

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedOptions);
    }
  }, [selectedOptions, onSelectionChange]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
    setCurrentOption("");
    setIsOpen(false);

    onSelectionChange([...selectedOptions, option]);
  };

  const handleRemoveOption = (optionToRemove) => {
    setSelectedOptions(
      selectedOptions.filter((option) => option !== optionToRemove)
    );
    setIsOpen(false);
  };

  const removeAllBtn = () => {
    setSelectedOptions([]);
    setIsOpen(false);
  };

  return (
    <CustomSelectWrapper>
      <CustomSelectHeader onClick={toggleDropdown}>
        {selectedOptions.length > 0 ? (
          <SelectedOptions>
            {selectedOptions.map((option) => (
              <SelectedOption key={option}>
                {option}
                <OptionRemoveButton onClick={() => handleRemoveOption(option)}>
                  <FontAwesomeIcon icon={faTimes} />
                </OptionRemoveButton>
              </SelectedOption>
            ))}
            <FontAwesomeIcon icon={faTimes} onClick={removeAllBtn} />
          </SelectedOptions>
        ) : (
          defaultMessage
        )}
      </CustomSelectHeader>
      {isOpen && (
        <CustomSelectList>
          {options.map((option) => (
            <CustomSelectItem
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </CustomSelectItem>
          ))}
        </CustomSelectList>
      )}
    </CustomSelectWrapper>
  );
}

export default MultiSelect;
