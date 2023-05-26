import { data } from "autoprefixer";
import { useCallback, useRef } from "react";

import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

export default function ColumnsTable2({
  title,
  datapoints,
  name,
  notifyMessage,
}) {
  const ref = useRef(null);

  const createTableImage = async () => {
    var node = document.getElementById(name);

    htmlToImage
      .toPng(node)
      .then(async function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        img.canvasHeight=90
        const data = await fetch(dataUrl);
        const blob = await data.blob();

        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);
      })
      .then((res) => notifyMessage())
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);
  return (
    <>
    <div className="" id={name}>
      <div className="border-2 border-black divide-y divide-black ">
        <div className="bg-gray-100">
          <h4 className="px-3 py-2 font-bold text-lg">{title}</h4>
        </div>
        <div className="grid grid-cols-2 divide-x  divide-black ">
          {datapoints &&
            [
              [0, Math.ceil(datapoints.length / 2)],
              [Math.ceil(datapoints.length / 2)],
            ].map((part, index) => (
              <div className="divide-y divide-black" key={index}>
                {datapoints.slice(...part).map((item, i) => (
                  <div
                    key={item.id}
                    className="grid divide-x  divide-black grid-cols-[5fr_1fr] "
                  >
                    <p className="py-2 px-3">{item[1].title}</p>

                    <span className="py-2 text-center">{item[1].number}</span>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
    
    
    <div className="flex justify-center my-10">
        <button
          onClick={createTableImage}
          className="bg-yellow py-2  rounded px-20 flex gap-3 items-center flex shadow "
        >
          <p className="text-lg"> Copy table </p>
        </button>
      </div>
    </>
    
  );
}
