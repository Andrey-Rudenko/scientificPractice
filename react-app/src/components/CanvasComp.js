import React from "react";

const CanvasComp = ({data, width, height}) => {
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const imgData = ctx.createImageData(width, height);
        let i = 0;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const gray = Math.floor(data[y][x] * 255);
                imgData.data[i++] = gray;
                imgData.data[i++] = gray;
                imgData.data[i++] = gray;
                imgData.data[i++] = 255;
            }
        }

        ctx.putImageData(imgData, 0, 0);
    }, [data, width, height]);

    return <canvas ref={canvasRef} width={width} height={height}/>;

};
export default CanvasComp;