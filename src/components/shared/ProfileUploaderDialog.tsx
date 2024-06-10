import { useDropzone, FileWithPath } from "react-dropzone";
import { useCallback } from "react";

type ProfileUploadProps = {
  fileUrl: string;
  setIsCropperOpen: (isCropperOpen: boolean) => void;
  setFileUrl: (url: string) => void;
};

function ProfileUploaderDialog(props: ProfileUploadProps) {
  const { fileUrl, setIsCropperOpen, setFileUrl } = props;

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    setIsCropperOpen(true);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".svg"] },
  });

  return (
    <div {...getRootProps()} className="flex items-center gap-6">
      <input {...getInputProps()} />
      <div className={"w-[100px] aspect-square relative"}>
        <img
          src={fileUrl || "/assets/icons/profile-placeholder.svg"}
          onClick={open}
          className={"w-full h-full rounded-full"}
          alt={""}
        />

        <div
          className={
            "w-full h-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex-center cursor-pointer hover:bg-[#000]/70 transform-[background-color] duration-300 group/upload"
          }
          onClick={open}
        >
          <img
            src={"/assets/icons/pencil.svg"}
            alt={""}
            className={
              "invert-white group-hover/upload:opacity-100 opacity-0 transform-[opacity] duration-300"
            }
          />
        </div>
      </div>
      <button
        type={"button"}
        className={"text-primary-500 small-regular md:base-semibold"}
        onClick={open}
      >
        Change Profile Picture
      </button>
    </div>
  );
}

export default ProfileUploaderDialog;
