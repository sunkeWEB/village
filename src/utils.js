import moment from 'moment';

export function befoderDay(oldtime,nowtime) {
    let oldtimes = getNowTime(new Date(oldtime));  // 获取到旧时间
    let nowtimes = getNowTime(new Date(nowtime)); // 获取新的时间
    // console.log(moment([2018, 0,10,12,12]).diff([2018, 0,10,11], 'hour')); //小时
    // console.log(moment([2018, 0,10,12,12]).diff([2018, 0,10,12,10], 'minute'))
    // console.log(oldtimes);
    // console.log(moment(nowtimes).diff(oldtimes, 'year'));

    console.log(oldtimes, nowtimes);

    if (moment(nowtimes).diff(oldtimes, 'year') >= 1) {  // 几年前
        // return `${oldtimes[0]}年${oldtimes[1] + 1}月${oldtimes[2]}`;
        return moment(nowtimes).diff(oldtimes, 'year');
    }
    return moment(nowtimes).diff(oldtimes, 'year');
}

function getNowTime(time) {
    const year = time.getFullYear();
    const month = time.getMonth();
    const day = time.getDate();
    return [year, month, day];
}

// export function chatLastMsgTime(firtTime, twoTime) {
//     let oldtimes = getNowTime(new Date(parseFloat(firtTime)));  // 获取到旧时间
//     let lasttime = getNowTime(new Date(parseFloat(twoTime))); // 获取新的时间
//     let nowtimes = getNowTime(new Date()); // 获取新的时间
//     if (!twoTime) {
//         return chaeck(nowtimes, oldtimes)
//     }
//     if (Math.abs(moment(lasttime).diff(oldtimes, 'minute')) < 5) return false;
//     return chaeck(nowtimes, oldtimes)
// }
