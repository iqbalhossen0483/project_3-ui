const useTailwind = () => {
    const link = "text-xl ml-2 hover:underline";
    const bannerHeader = "text-4xl font-semibold text-center my-5 text-green-400";
    const SectionHeader = "text-5xl font-bold text-center my-5";
    const button = "border rounded-md py-1 px-3 text-xl bg-green-500";
    const form = "flex flex-col w-2/6 mx-auto px-5 py-4 bg-white rounded my-10";
    const formHeader = "text-3xl font-semibold text-center mb-5";
    const input = "border rounded py-1 px-3 my-1 text-xl";
    const product = "border rounded-md bg-white";
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
        profile
    }
}

export default useTailwind;