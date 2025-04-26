export const convertRawViewstoString = (
  labelValue: String,
  isSub = false
): string => {
  const views: number = Math.abs(Number(labelValue));

  if (views >= 1.0e9)
    return (views / 1.0e9).toFixed(0) + "B"; // Nine Zeroes for Billions
  else if (views >= 1.0e6)
    return (views / 1.0e6).toFixed(0) + "M"; // Six Zeroes for Millions
  else if (views >= 1.0e3)
    return (
      (views / 1.0e3).toFixed(isSub ? 2 : 0) + "K"
    ); // Three Zeroes for Thousands
  else return views.toString();
};
