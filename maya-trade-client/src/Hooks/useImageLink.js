import toast from "react-hot-toast";

export const useImageLink = (img) => {
  if (img?.length) {
    const image = img[0];
    const formData = new FormData();
    formData.append("image", image);

    fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgHostKey}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData?.success) {
          return imgData.data.url;
        }
      })
      .catch((error) => {
        toast.error(error.message);
        return null;
      });
  }
  return;
};
