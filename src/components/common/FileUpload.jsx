import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloudIcon, XIcon } from "lucide-react";
import { cn } from "../../utils/test";

export function FileUpload({ onChange, value }) {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        onChange(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 1,
  });

  const removeFile = () => {
    onChange(null);
    setPreview(null);
  };

  return (
    <div className="w-full">
      {!preview ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 transition-colors cursor-pointer",
            "hover:border-primary/50 hover:bg-muted/25",
            isDragActive && "border-primary/50 bg-muted/25",
            "flex flex-col items-center justify-center gap-2"
          )}>
          <input {...getInputProps()} />
          <UploadCloudIcon className="h-12 w-12 text-muted-foreground" />
          <p className="text-sm text-muted-foreground text-center">
            {isDragActive ? (
              "Drop the image here"
            ) : (
              <>
                Drag & drop an image here, or click to select
                <br />
                <span className="text-xs">
                  Supports: PNG, JPG, JPEG, GIF (max 10MB)
                </span>
              </>
            )}
          </p>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-contain"
          />
          <button
            onClick={removeFile}
            className="absolute top-2 right-2 p-1 rounded-full bg-foreground/10 hover:bg-foreground/20 backdrop-blur-sm transition-colors"
            type="button">
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
