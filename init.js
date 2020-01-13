
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    navigator.splashscreen.hide();
    StatusBar.styleDefault();
    Server.checkIfAppOutdated(AppVersion.build);
    IonicDeeplink.route({
    '/room/:roomId': {
        target: 'room',
        parent: 'rooms'
    }
    }, function(match) {
        window.loadedFromLink = match.$args.roomId;
    }, function(nomatch) {
    });
    document.addEventListener("backbutton", onBackKeyDown, false);
}
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
      