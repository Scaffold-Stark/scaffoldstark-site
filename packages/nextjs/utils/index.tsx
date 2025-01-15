import toast from "react-hot-toast";

export const copyToClipBoard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied successfull!");
  } catch (err) {
    console.error("Failed to copy text:", err);
  }
};
