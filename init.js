document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    window.deviceReady = true;
    navigator.splashscreen.hide();
    StatusBar.styleDefault();
    Server.checkIfAppOutdated(AppVersion.build);
    IonicDeeplink.route({
    '/room/:roomId': {
        target: 'room',
        parent: 'rooms'
    }
    }, function(match) {
    Router.replace('/room/'+match.$args.roomId);
    window.location.reload();
    }, function(nomatch) {
    });
    document.removeEventListener('backbutton',onBackKeyDown);
    document.addEventListener("backbutton", onBackKeyDown, false);
}
(function() {    
    alert();
    document.removeEventListener('backbutton',onBackKeyDown);
    document.addEventListener("backbutton", onBackKeyDown, false);
 })();
function onBackKeyDown() {
    if(Store.state.howToPlayModal){
    Store.state.howToPlayModal = false;
    return;
    }
    if(Store.state.room.myRoom){
    Store.state.room.leaveRoomConfirmModal=!Store.state.room.leaveRoomConfirmModal
    }else{
    navigator.app.exitApp();
    }
}