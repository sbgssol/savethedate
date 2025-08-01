export default function BoxedNumber(props: { children: React.ReactNode; strokeWidth: string; className: string }) {
  // const strokeSize = Number(props.strokeWidth.replace("px", ""));

  return <div className={`${props.className} `}>{props.children}</div>;
}
