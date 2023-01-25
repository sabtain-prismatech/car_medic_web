export const customError = (id, time, msg) => {
  document.getElementById(id).innerText = msg;
  setTimeout(() => {
    document.getElementById(id).innerText = "";
  }, time);
};
