import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { all } from "axios";
import "./index.css";
import IamIcon from "../../assets/images/account_bg.png";
import KakaoIcon from "../../assets/images/icon/bank/kakao_icon.png";

const Index = () => {
  const [accountList, setAccountList] = useState({});
  const [statementList, setStatementList] = useState([]);
  const [depAInsList, setDepAInsList] = useState([]);
  const [loanList, setLoanList] = useState([]);
  
  // 페이징 처리 추가하기
  const showList = 10;
  const [page, setPage] = useState(1);
  const offset=(page-1)*showList;

  let stateArr=[];
  let depAInsArr=[];
  let loanArr=[];
  const getData = async () =>{
    const url = "http://localhost:3001/api/getAccountList";
    await axios.get(url).then((res) => {
      setAccountList(res.data.RESP_DATA);
      const allAccount = accountList.REC;
      allAccount.map((ele, i) => {
        if (ele.ACCT_DV === "01") {
          stateArr.push(ele);
          setStatementList(stateArr);
        } else if (ele.ACCT_DV === "02") {
          depAInsArr.push(ele);
          setDepAInsList(depAInsArr);
        } else if (ele.ACCT_DV === "03") {
          loanArr.push(ele);
          setLoanList(loanArr);
        };
      });
    }).catch((err)=>console.log(err));
  }

  // useQuery를 통한 로딩 처리 추가하기
  useEffect(() => {
    getData();
  }, [accountList]);

  // 금액 단위 , 정규화 필요
  return (
    <div className="contents flex justify_center align_center">
      <div className="contents_inner">
        <h1 className="contents_title">계좌조회</h1>
        <div className="content flex justify_between">
          <div className="content_left flex justify_center align_center">
            <h3>수시입출금</h3>
            <figure>
              <img className="account_img" src={IamIcon} alt="lam icon"/>
            </figure>
          </div>
          <div className="content_right">
            <ul className="account_list flex flex_column justify_between">
              <li className="flex justify_between">
                <div className="idx">번호</div>
                <div className="acct_no">계좌번호</div>
                <div className="loan_nm">상품명</div>
                <div className="bal">잔액</div>
              </li>
              {statementList.map((ele, i) => {
                return (
                  <li key={i} className="account_li flex justify_between align_center">
                    <div className="idx">{i<10 ? <p>0{i}</p> : <p>{i}</p>}</div>
                    <div className="acct_no flex align_center justify_center"><figure><img src={KakaoIcon} alt=""/></figure><span>&nbsp;&nbsp;{ele?.ACCT_NO}</span></div>
                    <div className="loan_nm"><p>{ele?.LOAN_NM.trim()}</p></div>
                    <div className="bal"><p>{ele?.BAL.split(".",1)}원</p></div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="content flex justify_between">
          <div className="content_left flex justify_center align_center">
            <h3>예적금</h3>
            <figure>
              <img className="account_img" src={IamIcon} alt="lam icon"/>
            </figure>
          </div>
          <div className="content_right">
            <ul className="account_list flex flex_column justify_between">
              <li className="flex justify_between">
                <div className="idx">번호</div>
                <div className="acct_no">계좌번호</div>
                <div className="loan_nm">상품명</div>
                <div className="bal">잔액</div>
              </li>
              {depAInsList.map((ele, i) => {
                return (
                  <li key={i} className="account_li flex justify_between align_center">
                    <div className="idx">{i<10 ? <p>0{i}</p> : <p>{i}</p>}</div>
                    <div className="acct_no flex align_center justify_center"><figure><img src={KakaoIcon} alt=""/></figure><span>&nbsp;&nbsp;{ele?.ACCT_NO}</span></div>
                    <div className="loan_nm"><p>{ele?.LOAN_NM.trim()}</p></div>
                    <div className="bal"><p>{ele?.BAL.split(".",1)}원</p></div>
                    {/* <div className="bal"><ConfigNum number={ele?.BAL.split(".",1)} /></div> */}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="content flex justify_between">
          <div className="content_left flex justify_center align_center">
            <h3>대출</h3>
            <figure>
              <img className="account_img" src={IamIcon} alt="lam icon"/>
            </figure>
          </div>
          <div className="content_right">
            <ul className="account_list flex flex_column justify_between">
              <li className="flex justify_between">
                <div className="idx">번호</div>
                <div className="acct_no">계좌번호</div>
                <div className="loan_nm">상품명</div>
                <div className="bal">잔액</div>
              </li>
              {loanList.map((ele, i) => {
                return (
                  <li key={i} className="account_li flex justify_between align_center">
                    <div className="idx">{i<10 ? <p>0{i}</p> : <p>{i}</p>}</div>
                    <div className="acct_no flex align_center justify_center"><figure><img src={KakaoIcon} alt=""/></figure><span>&nbsp;&nbsp;{ele?.ACCT_NO}</span></div>
                    <div className="loan_nm"><p>{ele?.LOAN_NM.trim()}</p></div>
                    <div className="bal"><p>{ele?.BAL.split(".",1)}원</p></div>
                    {/* <div className="bal"><ConfigNum number={ele?.BAL.split(".",1)} /></div> */}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// const ConfigNum = (number) =>{
//   return(
//     <p>

//     </p>
//   )
// }

export default Index;
