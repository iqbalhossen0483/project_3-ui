const useTailwind = () => {
    const link = "text-xl ml-4 hover:text-white active:text-white";
    const bannerHeader = "text-3xl md:text-4xl font-semibold text-center my-5 text-green-400";
    const SectionHeader = "text-3xl md:text-5xl font-bold text-center my-5";
    const button = "border rounded-md py-1 mb-3 px-3 text-xl bg-green-500";
    const form = "flex flex-col md:w-3/5 mx-auto px-5 py-4 bg-white rounded my-10";
    const singleDiv = "flex flex-col md:w-2/6 mx-auto px-5 py-4 bg-white rounded my-10";
    const formHeader = "text-4xl font-semibold text-center mb-5";
    const input = "border rounded py-1 px-3 my-1 text-xl";
    const product = "m-3 md:m-0 border rounded-md bg-white leading-6";
    const profile = "w-12 h-12 rounded-full mx-auto";
    return {
        link,
        bannerHeader,
        button,
        formHeader,
        form,
        input,
        SectionHeader,
        product,
        profile,
        singleDiv
    }
}

export default useTailwind;