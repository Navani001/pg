// SignaturePad.tsx
import React, { useRef } from "react";
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
        <div className="flex flex-col space-y-4">
            <SignatureCanvas
            
                ref={sigCanvas}
                penColor={isDrawing ? "black" : "transparent"}
                canvasProps={{  className: "border-1 w-full h-full border-gray-400 rounded-lg" }}
            />

            <div className="space-x-4">
                <button onClick={clear} className="px-4 py-2 bg-gray-300 rounded">
                    Clear
                </button>
                  <ButtonComponent handleOnClick={save} isStartIcon isEndIcon={false} isIcon={true} />
                {/* <button onClick={save} className="px-4 py-2 bg-blue-500 text-white rounded">
                    Save
                </button> */}
                <button onClick={() => {
                    const data = sigCanvas.current?.toData();
                    if (data && data.length > 0) {
                        data.pop(); // remove last stroke
                        sigCanvas.current?.fromData(data); // redraw remaining
                    }
                }} className="px-4 py-2 bg-blue-500 text-white rounded">
                    Undo
                </button>
                <button onClick={() => {
                    setIsDrawing(!isDrawing);
                }} className="px-4 py-2 bg-blue-500 text-white rounded">
                    Draw
                </button>
            </div>
        </div>
    );
};
