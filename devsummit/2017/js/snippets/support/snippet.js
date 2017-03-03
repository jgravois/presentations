function create(tag, attr) {
  var elem = document.createElement(tag);

  for (var k in attr) {
    elem[k] = attr[k];
  }

  return elem;
}

document.head.appendChild(create("link", {
  rel: "stylesheet",
  href: "https://unpkg.com/leaflet@1.0.3/dist/leaflet.css"
}));

document.head.appendChild(create("script", {
  src: "https://unpkg.com/leaflet@1.0.3/dist/leaflet.js"
}));

document.head.appendChild(create("script", {
  src: "https://unpkg.com/esri-leaflet@2.0.7"
}));

 window.addEventListener("load", init);
