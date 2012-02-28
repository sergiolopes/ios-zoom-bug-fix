A fix to the famous iOS zoom bug on orientation change to portrait
==================================================================

**By Sergio Lopes, from Brazil. Public domain.**

Quickstart
----------

**See the [full demo](http://sergiolopes.github.com/ios-zoom-bug-fix/demos/index.html) on your iOS device**.

If you never saw the iOS zoom bug, see [this demo](http://sergiolopes.github.com/ios-zoom-bug-fix/demos/bug.html) on an iOS device in portrait mode and rotate the device to landscape. You'll see an annoying zoom that only occurs in iOS.

The trick
---------

By setting the viewport to `width=device-width`, without `initial-scale`, we prevent the bug from happening. But the viewport is always stuck to `device-width` size, even in landscape. That means 320px in iPhone and 768px in iPad no matter if portrait or landscape.

The trick is to change the viewport to `width=device-height` so that we have full screen realstate. But in portrait that will mean a 480px width on iPhone and 1024px on iPad, effectivily zooming out our page.

So we apply apply a CSS3 scale transform to scale up the content in portrait mode.

The final effect is a **perfectly zoomable** page without the famous bug and **working both in portrait and landscape** with the right size.

Applying the trick
------------------

The only requirement is that you use a *container* div wrapping all your page (if you are using [Mobile Boilerplate](http://html5boilerplate.com/mobile) you already have this):

    <html>
    ...

    <body>
        <div id="container">
            <!-- Your page here -->
        </div>
    </body>
    </html>

Then, just include the script at the bottom of the page. Use the [minified version](http://sergiolopes.github.com/ios-zoom-bug-fix/demos/ios-zoom-bug-fix.min.js).

Also, you shouldn't style your `html`, `body` and `#container` elements with properties that can mess with size manipulation (`width`, `max-width`, `margin` etc). Always assume your `#container` will take the entire screen and build your page inside it.

One notice about media queries
------------------------------

A minor drawback is that the device is stuck in `width=device-height` size no matter if you're in portrait or landscape. This can cause you problems when dealing with media queries.

For example, people usually do this to target iPhone in landscape:

    @media screen and (min-width: 480px)

If you do, this will stop working on iOS when you use this script. You'll need a more hackish media querie to target a landscaped iPhone without wrongly affecting its portrait behavior:

    @media screen and (device-height: 480px) and (device-width: 320px) and (width: 480px) and (max-height: 320px)

For a real use of this media queries, including a **bullet proof version targeting non-iOS devices** as well, see the [demos CSS](https://github.com/sergiolopes/ios-zoom-bug-fix/blob/gh-pages/demos/style.css).

Other tricks
------------

If you don't want to give your wrapper div a `container` id, you can configure another id name via `<body data-container="myid">`.

For performance reasons, it's recommended that the script is called at the bottom of the page. But your users will see a small screen flick effect when visiting the page on portrait mode. If you want to avoid this, you can put the script right after the opening `container` div.

Real world demos
----------------

I applied the hack to two famous responsive mobile sites to see how it would act in the real world.

**Colly.com**

* [Original Version](http://colly.com/). Has user zooming enabled but suffers the iOS zoom bug.
* [Fixed version](http://sergiolopes.github.com/ios-zoom-bug-fix/demos/real-world/colly/index.html). Keeps zoom and fixes the bug for iOS.

**BostonGlobe.com**

* [Original Version](http://www.bostonglobe.com). Disables user zooming with `minimum-scale=1, maximum-scale=1`.
* [Fixed version](http://sergiolopes.github.com/ios-zoom-bug-fix/demos/real-world/bostonglobe/index.html). Reenables user zooming and works flawless everywhere, including iOS. 

(TODO: still needs to adjust the media queries not to target portrait iOS as landscape)

Other solutions
---------------

Many smart people have thought about this bug, resulting in several different solutions. Here are some known solutions, and my comments:

* **Disable user zoom.** Not really a solution, but if you add `minimum-scale=1, maximum-scale=1` to your `viewport` the bug disappears. The obvious drawback is to penalize the user, not allowing zooming.

* **Viewport on portrait forever.** If you set your `viewport` to `width=device-width` *without* `initial-scale=1`, the bug disappears. But your viewport will be device-width even in landscape mode (that means 320px in iPhone both in portrait and landscape). The drawback is that you can't explore the device full screen size in landscape.

* **[@shichuan solution][1]**. It disables user zooming by setting `minimum-scale=1, maximum-scale=1` and adds a listener to detect gestures. The idea is to detect if the user wants to zoom and then reactivate zooming. This solution only fixes the bug if the user doesn't try to zoom. If it does, the bug will still occur. Also, the user can only effectively start zooming after starting a second gesture. It's the most used hack. Mobile Boilerplate recommends this one.

[1]: https://gist.github.com/901295

* **[@scottjehl solution][2]**. This clever hack tries to antecipate the orientation change watching the device motion. When it thinks it's an orientation change, it temporarily disables user zooming so that the bug doesn't happen. Then zoom is restored when the orientation change happens. It's a smart hack, but very weak in detecting the orientation change. In my tests, it only works if you rotate your device slowly.

[2]: https://github.com/scottjehl/iOS-Orientationchange-Fix

I think that all solutions have serious drawbacks. That's why this project has born.

Testing and contributions
-------------------------

The script seems pretty solid. I tested it on an 2nd generation iPod Touch running iOS 4.2.1, a iPad 2 running iOS 4.3.3 and on iOS emulators versions 4.3 and 5.0 both for iPhone and iPad.

But you find any bugs and want to contribute, file a issue, fork the project, send a pull request etc.

License & Credits
-----------------

Created by Sérgio Lopes. 

Released in public domain, do whatever you want with the code.
