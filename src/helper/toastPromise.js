export const toastPromise = (response) => {
  console.log(response);
  const toast = new Promise((resolve, reject) => {
    if (response?.data?.success) {
      setTimeout(resolve(response?.data?.message), 1000);
    } else {
      setTimeout(reject(response?.data?.message), 1000);
    }
  });
  return toast;
};
