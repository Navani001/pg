// SignaturePad.tsx
import { cn } from "@heroui/react";
import React, { useRef } from "react";
import { FaUndoAlt } from "react-icons/fa";
import { IoPencil } from "react-icons/io5";
import { MdUndo } from "react-icons/md";
import SignatureCanvas from "react-signature-canvas";
import { ButtonComponent } from "../button";

export const SignaturePad: React.FC = () => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const clear = () => {
    sigCanvas.current?.clear();
  };

  const save = () => {
    const dataUrl = sigCanvas.current?.toDataURL(); // base64 PNG
    console.log("Signature Data URL:", dataUrl);
    alert("Signature saved! Check console.");
  };

  return (
    <div className="w-full flex flex-col p-3 border rounded-xl gap-3">
      <h4 className="font-semibold text-lg">Digital Signature</h4>
      <div className="flex w-full flex-col  space-y-4">
        <SignatureCanvas
          ref={sigCanvas}
          penColor={isDrawing ? "black" : "transparent"}
          canvasProps={{
            className: "border-1  rounded-lg w-full h-full",
          }}
        />

        <div className="space-x-4">
          <ButtonComponent
            handleOnClick={clear}
            buttonText="Clear"
            textClassName="font-normal "
            baseClassName="w-auto h-auto p-2  border border-black"
            buttonIcon={<FaUndoAlt />}
            isStartIcon
            isEndIcon={false}
            isIcon={true}
          />
          <ButtonComponent
            handleOnClick={() => {
              setIsDrawing(!isDrawing);
            }}
            buttonText="Draw"
            textClassName="font-normal "
            bgColor={isDrawing ? "bg-primary" : "bg-transparent"}
            baseClassName={cn("w-auto h-auto p-2 border border-black", {
              "bg-primary  border-0 text-white": isDrawing,
            })}
            buttonIcon={<IoPencil className="text-md" />}
            isStartIcon
            isEndIcon={false}
            isIcon={true}
          />

          <ButtonComponent
            handleOnClick={() => {
              const data = sigCanvas.current?.toData();
              if (data && data.length > 0) {
                data.pop(); // remove last stroke
                sigCanvas.current?.fromData(data); // redraw remaining
              }
            }}
            buttonText="Undo"
            textClassName="font-normal "
            baseClassName="w-auto h-auto p-2 border border-black"
            buttonIcon={<MdUndo />}
            isStartIcon
            isEndIcon={false}
            isIcon={true}
          />
        </div>
      </div>
    </div>
  );
};
