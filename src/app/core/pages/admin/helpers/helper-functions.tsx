import moment from "moment"

const formatDate = (date: string) => {
    if (date) {
        return moment(date).format("DD-MM-YYYY")
    } else {
        return "----------"
    }
}

export default formatDate

export const formatDateAndTime = (date: string) => {
    if (date) {
        return moment(date).format("DD-MM-YYYY:HH:mm:ss")
    } else {
        return "----------"
    }
}