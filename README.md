# jeelizGlassesVTOWidget

With this widget, you can include a glasses virtual try-on widget on your website.

You can test it with these demos :
* [Simple integration demo](https://jeeliz.com/demos/jeelizGlassesVTOWidget/integrationDemo2)
* [Jeeliz sunglasses application (not included in this repo)](https://jeeliz.com/sunglasses)
* [Video screenshot of the Jeeliz sunglasses application](https://www.youtube.com/watch?v=62E5HOUOD0A&t=25)


## Documentation
You will find the technical documentation into `doc.pdf`.

## Integration demo
There is a simple integration demo in `demo.html`. You should have a working HTTPS server to open it (even locally, it won't work if you have an unsecure HTTP server or if you just open the HTML file in your browser).

## Hosting
### HTTPS only !
Because this widget requires the user's webcam stream through `MediaStream API`, your application should be served through HTTPS (even with a self-signed certificate). It won't work at all with unsecure HTTP, even locally.


### The scripts
You can use our hosted and up to date version of the library, available here :
```
https://appstatic.jeeliz.com/jeewidget/JeelizNNCwidget.js
```
which fetches the neuron network which is hosted here :
```
https://appstatic.jeeliz.com/jeefit/built/jeefitNNC.json
```
They are served through a content delivery network (CDN) using gzip compression. The script file is the same than `release/JeelizNNCwidget.js`.



### The glasses models and materials
Glasses models and materials are stored on the *Jeeliz GlassesDB*. Each model is designed by a unique SKU. You can check the different models available by opening `glassesSKU.csv` file. If you want us to add specific glasses models, please contact us at `contact__at__jeeliz.com`.



## License
[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html). This application is free for both commercial and non-commercial use.

We appreciate attribution by including the Jeeliz logo and link to the [Jeeliz website](https://jeeliz.com) in your application.