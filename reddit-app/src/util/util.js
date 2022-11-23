/** 
 * https://stackoverflow.com/a/18103175
 * @author The Demz
*/
function get_time_diff(datetime)
{
    var datetime = typeof datetime !== 'undefined' ? datetime : "2022-11-14 08:58:00.123456";

    var datetime = new Date( datetime ).getTime();
    var now = new Date().getTime();

    if (isNaN(datetime)) {
        return "";
    }

    // console.log( datetime + " " + now);

    if (datetime < now) {
        var milisec_diff = now - datetime;
    } else{
        var milisec_diff = datetime - now;
    }

    var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));

    var date_diff = new Date( milisec_diff );

    const hours = date_diff.getHours();
    const minutes = date_diff.getMinutes();
    const seconds = date_diff.getSeconds();
    let timeUnits = [];
    if (days) {
        timeUnits.push(`${days} Days`);
    }
    if (hours) {
        timeUnits.push(`${hours} Hours`);
    }
    if (minutes) {
        timeUnits.push(`${minutes} Minutes`);
    }
    if (seconds) {
        timeUnits.push(`${seconds} Seconds`);
    }
    
    return timeUnits.join(" ");
}

export function get_time_diff_simplified(datetime) {
    const time_diff_complete_description = get_time_diff(datetime * 1000);
    const index_first_space = time_diff_complete_description.indexOf(" ");
    const time_diff_higher_unit = time_diff_complete_description.slice(0, time_diff_complete_description.indexOf(" ", index_first_space + 1));
    return time_diff_higher_unit;
}

/**
 * https://stackoverflow.com/a/9462382
 * @author Salman A
 */
export function nFormatter(num, digits) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

export const removeHttpsWWW = (url) => url.replace('https://', '').replace('www.', '');