
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
        Store.state.roomIdFromLink = match.$args.roomId;
    }, function(nomatch) {
        var link = nomatch.$link.url;
        if(link.indexOf('vubingo.com/room/')>=0){
            var roomId = link.replace(/.*room\//g,'');
            roomId = roomId.replace(/\/.*/g,'');
            Store.state.roomIdFromLink = roomId;
        }else if(link.replace(/.*vubingo.com/g,'').length>1){
            Store.state.invalidLink=link;
        }
    });
    document.addEventListener("backbutton", onBackKeyDown, false);
}
function onBackKeyDown() {
    if(Store.state.roomIdFromLink!==false){
        Store.state.roomIdFromLink = false;
        return;
    }
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
      