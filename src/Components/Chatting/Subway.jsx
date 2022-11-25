import React, { useRef, useState } from "react";
import SubwayIcon from "../../Element/SubwayIcon";
import styled from "styled-components";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import useInput from "../../MyTools/Hooks/UseInput";
import { useNavigate } from "react-router-dom";
import HomeMenu from "../HomeMenu/HomeMenu";
const Subway = () => {
  const navigate = useNavigate();
  const initialState = {
    station: "",
  };
  const [subway, setSubway, onChangeHandler, reset] = useInput(initialState);
  const subwayRef = useRef();
  const stationRef = useRef();
  const [ratio, setRatio] = useState(1);
  const [onClickCoordinate, setOnClickCoordinate] = useState({
    coordinateX: "",
    coordinateY: "",
  });
  const [coordinatesList, setCoordinatesList] = useState([]);
  const subwayCoordinate = (e) => {
    console.log(e.target);
  };
  const charterOnClick = (e) => {
    console.log(e);
    console.log(e.nativeEvent.offsetX);
    console.log(e.nativeEvent.offsetY);
  };
  const Locate = () => {
    console.log("눌림");
    navigate("/converspage");
  };
  console.log(subway);
  return (
    <SubwayDiv>
      <div onClick={Locate}>
        <SubwayIcon />
      </div>
      <TransformWrapper initialScale={1} minScale={1} maxScale={10}>
        <TransformComponent>
          <div onClick={charterOnClick}>
            <img
              src="https://gingernews.co.kr/wp-content/uploads/2022/05/img_subway.png"
              style={{ border: "1px solid black" }}
              ref={subwayRef}
              onClick={(e) => subwayCoordinate(e)}
            />
          </div>
        </TransformComponent>
      </TransformWrapper>

      <SeoulStationDiv
        onClick={() => setSubway({ station: "서울" })}
      ></SeoulStationDiv>
      <SeoulCityHall
        onClick={() => setSubway({ station: "시청" })}
      ></SeoulCityHall>
      <HomeMenu />
    </SubwayDiv>
  );
};

export default Subway;
const SubwayDiv = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  width: 100%;

  height: 100vh;
`;
const SubwayMapFrame = styled.div`
  overflow: hidden;
  width: 1000px;
  height: 1000px;
  border: 1px solid black;
  overflow-y: scroll;
  background-image: url("https://gingernews.co.kr/wp-content/uploads/2022/05/img_subway.png");
  margin: auto;
  background-size: cover;
`;

const SubwayContainer = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: ${(props) => 200 / props.ratio}%;
  height: ${(props) => 200 / props.ratio}%;
  transform: scale(${(props) => props.ratio});
  transform-origin: left top;
`;
const SeoulStationDiv = styled.div`
  position: absolute;
  border: 1px solid black;
  cursor: pointer;
  width: 10px;
  height: 10px;
  top: 401px;
  left: 515px;
  z-index: 999;
`;
const SeoulCityHall = styled.div`
  position: absolute;
  border: 1px solid black;
  cursor: pointer;
  width: 10px;
  height: 10px;
  top: 354px;
  left: 515px;
  z-index: 999;
`;
