import Image from "next/image";
import { Camera } from "lucide-react";
import { useUPloadImage } from "@/app/lib/hooks";

function UpdateProfilePicture() {
  const { handlePhotoChange, previewImage } = useUPloadImage();
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary_color">
          <Image
            src={previewImage || "/api/placeholder/150/150"}
            alt="Profile"
            width={128}
            height={128}
            className="object-cover"
          />
        </div>
        <label className="absolute bottom-0 right-0 p-2 bg-primary_color rounded-full text-white cursor-pointer hover:bg-primary_color/90">
          <Camera className="w-5 h-5" />
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </label>
      </div>
      <p className="text-sm text-gray-500">
        Click the camera icon to update your profile photo
      </p>
    </div>
  );
}

export default UpdateProfilePicture;
