# LandSoft 
LandSoft - Saas Software Template 

### Developed with Template Generator
Flat file generator for Bootstrap framework and templating system. Prototype is based on Panini to get a delicious flattened site out the other end. It's defined with default libraries such as Animate.css, FontsAwsome, LinearIcons, OwlCarousel.

### Quick start
Project structure in in <code>source</code> folder.

<pre>
    npm i
</pre>

### Project structure

<pre>
    panini/
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

### Gulp tasks
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

