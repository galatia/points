# POINTS

Points is a simple app that allows E and D to keep track of their points, secured with Google OAuth (so don't bother trying to mess with our scores!). There is also an even simpler Chrome extension that allows this app to be the Chrome newtab page.

* [That's great, but how can I use it?](#thats-great-but-how-can-i-use-it)
* [Uh, what if I want to track fewer or more than 2 people's scores?](#uh-what-if-i-want-to-track-fewer-or-more-than-2-peoples-scores)
* [Wait, didn't you say it's secure?](#wait-didnt-you-say-its-secure)
* [How do I use the extension?](#how-do-i-use-the-extension)
* [What are the points for?](#what-are-the-points-for)
* [License](#license)

![Screenshot of app](http://i.imgur.com/phX1DBV.png)


## That's great, but how can I use it?

To deploy it for keeping track of your own points, you'll need [Meteor](https://www.meteor.com/). If you don't already have it, it's super easy to install:

``` bash
curl https://install.meteor.com/ | sh
```

Then just clone this repo and deploy the app to an unused URL (specify the subdomain you want in place of 'something'):

```bash
git clone https://github.com/galatia/points.git
cd points/meteor
meteor deploy something.meteor.com
```

## Uh, what if I want to track fewer or more than 2 people's scores?

I didn't make this super simple, but you only have to edit two files. First, open up ```meteor/points_app.html```. Lines 9–10 each create a points display for a single person:

```html
{{> points person='e'}}
{{> points person='d'}}
```

Just copy and paste the format for each person whose points you want to track. The 'person' names must be unique. I haven't tested this with many people though, so it might end up looking funny.

The other thing you need to do is to edit ```meteor/points_app.js```. Lines 64–65 do a similar sort of thing, setting up the database entry for each person:

```javascript
createPerson('e')
createPerson('d')
```

The names you pass in to this function need to match the names you set up in the html.

Now just make sure you redeploy:

```bash
meteor deploy something.meteor.com
```

## Wait, didn't you say it's secure?

If the settings don't specify that the app should be secure, it isn't! To authorize only a set of emails to use the app, you'll need to create the following ```meteor/settings.json``` file:

```json
{
  "public": {
    "isSecure": true
  },
  "authorizedEmails": ["e@example.com", "d@example.com"]
}
```

You'll probably want to list the emails of the people whose points you're tracking in the ```"authorizedEmails"``` field. It's okay to not list any emails, but then anyone could 'log in' and that seems a bit silly (you might as well not make it ```"isSecure"```).

Finally, you'll need to modify your deploy command:

```bash
meteor deploy --settings settings.json something.meteor.com
```

## How do I use the extension?

You'll need to make one small edit on line 12 of ```ext/newtab.html``` so that it uses your Meteor URL (something.meteor.com):

```html
<iframe style='height: 100%; width: 100%' seamless='seamless' frameBorder='0' src='http://something.meteor.com'></iframe>
```

Now you just need to load the extension into Chrome. Go to [```chrome://extensions/```](chrome://extensions) and then turn on 'Developer mode' in the top right. Click the `Load unpacked extension...` button on the left and open the ```points/ext``` directory. That's it!

If you make changes to the extension, you'll need to refresh [```chrome://extensions/```](chrome://extensions), and making changes to the Meteor app just requires a redeploy as usual.


## What are the points for?

Racquetball.


## License

Code released under the [MIT License](https://github.com/galatia/bearded-octo-boo/blob/master/LICENSE.md), with partial copyright attributable to Twitter for the [Glyphicon font](http://glyphicons.com/) distributed with the [Bootstrap](http://getbootstrap.com/) project.
