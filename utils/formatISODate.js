export default function (isoDate) {
  const date = isoDate.split('T')[0];
  const dateParts = date.split('-');

  const day = dateParts[2];
  const month = dateParts[1];
  const year = dateParts[0];

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const monthStr = months[month - 1];

  return `${day} ${monthStr} ${year}`;
}
