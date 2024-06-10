import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button.tsx";
import getCroppedImg from "@/lib/cropUtils.ts";

type ProfileCropperProps = {
  crop: { x: number; y: number };
  setCrop: (crop: { x: number; y: number }) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  onCropComplete: (
    cropArea: {
      width: number;
      height: number;
      x: number;
      y: number;
    },
    cropAreaPixels: { width: number; height: number; x: number; y: number },
  ) => void;
  croppedAreaPixels: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
  fileUrl: string;
  isCropperOpen: boolean;
  setIsCropperOpen: (isCropperOpen: boolean) => void;
  setFileUrl: (fileUrl: string) => void;
  fieldChange: (file: File[]) => void;
};

function ProfileCropperDialog(props: ProfileCropperProps) {
  const {
    fieldChange,
    crop,
    setCrop,
    zoom,
    setZoom,
    onCropComplete,
    croppedAreaPixels,
    fileUrl,
    setFileUrl,
    isCropperOpen,
    setIsCropperOpen,
  } = props;

  async function cropImage() {
    try {
      const { file, url, error } = await getCroppedImg(
        fileUrl,
        croppedAreaPixels,
      );

      if (!url || !file || error) {
        throw Error;
      }

      setFileUrl(url);
      fieldChange([file]);
      setIsCropperOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open={isCropperOpen} onOpenChange={setIsCropperOpen}>
      <DialogContent className={"bg-dark"}>
        <DialogHeader>
          <DialogTitle>Upload Picture</DialogTitle>
        </DialogHeader>

        {/*  Cropper here */}
        <Cropper
          aspect={1}
          cropShape={"round"}
          image={fileUrl}
          crop={crop}
          onCropChange={setCrop}
          zoom={zoom}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          classes={{
            containerClassName:
              "!relative max-w-sm mx-auto w-full aspect-square",
          }}
        />

        <DialogFooter>
          <Button className={"shad-button_primary"} onClick={cropImage}>
            Update Profile
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileCropperDialog;
