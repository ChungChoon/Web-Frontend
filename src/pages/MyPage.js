import React from 'react';
import { cav } from 'klaytn/caver';
import MypageAside from 'components/mypage/MypageAside';
import MypageMain from 'components/mypage/MypageMain';


// const clickButton= () => {
//   const result = cav.klay.accounts.create("hihi")
//   cav.klay.personal.importRawKey(result.privateKey.slice(2), "hihi").then(
//     function(resolveData){
//       cav.klay.personal.unlockAccount(resolveData, "hihi", 6000)
//     }
//   );
//   cav.klay.accounts.wallet.add(result)
// }

const MyPage = props => (
  <>
  <MypageMain {...props}/>
  </>
);

export default MyPage;

// 어드민이면 어드민 마이페이지 띄워주기
// 일반사용자는 원래대로
