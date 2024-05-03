const generateOTP = async (digits: number): Promise<string> => {
    return `${Math.floor(Math.pow(10, digits-1) + Math.random() * 9 * Math.pow(10, digits-1))}`
}
    
export default generateOTP;