import Loader from "@/components/shared/Loader.tsx";

function LoaderWrapper() {
  return (
    <div className={"w-full h-full flex-center"}>
      <Loader />
    </div>
  );
}

export default LoaderWrapper;
