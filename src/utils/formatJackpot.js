export default function (jackpot) {
  if (jackpot === null) {
    return null;
  }
  if (typeof jackpot === 'string') {
    return jackpot;
  }

  const jackpotStr = jackpot.toString();
  const length = jackpotStr.length;

  const numOfChunks = Math.floor(length / 3);
  const remainder = length % 3;

  let arr = [];
  var i;
  for (i = 1; i <= numOfChunks; i++) {
    var x = jackpotStr.substr(i * -3, 3);
    arr.unshift(x);
  }

  if (remainder !== 0) {
    const y = jackpotStr.substr(0, remainder);
    arr.unshift(y);
  }

  return `£${arr}`;
}
