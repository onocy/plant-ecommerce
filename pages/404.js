import Image from "next/image";

const ErrorPage = () => {
  return (
    <main>
      <div class="flex justify-center items-center">
        <div class="centered text-center">
          <Image src="/images/404_final.png" width="400" height="200" alt="" />
          <div className="text-xl italic">
            <div>This page must have been overwatered...</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
