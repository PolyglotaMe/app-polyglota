import Image from "next/image";
import LoginBox from "./_components/login-box";

export default function Home() {
  return (
    <div className="flex md:flex-row flex-col-reverse h-screen w-screen items-center justify-center">
      <div className="w-full h-1/2 md:h-full md:w-full md:flex md:items-center md:justify-center">
        <LoginBox />
      </div>

      <div className="w-full h-1/2 md:h-full md:w-auto relative md:static overflow-hidden z-[-1]">
        <div className="absolute w-[600px] md:w-full md:left-0 left-[-150px] h-full">
          <div className="relative w-full h-full">
            <Image
              className="absolute bottom-0"
              src={"/images/notebook.png"}
              alt="background"
              fill
              quality={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
