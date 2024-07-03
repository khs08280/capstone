import React, { useState } from "react";
import styled from "styled-components";
import FilterSelect from "./FilterSelect";

const FilterBox = styled.div`
  display: flex;
  padding-left: 3%;
`;

const Filter = () => {
  const [position, setPosition] = useState<string[]>([]);
  const [techStack, setTechStack] = useState<string[]>([]);
  const [tag, setTag] = useState<string[]>([]);

  const positionArray = [
    "FRONTEND",
    "BACKEND",
    "DATABASE",
    "DEVOPS",
    "ANDROID",
    "IOS",
    "DESIGNER",
    "AI",
  ];
  const stackArray = [
    "JAVA",
    "JavaScript",
    "React",
    "VUE",
    "Python",
    "Angular",
    "NodeJS",
    "SpringBoot",
    "Django",
    "RubyOnRails",
    "PHP",
    "Laravel",
    "ASPNET",
    "ExpressJS",
    "MySQL",
    "MongoDB",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
    "Jenkins",
    "Swift",
    "AWS",
    "Kotlin",
    "Git",
    "CSharp",
    "Unity",
    "TensorFlow",
  ];
  const tagArray = ["웹 사이트", "모바일 앱", "웹 앱", "AI", "디자인"];

  const positionChange = (options) => {
    setPosition(options);
  };
  const techStackChange = (options) => {
    setTechStack(options);
  };
  const tagChange = (options) => {
    setTag(options);
  };

  return (
    <FilterBox>
      <FilterSelect
        options={positionArray}
        defaultMessage="분야 선택"
        onSelectionChange={positionChange}
      />
      <FilterSelect
        options={stackArray}
        defaultMessage="사용 스택 선택"
        onSelectionChange={techStackChange}
      />
      <FilterSelect
        options={tagArray}
        defaultMessage="관심 주제 선택"
        onSelectionChange={tagChange}
      />
    </FilterBox>
  );
};

export default Filter;
