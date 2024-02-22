export default function CancelPage() {
  return (
    <div className="flex justify-center items-center">
      <div className="centered text-center bg-white p-10 shadow-xl rounded-xl">
        <div className="text-3xl mb-5">Checkout Canceled</div>
        <p>
          Your checkout process was canceled. You can return to your cart to
          complete your purchase.
        </p>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/cart" className="btn btn-primary text-white mt-5">
          Return to Cart
        </a>{" "}
      </div>
    </div>
  );
}
