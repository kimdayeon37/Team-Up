const lnbIdList = {
  팀플: 1,
  스터디: 2,
  "대회|공모전": 3,
  소프트웨어: 4,
  경영: 5,
  "전자|정보": 6,
  자연과학: 7,
  "IT|개발": 8,
  실험: 9,
  인문학: 10,
  예체능: 11,
  빅데이터: 12,
  개발: 13,
  광고: 14,
  마케팅: 15,
};

function getLnbName(id) {
  return Object.keys(lnbIdList).find((key) => lnbIdList[key] === id);
}

export { lnbIdList, getLnbName };
