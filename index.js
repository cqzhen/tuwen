function goMini(item) {
  wx.config({
    // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，小程序 appid
    jsApiList: ['reLaunch'] // 必填，需要使用的JS接口列表
  });
  wx.miniProgram.reLaunch({url: item.path});
}

function goWeb(item) {
  window.open(item.path);
}

function goiOS(item) {
  // todo show ios guide
  let showElement = document.getElementById('ios_guid');
  showElement.style.display = 'flex';
}

function hideiOS() {
  // todo show ios guide
  let showElement = document.getElementById('ios_guid');
  showElement.style.display = 'none';
}

function goVideo(item) {
  let elementVideo = document.getElementById(item.id);
  let elementImage = document.getElementsByClassName(item.id)[0];
  elementVideo.style.display = 'block';
  elementImage.style.display = 'none';
  setTimeout(() => {
    document.getElementsByTagName('video')[0].play();
  });
}

function goTo(e) {
  let item = { path, type, callType, id } = e.dataset;
  if (!item || !item.path) return;
  if (item.callType === 'mini') goMini(item);
  if (item.callType === 'web') goWeb(item);
  if (item.callType === 'video') goVideo(item);
  if (item.callType === 'ios') goiOS(item);
  return;
}

function renderContext({env, page}) {
  let parentElement = document.getElementById('container');
  if (!env || !page) return;

  let graphicEnv = getEnv(env) || {};
  let graphicContext = graphicEnv[page] || [];
  let elements = '';
  graphicContext.forEach((item, index) => {
    if (item.type == 'image') elements += `<image src="${item.src}" class="${item.id}" style="${item.style}" onclick='goTo(this)' data-path=${item.path} data-type=${item.type} data-call-type=${item.callType} data-id=${item.id} />`;
    if (item.type == 'video') elements += `<video id=${item.id} style="${item.style}" preload="metadata" controls><source src="${item.src}" type="video/mp4" /></video>`;
  });
  elements = elements || '<div style="width:100%;height:100px;text-align:center;line-height: 100px;">你想要什么？</div>';
  parentElement.innerHTML = elements;
}
