function isOver100(dateOfBirth) {
    var dob = new Date(dateOfBirth);
    //calculate month difference from current date in time
    var month_diff = Date.now() - dob.getTime();

    //convert the calculated difference in date format
    var age_dt = new Date(month_diff);

    //extract year from date
    var year = age_dt.getUTCFullYear();

    //now calculate the age of the user
    var age = Math.abs(year - 1970);

    return age <= 100
}

export default function dateBirthMax(value) {
    return isOver100(value);
}