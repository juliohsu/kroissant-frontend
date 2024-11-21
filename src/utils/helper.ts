export const dataURLtoBlob = (dataURL: string) => {
  const byteString = atob(dataURL.split(",")[1]); // Decode base64 string
  const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0]; // Get MIME type
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  // Populate the array buffer with decoded data
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // Create a Blob from the buffer
  return new Blob([ab], { type: mimeString });
};
