
export const createPromise: (
  type: "res" | "rej",
  data: any,
  waitMillSecond?: number
) => Promise<any> = (type, data, waitMillSecond = 0) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      (type === "res" ? resolve : reject)(data);
    }, waitMillSecond);
  });
};