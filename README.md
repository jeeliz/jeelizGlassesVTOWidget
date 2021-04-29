# Glasses Virtual Try-on Widget



Offer glasses virtual try on to your users with this JavaScript widget. It can be easily integrated on a website or in a mobile web application with a few lines of HTML code. The experience is in real-time: the user see his face like in a mirror, but with glasses on.

## Table of contents

* [Features](#features)
* [Demonstrations](#demonstrations)
* [Glasses 3D models](#glasses-3d-models)
  * [From GlassesDB](#from-glassesdb)
  * [As a static file](#as-a-static-file)
* [Documentation](#documentation)
* [Misc](#misc)
  * [Test GlassesDB SKU availability](#test-glassesdb-sku-availability)
* [Compatibility](#compatibility)
* [Optimization](#optimization)
* [Hosting](#hosting)
* [License](#license)


## Features

* real-time web based glasses virtual try on,
* light reconstruction (ambient + directionnal),
* very robust to lighting conditions,
* mobile friendly,
* high end 3D engine with:
  * physically based rendering (PBR),
  * raytraced shadows,
  * deferred shading,
  * temporal antialiasing.


## Demonstrations

You can test it with these demos:

* [Static Integration demo (`index.html` of this repository)](https://jeeliz.com/demos/jeelizWidgetGitPublicDemo)
* [React/Webpack/NPM Integration demo](/reactIntegrationDemo)
* [Jeeliz sunglasses web application (not included in this repository)](https://jeeliz.com/sunglasses)
<!-- Video screenshot of *Jeeliz Sunglasses*:
<p align="center">
<a href='https://www.youtube.com/watch?v=peUDRXB0H6g'><img src='https://img.youtube.com/vi/peUDRXB0H6g/0.jpg'></a>
</p>
-->

## Glasses 3D models

### From GlassesDB

Glasses models are stored on the *Jeeliz GlassesDB*. Each model is identified by a unique SKU. You can check the different models available by opening [glassesSKU.csv](/glassesSKU.csv) file.

If you want us to add specific glasses models to GlassesDB, please contact us at `contact__at__jeeliz.com` or [here](https://jeeliz.com/contact-us/). We charge for this service.


### As a static file

You can convert your own glasses GLTF 3D Model to a proprietary JSON file accepted by this widget using [Jeeliz Glasses Studio 3D](https://jeeliz.com/glassesStudio3D/). You can download:

* [The PDF documentation about GLTF models specs and how to import your model to Jeeliz VTO widget](https://jeeliz.com/glassesStudio3D/doc/GlassesStudio3DDoc.pdf)
* [Some samples of GLTF glasses 3D models](https://jeeliz.com/glassesStudio3D/testFiles/GlassesStudio3DSampleFiles.zip)

You can use both models from *GlassesDB* and your own static models. *Glasses Studio 3D* is a free application and you keep the IP on your exported 3D models.
Unlike this widget, *Glasses studio 3D* works:

* Only on desktops, with a fullHD screen resolution (1920x1080), 
* Your GPU device needs to be able to do MRT (Multi Rendering Targets) on at least 4 targets (i.e. it may not work on deprecated or very cheap hardware).

However, the capabilities of *Glasses Studio 3D* are below what we offer with *GlassesDB*. This is a comparison:

| Feature | Glasses Studio 3D | GlassesDB |
| --- | :-: | :-: |
| PBR material parameters | X | X |
| diffuse texture | X | X |
| normal texture  | X | X |
| PBR params texture |  | X |
| 3D model compression |  | X |
| Guaranteed support |  | X |
| Hosting |  | X |


## Documentation

This library relies on *Jeeliz WebGL Deep Learning technology* to detect and track the face using a neural network.
You can find the technical documentation in [doc.pdf](/doc.pdf).

Here are some articles to help you for integration:

* [How to use the Jeeliz VTO widget in your everyday projects](https://jeeliz.com/blog/how-to-use-the-jeeliz-vto-widget-in-your-everyday-projects/)
* [Advanced use of the Jeeliz Widget VTO API](https://jeeliz.com/blog/advanced-use-of-the-jeeliz-widget-vto-api/)
* [Create a VTO experience from start to sale](https://jeeliz.com/blog/create-a-glasses-vto-experience-from-start-to-sale-with-the-jeeliz-glasses-vto-widget/)

If you need more help, we offer development services and customized support. You can contact-us [here](https://jeeliz.com/contact-us/).


## Misc

### Test GlassesDB SKU availability

In some cases, SKU can be generated dynamically from the backoffice of the glasses e-commerce website. It can be `<glassesMakerAsPrefix>_<collection>_<modelId>`. We need to test if this SKU is in *GlassesDB* in order to display the Virtual Try-on button to the user.
To do this, request with `GET` or `POST` method (using an `XMLHttpRequest` for example):

```
https://glassesdbcached.jeeliz.com/testSku/<skuToTest>
```

You can test it here:

* [For existing SKU "rayban_aviator_or_vertFlash"](https://glassesdbcached.jeeliz.com/testSku/rayban_aviator_or_vertFlash)
* [For non-existing SKU "notASKU"](https://glassesdbcached.jeeliz.com/testSku/notASKU)



## Compatibility

* If `WebGL2` is available, it uses `WebGL2` and no specific extension is required,
* If `WebGL2` is not available but `WebGL1`, we require either `OES_TEXTURE_FLOAT` extension or `OES_TEXTURE_HALF_FLOAT` extension,
* If `WebGL2` is not available, and if `WebGL1` is not available or neither `OES_TEXTURE_FLOAT` or `OES_HALF_TEXTURE_FLOAT` are implemented, the user is not compatible with the real time video version.

In all cases, *MediaStream API* should be implemented in the web browser, otherwise FaceFilter API will not be able to get the camera video feed. Here are the compatibility tables from [caniuse.com](https://caniuse.com/) here: [WebGL1](https://caniuse.com/#feat=webgl), [WebGL2](https://caniuse.com/#feat=webgl2), [MediaStream API](https://caniuse.com/#feat=stream).

If a compatibility error is triggered, please post an issue on this repository. If this is a problem with the camera access, please first retry after closing all applications which could use your device (Skype, Messenger, other browser tabs and windows, ...). Please include:

* a screenshot of [webglreport.com - WebGL1](http://webglreport.com/?v=1) (about your `WebGL1` implementation),
* a screenshot of [webglreport.com - WebGL2](http://webglreport.com/?v=2) (about your `WebGL2` implementation),
* the log from the web console,
* the steps to reproduce the bug, and screenshots.

If the user was not compatible or refuses to share its camera video stream, an image based fallback version was available til January 2020. The server side webservice generating the rendering has been undeployed.
If the user does not want to share its camera or if its implementation of WebGL is too minimalistic, a `FALLBACKUNAVAILABLE` error will be triggered.


## Optimization

If you meet some performance issues, please first:

* Check that you are using the latest main script ( `/dist/jeelizNNCwidget.js` ),
* Check that your browser is updated (Chrome is advised), check that your graphic drivers are updated,
* Enter `chrome://gpu` in the URL bar and check there are no major performance caveats, that hardware acceleration is enabled, that your GPU is correctly detected,

The performance is adaptative. We do as many detection loops per rendering till we reach a maximum value (`7`). If we cannot reach this value, the GPU will be running at 100%. The closer we are to this maximum value, the less latency we will observe.

So it is normal that the GPU is running at 100%. But it may be annoying for other parts of the application because DOM can be slow to update and CSS animations can be laggy.

The first solution ( implemented in [Jeeliz sunglasses web-app](https://jeeliz.com/sunglasses) ) is to slow down the glasses rendering once the user has clicked on a button using:
 ```
JEELIZVTO.relieve_DOM(<durationInMs>)
```
For example,`JEELIZVTO.relieve_DOM(300)` will free the GPU during 300 milliseconds.

If you need to slow down the rendering to free the GPU during an undertermined period of time, you can use:
```
JEELIZVTO.switch_slow(<boolean> isSlow, <int> intervalMs)
```
Where `intervalMs` is the interval in milliseconds between 2 rendering loops.


## Hosting

This widget access the user's camera video stream through `MediaStream API`. So your application should be hosted by a HTTPS server (even with a self-signed certificate). It won't work at all with unsecure HTTP, even locally with some web browsers.


## License

[Apache 2.0 Software license](/LICENSE)
