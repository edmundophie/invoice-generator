function calculateFee(exchangeRate, trxAmountSrc) {
    var feePercentage = 0.04;
    var minFeeSrc = 3.0;
    var feeAmountDest = Math.max(minFeeSrc * exchangeRate, feePercentage * calculateTrxAmountDest(exchangeRate, trxAmountSrc));
    return Math.ceil(feeAmountDest);
}
function calculateTrxAmountDest(exchangeRate, trxAmountSrc) {
    return Math.ceil(trxAmountSrc * exchangeRate);
}
var trxAmountDest = 0;
var feeAmountDest = 0;
var totalDest = 0;
var invoiceDate;
function calculateInvoice(exchangeRate, trxAmountSrc) {
    trxAmountDest = calculateTrxAmountDest(exchangeRate, trxAmountSrc);
    feeAmountDest = calculateFee(exchangeRate, trxAmountSrc);
    totalDest = trxAmountDest + feeAmountDest;
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function getTimezoneLabel(date) {
    var tzOffset = date.getTimezoneOffset() / 60;
    var hour = Math.floor(Math.abs(tzOffset));
    var min = Math.abs(date.getTimezoneOffset()) % 60;
    var hourLabel = hour < 10 ? "0" + hour : hour + "";
    var minLabel = min < 10 ? "0" + min : min + "";
    var combined = hourLabel + minLabel;
    var label = tzOffset <= 0 ? "+" + combined : "-" + combined;
    return "GMT" + label;
}
function formatDateTime(date) {
    var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ];
    var year = date.getFullYear();
    var month = monthNames[date.getMonth()];
    var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var tz = getTimezoneLabel(date);
    var dateLabel = d + " " + month + " " + year + " " + hour + ":" + min + " " + tz;
    return dateLabel;
}
function calculate() {
    var exchangeRate = +selectId("rate").value;
    var trxAmountSrc = +selectId("transactionAmountSrc").value;
    calculateInvoice(exchangeRate, trxAmountSrc);
    selectId("transactionAmountDest").value = numberWithCommas(trxAmountDest);
    selectId("fee").value = numberWithCommas(feeAmountDest);
    selectId("total").value = numberWithCommas(totalDest);
    selectId("invoiceDate").textContent = formatDateTime(new Date());
}
function selectId(id) {
    return document.getElementById(id);
}
function downloadInvoice() {
    html2canvas(document.querySelector("#invoice")).then(function (canvas) {
        // document.body.appendChild(canvas)
        var link = document.createElement('a');
        link.download = 'invoice.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}
