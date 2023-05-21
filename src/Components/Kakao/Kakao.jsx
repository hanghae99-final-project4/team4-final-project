import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useRecoilState } from 'recoil';
import { useStationState } from '../../Recoil/userList';

const { kakao } = window;

function Kakao() {
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [station, setStation] = useRecoilState(useStationState);

  //------------------자기 위치 찾기 ----------------
  const getCurrentLocation = async () => {
    return new Promise((res, rej) => {
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
          localStorage.setItem('lat', lat); //위도
          localStorage.setItem('lon', lon); //경도
          const locPosition = new kakao.maps.LatLng(lat, lon);
          res(locPosition);
        });
        // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
      } else {
        // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

        rej(new Error('현재 위치를 불러 올 수 없습니다.'));
      }
    });
  };

  useEffect(() => {
    if (!map) return;
    //장소 검색 객체를 통해 키워드로 장소 검색을 요청
    const searchPlaces = async () => {
      const currentLocation = await getCurrentLocation();
      const options = {
        location: currentLocation,
        radius: 10000,
        size: 6,
        sort: kakao.maps.services.SortBy.DISTANCE,
      };
      const keyword = '지하철';
      ps.keywordSearch(keyword, placesSearchCB, options);
    };
    const ps = new kakao.maps.services.Places();

    const placesSearchCB = (data, status, _pagination) => {
      setStation(data[0]);
      localStorage.setItem(
        data[0]?.place_name?.split('역')[0],
        data[0]?.place_name?.split('역')[1]
      );
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    };
    searchPlaces();
  }, [map]);
  console.log(station);
  return (
    <Map // 로드뷰를 표시할 Container
      center={{
        lat: 37.566826,
        lng: 126.9786567,
      }}
      style={{
        width: '100%',
        height: '350px',
      }}
      level={3}
      onCreate={setMap}
    >
      {markers.map((marker) => (
        <MapMarker
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          onClick={() => setInfo(marker)}
        >
          {info && info.content === marker.content && (
            <div style={{ color: '#000' }}>{marker.content}</div>
          )}
        </MapMarker>
      ))}
    </Map>
  );
}

export default Kakao;
