import Image from "next/image";
import LoginBox from "./_components/login-box";

export default function Home() {
  return (
    <div className="flex md:flex-row flex-col-reverse h-screen w-screen items-center justify-center bg-gradient-to-b from-[#171A1C] to-[#282B2F]">
      <div className="w-full h-1/2 md:h-full md:w-full md:flex md:items-center md:justify-center z-[2]">
        <LoginBox />
      </div>

      <div className="w-full h-3/8 overflow-hidden md:h-full md:w-auto relative md:static z-[1]">
        <div className="absolute w-[550px] md:w-full md:left-0 left-[-150px] h-full">
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
