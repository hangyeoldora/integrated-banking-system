package com.lhsk.iam.domain.report.model.vo;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class LoanAcctReportVO {
	private String bankNm;			// 은행명
	private String acctNo;			// 계좌번호
	private String acctNickNm;		// 계좌별칭
	private String loanNm;			// 대출과목
	private BigDecimal agmtAmt;		// 대출한도
	private BigDecimal bal;			// 잔액
	private LocalDate newDt;		// 신규일자
	private LocalDate expiDt;		// 만기일자
	private String loanKind;		// 구분
}
