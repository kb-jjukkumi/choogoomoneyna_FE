import { getMatchingHistory } from '@/api/matchingApi';

//n승 n무 n패 계산
export async function getMatchingRecordStats() {
  const RECORDS = await getMatchingHistory();

  let win = 0,
    draw = 0,
    lose = 0;

  for (const record of RECORDS) {
    if (record.matchingResult === 'WIN') {
      win++;
    } else if (record.matchingResult === 'DRAW') {
      draw++;
    } else if (record.matchingResult === 'LOSE') {
      lose++;
    }
  }

  return { win, draw, lose };
}
