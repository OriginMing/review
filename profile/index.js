window.addEventListener('load',(event)=>{
    //计算可交互时间 Time to Interactive
    let timing = performance.getEntriesByType('navigation')[0]
    let tti = timing.domInteractive - timing.fetchStart;
    
    console.log(tti);
})