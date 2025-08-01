export default function BorderedOnlyText(props: {
  textFill: string;
  strokeWidth: string;
  strokeColor: string;
  shadowWidth: string;
  shadowColor: string;
  shadowBlur: string;
  className: string;
  str: string;
}) {
  let border = "";
  const update = function () {
    const strokeSize = Number(props.strokeWidth.replace("px", ""));
    // console.log("strokeSize: " + strokeSize);
    const preview = "";
    for (let angle = 0; angle < 2 * Math.PI; angle += 1 / strokeSize) {
      appendShadow(preview, Math.cos(angle) * strokeSize, Math.sin(angle) * strokeSize, props.strokeColor);
    }
  };

  const appendShadow = function (item: string, x: number, y: number, col: string) {
    let textShadow = "";
    textShadow = textShadow + x + "px " + y + "px " + col;
    border += textShadow + ", ";
    item += textShadow;
    // console.log('text-shadow: ' + border);
  };

  update();
  const shadowW = "-" + props.shadowWidth + " " + props.shadowWidth + " " + props.shadowBlur;
  const finalShadow = border + shadowW + " " + props.shadowColor;
  // console.log("Final shadow: " + finalShadow)
  return (
    <span
      className={`${props.className}`}
      style={{
        textShadow: finalShadow,
        color: props.textFill,
      }}
    >
      {props.str}
    </span>
  );
}
