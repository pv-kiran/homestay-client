import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloudIcon, XIcon } from "lucide-react";
import { cn } from "../utils/test";



export function MultipleFileUpload({
  onChange,
  value,
  multiple = false,
  maxFiles = 5
}) {
  const [previews, setPreviews] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (multiple) {
        const totalFiles = value.length + acceptedFiles.length;
        const filesToAdd = acceptedFiles.slice(0, maxFiles - value.length);

        if (totalFiles > maxFiles) {
          // TODO : Max file handling
          console.warn(`Only ${maxFiles} files are allowed. Additional files were ignored.`);
        }

        onChange([...value, ...filesToAdd]);
        const newPreviews = filesToAdd.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);
      } else {
        const file = acceptedFiles[0];
        if (file) {
          onChange([file]);
          const preview = URL.createObjectURL(file);
          setPreviews([preview]);
        }
      }
    },
    [onChange, multiple, maxFiles, value]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: multiple ? maxFiles : 1,
    disabled: multiple && value.length >= maxFiles,
  });

  const removeFile = (index) => {
    const newFiles = value.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    onChange(newFiles);
    setPreviews(newPreviews);
  };

  return (
    <div className="w-full">
      {previews.length === 0 ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 transition-colors",
            "hover:border-primary/50 hover:bg-muted/25",
            isDragActive && "border-primary/50 bg-muted/25",
            (multiple && value.length >= maxFiles) ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
            "flex flex-col items-center justify-center gap-2"
          )}>
          <input {...getInputProps()} />
          <UploadCloudIcon className="h-12 w-12 text-muted-foreground" />
          <p className="text-sm text-muted-foreground text-center">
            {isDragActive ? (
              "Drop the image here"
            ) : multiple && value.length >= maxFiles ? (
              `Maximum ${maxFiles} files allowed`
            ) : (
              <>
                Drag & drop {multiple ? "images" : "an image"} here, or click to select
                <br />
                <span className="text-xs">
                  Supports: PNG, JPG, JPEG, GIF (max 10MB)
                  {multiple && ` • Max ${maxFiles} files`}
                </span>
              </>
            )}
          </p>
        </div>
      ) : (
        <div className={`${multiple ? "grid grid-cols-2 gap-4" : "flex justify-center"}`}>
          {previews.map((preview, index) => (
            <div key={preview} className="relative rounded-lg overflow-hidden border">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-48 object-contain"
              />
              <button
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 p-1 rounded-full bg-foreground/10 hover:bg-foreground/20 backdrop-blur-sm transition-colors"
                type="button">
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
          {multiple && value.length < maxFiles && (
            <div
              {...getRootProps()}
              className={cn(
                "border-2 border-dashed rounded-lg transition-colors cursor-pointer h-48",
                "hover:border-primary/50 hover:bg-muted/25",
                isDragActive && "border-primary/50 bg-muted/25",
                "flex flex-col items-center justify-center gap-2"
              )}>
              <input {...getInputProps()} />
              <UploadCloudIcon className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground text-center">
                Add more images
                <br />
                <span className="text-xs">
                  {maxFiles - value.length} slots remaining
                </span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}