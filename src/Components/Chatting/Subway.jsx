import React, { useRef, useState } from "react";
import SubwayIcon from "../../Element/SubwayIcon";
import styled from "styled-components";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import useInput from "../../MyTools/Hooks/UseInput";
import { useNavigate } from "react-router-dom";
import HomeMenu from "../HomeMenu/HomeMenu";
import SubwayHome from "../HomeMenu/SubwayHome";
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
    <>
      <SubwayDiv>
        <div onClick={Locate}>
          <SubwayIcon />
        </div>
        <TransformWrapper
          style={{ width: "375px", height: "812px" }}
          initialScale={2}
          minScale={1}
          maxScale={10}
        >
          <TransformComponent>
            <div onClick={charterOnClick}>
              <img
                src="https://ssl.pstatic.net/sstatic/keypage/outside/subway/img/220718/smap_sg_all.png"
                style={{
                  border: "none",
                  width: "375px",
                  height: "712px",
                }}
                ref={subwayRef}
                onClick={(e) => subwayCoordinate(e)}
              />
            </div>
          </TransformComponent>
        </TransformWrapper>
      </SubwayDiv>
      <SubwayHome />
    </>
  );
};

export default Subway;
const SubwayDiv = styled.div`
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;

  align-items: center;
  width: 375px;
  height: 812px;
`;
const SubwayMapFrame = styled.div`
  overflow: hidden;
  width: 375px;
  height: 812px;
  border: none;
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
  border: none;
  cursor: pointer;
  width: 10px;
  height: 10px;
  top: 354px;
  left: 515px;
  z-index: 999;
`;
const HomeDiv = styled.div`
  position: absolute;
  bottom: 0px;
`;
