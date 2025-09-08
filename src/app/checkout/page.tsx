import CheckoutPage from "./components/Checkout";



export default function page() {
    return (
        <>
            <section className='bg-gray-50 py-20 px-4'>
                <div className='maxW h-full'>
                    <CheckoutPage />
                </div>
            </section>
        </>
    );
}