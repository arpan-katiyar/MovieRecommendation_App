import loader from "/Animation-3.gif";
function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <img src={loader}></img>
    </div>
  );
}

export default Loading;
