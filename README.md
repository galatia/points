# POINTS

Points is a simple app that allows E and D to keep track of their points.

![Screenshot of app](http://i.imgur.com/phX1DBV.png)

## That's great, but how can I use it?

To deploy it for keeping track of your own points, you'll need [Meteor](https://www.meteor.com/). If you don't already have it, it's super easy to install:

``` bash
curl https://install.meteor.com/ | sh
```

Then just clone this repo and deploy the app to an unused URL (specify the subdomain you want in place of 'something'):

```bash
git clone https://github.com/galatia/bearded-octo-boo.git points
cd points
meteor deploy something.meteor.com
```

## Uh, what if I want to track fewer or more than 2 people's scores?

I didn't make this super simple, but you only have to edit two files. First, open up ```meteor/points_app.html```. Lines 8 and 9 each create a points display for a single person:

```html
{{> points person='e'}}
{{> points person='d'}}
```

Just copy and paste the format for each person whose points you want to track. The 'person' names must be unique. I haven't tested this with many people though, so it might end up looking funny.

The last thing you need to do is to edit ```meteor/points_app.js```. Lines 27 and 28 do a similar sort of thing, setting up the database entry for each person:

```javascript
createPerson('e')
createPerson('d')
```

The names you pass in to this function need to match the names you set up in the html.

Now just make sure you redeploy:

```bash
meteor deploy something.meteor.com
```

## License
Code released under the [MIT License](https://github.com/galatia/bearded-octo-boo/blob/master/LICENSE.md), with partial copyright attributable to Twitter for the [Glyphicon font](http://glyphicons.com/) distributed with the [Bootstrap](http://getbootstrap.com/) project.
