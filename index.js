const cheerio  = require('cheerio');
const axios = require('axios');
const xlsx = require('node-xlsx')
const fs = require('fs')
function getData(arr,eff){
    let newArr = []
    for(let i = 0;i < arr.length;i++){
        newArr.push(arr[i].children[0].data)
    }
    newArr.unshift(eff)
    return newArr
}
async function getDom() {
    const url = 'http://quotes.money.163.com/f10/zycwzb_600519.html#01c01'
    let res =  await axios.get(url)
    const $ = cheerio.load(res.data);
    let Dom = $('.scr_table tbody tr').slice(0,1).find('th')
    let Dom_num = $('.scr_table tbody tr').slice(11,12).find('td')
    // 获取日期表头
    let timeHead = $('.align_l').text()
    let timeList = getData(Dom,timeHead)
    let numList = getData(Dom_num,'净利润(扣除非经常性损益后)(万元)')
    var buffer=xlsx.build([{name:'sheet1',data:[timeList,numList]}]);
    fs.writeFileSync('./result.xlsx',buffer,{'flag':'w'});
}
getDom()
