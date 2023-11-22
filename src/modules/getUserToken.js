// // 로그인으로 accessToken을 받아 스토리지 및 전역 상태 저장하는 모듈
// import axios from "axios";

// export const getUserToken = async () => {
//   try {
//     const { data } = await axios.post(
//       `${process.env.REACT_APP_BASE_URL}/api/v1/users/login`,
//       {
//         username: process.env.REACT_APP_USER_ID,
//         password: process.env.REACT_APP_USER_PW,
//       }
//     );

//     const token = await data.data.accessToken;
//     console.log(data);
//     console.log("token: " + token);

//     const userData = localStorage.getItem("user");
//     console.log(userData);

//     if (token) {
//       sessionStorage.setItem("username", process.env.REACT_APP_USER_ID);
//       sessionStorage.setItem("token", token);
//       console.log("세션스토리지에 토큰을 저장했습니다.");
//     } else {
//       console.log("잘못된 데이터: 세션스토리지에 토큰 저장에 실패했습니다.");
//     }
//   } catch (e) {
//     console.error("통신 실패: 토큰 받아오기에 실패했습니다.");
//     console.error(e);
//   }
// };
