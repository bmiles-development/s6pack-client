import moment from 'moment';

export function getRemainingDaysInBillingPeriod(nextInvoiceTimestamp) {
    var start = moment(new Date());
    var end = moment(nextInvoiceTimestamp * 1000); //milliseconds
    const daysUntilEndOfBillingPeriod = end.diff(start, 'days');
    return daysUntilEndOfBillingPeriod;
}

export function getDaysSinceStartOfBillingPeriod(previousInvoiceTimestamp) {
    var start = moment(previousInvoiceTimestamp * 1000); //milliseconds
    var end = moment(new Date());
    const daysSinceStartOfBillingPeriod = end.diff(start, 'days');
    return daysSinceStartOfBillingPeriod;
}
