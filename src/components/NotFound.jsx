import NotFound404 from "/404.jpg";
function NotFound() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <img src={NotFound404}></img>
    </div>
  );
}

export default NotFound;
