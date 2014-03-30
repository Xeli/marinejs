var nav = navigator.userAgent;

if( nav.match(/Android/i) || nav.match(/BlackBerry/i) || nav.match(/iPhone|iPad|iPod/i) || nav.match(/Opera Mini/i) || nav.match(/IEMobile/i)){
    
    /* mobile device */
    $('#playBG').css('display','block');

} else {
    
    /* desktop device */
    $('#wrapper').tubular({
        videoId: 'l3JVvp3txhM', 
        mute: false,
        repeat: true,
        increaseVolumeBy: 10,
        start: 0
    });

}