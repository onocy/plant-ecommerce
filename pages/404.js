import Image from "next/image";

const ErrorPage = () => {
  return (
    <main>
      <div class="flex justify-center items-center">
        <div class="centered text-center">
          <Image src="/images/404_final.png" width="800" height="200" alt="" />
          <div className="font-bold text-[#769084] text-xl">
            <div>
              This page must have been overwatered because it&lsquo;s no longer
              here.
            </div>
            <div>Don&lsquo;t leaf us just yet!</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
