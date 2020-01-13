
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
    Router.replace('/room/'+match.$args.roomId);
    window.location.reload();
    }, function(nomatch) {
    });
    document.removeEventListener("backbutton",onBackKeyDown);
    document.addEventListener("backbutton", onBackKeyDown, false);
}
function onLoad(){
    document.removeEventListener("backbutton",onBackKeyDown);
    document.addEventListener("backbutton", onBackKeyDown, false);
}
function onBackKeyDown() {
    alert(Store.state.howToPlayModal);
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
      