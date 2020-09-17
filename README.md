# Glasses Virtual Try-on



Offer glasses virtual try on to your users with this JavaScript widget. It can be easily integrated on a website or in a mobile web application with a few lines of HTML code. The experience is in real-time: the user see his face like in a mirror, but with glasses on.


## Features
These are the main features of this widget:

* real-time webcam glasses virtual try on,
* light reconstruction (ambient + directionnal),
* very robust to all lighting conditions,
* mobile friendly,
* high end 3D engine with:
  * physically based rendering (PBR),
  * raytraced shadows,
  * deferred shading,
  * temporal antialiasing.



## Demonstration

You can test it with these demos:
* [Integration demo (demo.html of this repository)](https://jeeliz.com/demos/jeelizWidgetGitPublicDemo)
* [Jeeliz sunglasses application (not included in this repository)](https://jeeliz.com/sunglasses)

Here is a video screenshot of the Jeeliz Sunglasses application:
<p align="center">
<a href='https://www.youtube.com/watch?v=peUDRXB0H6g'><img src='https://img.youtube.com/vi/peUDRXB0H6g/0.jpg'></a>
</p>

## Fallback

A Fallback version was available til January 2020. The server side webservice generating the rendering has been undeployed.
So now, if the user does not want to share its camera or if its implementation of WebGL is too minimalistic, a `FALLBACKUNAVAILABLE` error will be triggered.


## About the technology

### Documentation
This API uses Jeeliz WebGL Deep Learning technology to detect and track the user's face using a neural network.
You can find the technical documentation in [doc.pdf](/doc.pdf).

We have written some articles to help you for integration:

* [How to use the Jeeliz VTO widget in your everyday projects](https://jeeliz.com/blog/how-to-use-the-jeeliz-vto-widget-in-your-everyday-projects/)
* [Advanced use of the Jeeliz Widget VTO API](https://jeeliz.com/blog/advanced-use-of-the-jeeliz-widget-vto-api/)
* [Create a VTO experience from start to sale](https://jeeliz.com/blog/create-a-glasses-vto-experience-from-start-to-sale-with-the-jeeliz-glasses-vto-widget/)

If you still need more help, we also offer development services. You can contact-us [here](https://jeeliz.com/contact-us/).


### Compatibility

* If `WebGL2` is available, it uses `WebGL2` and no specific extension is required,
* If `WebGL2` is not available but `WebGL1`, we require either `OES_TEXTURE_FLOAT` extension or `OES_TEXTURE_HALF_FLOAT` extension,
* If `WebGL2` is not available, and if `WebGL1` is not available or neither `OES_TEXTURE_FLOAT` or `OES_HALF_TEXTURE_FLOAT` are implemented, the user is not compatible with the real time video version.

In all cases, *MediaStream API* should be implemented in the web browser, otherwise FaceFilter API will not be able to get the webcam video feed. Here are the compatibility tables from [caniuse.com](https://caniuse.com/) here: [WebGL1](https://caniuse.com/#feat=webgl), [WebGL2](https://caniuse.com/#feat=webgl2), [MediaStream API](https://caniuse.com/#feat=stream).

If a compatibility error is triggered, please post an issue on this repository. If this is a problem with the webcam access, please first retry after closing all applications which could use your device (Skype, Messenger, other browser tabs and windows, ...). Please include:

* a screenshot of [webglreport.com - WebGL1](http://webglreport.com/?v=1) (about your `WebGL1` implementation),
* a screenshot of [webglreport.com - WebGL2](http://webglreport.com/?v=2) (about your `WebGL2` implementation),
* the log from the web console,
* the steps to reproduce the bug, and screenshots.

### Optimization

If you meet some performance issues, please first:

* Check that you are using the latest main script ( `/release/jeelizNNCwidget.js` ),
* Check that your browser is updated (Chrome is advised), check that your graphic drivers are updated,
* Enter `chrome://gpu` in the URL bar and check there are no major performance caveats, that hardware acceleration is enabled, that your GPU is correctly detected,

The performance is adaptative. We do as many detection loops per rendering till we reach a maximum value (`7`). If we cannot reach this value, the GPU will be running at 100%. The closer we are to this maximum value, the less latency we will observe.

So it is normal that the GPU is running at 100%. But it may be annoying for other parts of the application because DOM can be slow to update and CSS animations can be laggy.

The first solution ( implemented in [Jeeliz sunglasses web-app](https://jeeliz.com/sunglasses) ) is to slow down the glasses rendering once the user has clicked on a button using:
 ```
JEEFITAPI.relieve_DOM(<durationInMs>)
```
For example,`JEEFITAPI.relieve_DOM(300)` will free the GPU during 300 milliseconds.

If you need to slow down the rendering to free the GPU during an undertermined period of time, you can use:
```
JEEFITAPI.switch_slow(<boolean> isSlow, <int> intervalMs)
```
Where `intervalMs` is the interval in milliseconds between 2 rendering loops.


## Hosting

### HTTPS only!

This widget access the user's webcam video stream through `MediaStream API`. So your application should be hosted by a HTTPS server (even with a self-signed certificate). It won't work at all with unsecure HTTP, even locally with some web browsers.

### Glasses 3D models and materials

Glasses models and materials are stored on the *Jeeliz GlassesDB*. Each model is designed by a unique SKU. You can check the different models available by opening [glassesSKU.csv](/glassesSKU.csv) file. If you want us to add specific glasses models, please contact us at `contact__at__jeeliz.com` or [here](https://jeeliz.com/contact-us/).

So this library is not fully client side because the assets are hosted by our servers. If you want to manage your own assets you can use our generalistic face detection and tracking API, [Jeeliz FaceFilter API](https://github.com/jeeliz/jeelizFaceFilter). There is a demonstration included in that repository, using THREE.JS as 3D rendering engine, which can be a starting point, [Miel Pops Glasses](https://jeeliz.com/demos/faceFilter/demos/threejs/miel_pops/).


## License

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html). This application is free for both commercial and non-commercial use.


## References
* [Jeeliz official website](https://jeeliz.com)