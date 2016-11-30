importScripts('imageManips.js');

this.onmessage = function(e) {
  var imageData = e.data.imageData;
  var type = e.data.type;

  try {
    var date = Date.now();
    length = imageData.data.length / 4;
    var manipulate = determineFunction(type);
    for (i = 0; i < length; i++) {
      r = imageData.data[i * 4 + 0];
      g = imageData.data[i * 4 + 1];
      b = imageData.data[i * 4 + 2];
      a = imageData.data[i * 4 + 3];
      pixel = manipulate(r, g, b, a);
      imageData.data[i * 4 + 0] = pixel[0];
      imageData.data[i * 4 + 1] = pixel[1];
      imageData.data[i * 4 + 2] = pixel[2];
      imageData.data[i * 4 + 3] = pixel[3];
    }
    postMessage([imageData, date]);
  } catch (e) {
    function ManipulationException(message) {
      this.name = "ManipulationException";
      this.message = message + " + e = " + e;
    };
    throw new ManipulationException('Image manipulation error');
    postMessage(undefined);
  }
}