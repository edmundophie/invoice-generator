function calculateFee(exchangeRate:number, trxAmountSrc:number): number {
    const feePercentage = 0.04;
    const minFeeSrc = 3.0;

    let feeAmountDest: number = Math.max(minFeeSrc*exchangeRate, feePercentage*calculateTrxAmountDest(exchangeRate, trxAmountSrc));

    return Math.ceil(feeAmountDest);
}

function calculateTrxAmountDest(exchangeRate: number, trxAmountSrc: number): number {
    return Math.ceil(trxAmountSrc*exchangeRate);
}

let trxAmountDest: number = 0;
let feeAmountDest: number = 0;
let totalDest:number = 0;

function calculateInvoice(exchangeRate: number, trxAmountSrc: number): void {
    trxAmountDest = calculateTrxAmountDest(exchangeRate, trxAmountSrc);
    feeAmountDest = calculateFee(exchangeRate, trxAmountSrc);
    totalDest = trxAmountDest + feeAmountDest;      
}

function numberWithCommas(x:number): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getTimezoneLabel(date: Date): string {
    let tzOffset: number = date.getTimezoneOffset()/60;
    let hour: number = Math.floor(Math.abs(tzOffset));
    let min: number = Math.abs(date.getTimezoneOffset())%60;
    let hourLabel: string = hour<10?"0"+hour:hour+"";
    let minLabel: string = min<10?"0"+min:min+"";
    let combined: string = hourLabel+minLabel;
    let label: string = tzOffset <= 0?"+"+combined:"-"+combined;

    return "GMT" + label;
}

function formatDateTime(date: Date): string {
    let monthNames: string[] = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
      ];

    let year: number = date.getFullYear();
    let month: string = monthNames[date.getMonth()];
    let d: string = date.getDate()<10?`0${date.getDate()}`:`${date.getDate()}`;
    let hour: string = date.getHours()<10?`0${date.getHours()}`:`${date.getHours()}`;
    let min: string = date.getMinutes()<10?`0${date.getMinutes()}`:`${date.getMinutes()}`;
    let tz: string = getTimezoneLabel(date);
    
    return `${d} ${month} ${year} ${hour}:${min} ${tz}`;
}

function calculate(): void {
    let exchangeRate: number = parseInt(selectId<HTMLInputElement>("rate").value) || 0;
    let trxAmountSrc: number = parseInt(selectId<HTMLInputElement>("transactionAmountSrc").value) || 0;
    calculateInvoice(exchangeRate, trxAmountSrc);

    selectId<HTMLInputElement>("transactionAmountDest").value = numberWithCommas(trxAmountDest);
    selectId<HTMLInputElement>("fee").value = numberWithCommas(feeAmountDest);
    selectId<HTMLInputElement>("total").value = numberWithCommas(totalDest);
    selectId<HTMLElement>("invoiceDate").textContent = formatDateTime(new Date());
}

function selectId<T extends HTMLElement>(id: string): T {
    return <T> document.getElementById(id);
}

function downloadInvoice(): void {
    html2canvas(document.querySelector("#invoice")).then(canvas => {
        // document.body.appendChild(canvas)

        let link: HTMLAnchorElement = document.createElement('a');
        link.download = 'invoice.png';  
        link.href = canvas.toDataURL("image/png")
        link.click();
    });
}