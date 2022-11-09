export const sleep = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const randomArr = () => {
    const N =  3 + Math.floor(Math.random() * 14) + 1;
    return (Array.from({length: N}, () => Math.floor(Math.random() * 100) + 1))
}
