import { useCallback, useEffect, useState } from "react";
import ProfileUploaderDialog from "@/components/shared/ProfileUploaderDialog.tsx";
import ProfileCropperDialog from "@/components/shared/ProfileCropperDialog.tsx";
import classNames from "classnames";

type ProfileUploaderProps = {
  fieldChange: (Files: File[]) => void;
  mediaUrl: string;
  disabled: boolean;
};

function ProfileUploader({
  fieldChange,
  mediaUrl,
  disabled,
}: ProfileUploaderProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const [fileUrl, setFileUrl] = useState(mediaUrl);
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  const onCropComplete = useCallback(
    (
      _cropArea: {
        width: number;
        height: number;
        x: number;
        y: number;
      },
      cropAreaPixels: { width: number; height: number; x: number; y: number },
    ) => {
      setCroppedAreaPixels(cropAreaPixels);
    },
    [],
  );

  useEffect(() => {
    setFileUrl(mediaUrl);
  }, [mediaUrl]);

  return (
    <div className={classNames({ "pointer-events-none": disabled })}>
      <ProfileUploaderDialog
        {...{
          fileUrl,
          setIsCropperOpen,
          setFileUrl,
        }}
      />

      <ProfileCropperDialog
        {...{
          fieldChange,
          fileUrl,
          setFileUrl,
          crop,
          setCrop,
          zoom,
          setZoom,
          croppedAreaPixels,
          setCroppedAreaPixels,
          isCropperOpen,
          setIsCropperOpen,
          onCropComplete,
        }}
      />
    </div>
  );
}

export default ProfileUploader;
