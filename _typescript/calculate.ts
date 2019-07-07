function hello(test) {
    console.log("hello");
}

function calculateFee(exchangeRate, trxAmountSrc) {
    const feePercentage = 0.04;
    const minFeeSrc = 3.0;

    var feeAmountDest = Math.max(minFeeSrc*exchangeRate, feePercentage*calculateTrxAmountDest(exchangeRate, trxAmountSrc));

    return Math.ceil(feeAmountDest);
}

function calculateTrxAmountDest(exchangeRate, trxAmountSrc) {
    return Math.ceil(trxAmountSrc*exchangeRate);
}

var trxAmountDest;
var feeAmountDest;
var totalDest;
var invoiceDate;

function calculateInvoice(exchangeRate, trxAmountSrc) {
    trxAmountDest = calculateTrxAmountDest(exchangeRate, trxAmountSrc);
    feeAmountDest = calculateFee(exchangeRate, trxAmountSrc);
    totalDest = trxAmountDest + feeAmountDest;      
}

function numberWithCommas(x:number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getTimezoneLabel(date: Date) {
    var tzOffset = date.getTimezoneOffset()/60;
    var hour = Math.floor(Math.abs(tzOffset));
    var min = Math.abs(date.getTimezoneOffset())%60;
    var hourLabel = hour<10?"0"+hour:hour+"";
    var minLabel = min<10?"0"+min:min+"";
    var combined = hourLabel+minLabel;
    var label = tzOffset <= 0?"+"+combined:"-"+combined;

    return "GMT" + label;
}

function formatDateTime(date: Date) {
    var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
      ];

    var year = date.getFullYear();
    var month = monthNames[date.getMonth()];
    var d = date.getDate()<10?"0"+date.getDate():date.getDate();
    var hour = date.getHours()<10?"0"+date.getHours():date.getHours();
    var min = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
    var tz = getTimezoneLabel(date);
    
    var dateLabel = d + " " + month + " " + year + " " + hour + ":" + min + " " + tz;
    
    return dateLabel;
}

function calculate() {
    var exchangeRate = +selectId<HTMLInputElement>("rate").value;
    var trxAmountSrc = +selectId<HTMLInputElement>("transactionAmountSrc").value;
    calculateInvoice(exchangeRate, trxAmountSrc);

    selectId<HTMLInputElement>("transactionAmountDest").value = numberWithCommas(trxAmountDest);
    selectId<HTMLInputElement>("fee").value = numberWithCommas(feeAmountDest);
    selectId<HTMLInputElement>("total").value = numberWithCommas(totalDest);
    selectId<HTMLElement>("invoiceDate").textContent = formatDateTime(new Date());
}

function selectId<T extends HTMLElement>(id): T {
    return <T> document.getElementById(id);
}

function downloadInvoice() {
    html2canvas(document.querySelector("#invoice")).then(canvas => {
        // document.body.appendChild(canvas)

        var link = document.createElement('a');
        link.download = 'invoice.png';  
        link.href = canvas.toDataURL("image/png")
        link.click();
    });
}