export function getPoint(angleInRadians, radius, w) {
  var centerX = 0;
  var centerY = 0;
  var angleInRadians = (Math.PI * angleInRadians) / 180;

  var pointX = centerX + radius * Math.cos(angleInRadians);
  var pointY = centerY + radius * Math.sin(angleInRadians);

  return { left: pointX + w, top: radius - pointY };
}

export function getJiao(x, y) {
  var angleInRadians = Math.atan2(y, x);
  return angleInRadians * (180 / Math.PI);
}

export function getPointCoor(point, el, bigEl, total = 30000) {
  if (el.current && bigEl.current) {
    const elS = el.current.getBoundingClientRect(); // 获取元素位置信息
    const bigElS = bigEl.current.getBoundingClientRect(); // 获取元素位置信息

    const w = elS.width / 2;
    const h = elS.height;
    const r = bigElS.width / 2;
    const big = getJiao(-w, r - h);
    const small = getJiao(w, r - h);

    const jiao300 = big - ((big - small) / total) * point;

    return getPoint(jiao300, r, w);
  } else {
    return { left: 0, top: 0 };
  }
}

export function hiddenAddress(addr) {
  return addr ? `${addr.slice(0, 6)}....${addr.slice(-4)}` : "";
}
