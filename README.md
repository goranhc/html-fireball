![A test image](http://www.elathemes.com/assets/images/fireball.png) 

## HTML Fireball
This template generator have predefined tasks to render and manipulate mass files to compile and deploy HTML templates. It uses Panini - flat file generator which compiles a series of HTML pages using a common layout. Also it compiles a documentation library for your projects, which helps you create your offline and online documentation for your next projects. It can be used exclusively by independent developers and designers.

## Quick start
Project structure is in <code>source</code> folder.

<pre>
  npm i
</pre>

## Project structure

<pre>
    project/
    └─── source/
    |   |──── app/
    |   |     |──── data/
    |   |     |──── helpers/
    |   |     |──── layout/
    |   |     |──── pages/
    |   |     |──── partials/
    |   └──── assets/
    |         |──── css/
    |         |──── images/
    |         |──── js/
    |         |──── scss/
    |         |──── svg/
    |─── config.json
    |─── gulpfile.js
    └─── package.json
</pre>

## Gulp tasks
Compiling styles, copy files and render HTML

#### Build project

<pre>
    gulp build
</pre>

#### Render HTML

<pre>
    gulp html
</pre>

#### Compile styles

<pre>
    gulp sass
</pre>

---------------

## Demo example

### Default layout
###### /app/layout/default.hbs

```handlebars
<!DOCTYPE html>
<html>

<head>
    <title>{{page-title}}</title>
</head>

<body>

    {{> _layout-navbar }}
    
    {{> body }}
    
    {{> _layout-footer }}
    
</body>

</html>
```

### Landingpage 
###### /app/pages/index.hbs
```html
---
page-title: First page
page-subtitle: First page subtitle
---
<section>
    <p>Hello world!</p>
</section>
```

### Partials views

###### /partials/layout/_layout-navbar.hbs
```html
<nav>
    <h2>Navigation</h2>
</nav>
```
###### /partials/layout/_layout-footer.hbs
```html
<footer>
    <h2>Footer</h2>
</footer>
```

### HTML Output
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>First page</title>
</head>
<body>
    <nav>
        <h2>Navigation</h2>
    </nav>
    <section>
        <p>Hello world!</p>
    </section>

    <footer>
        <h2>Footer</h2>
    </footer>
</body>
</html>
```

