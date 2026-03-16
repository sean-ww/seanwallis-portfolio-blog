---
title: "Why Couscous Is Good For Documentation"
date: 2017-11-18T10:11:47Z
cover: "/media/posts/why-couscous-is-good/couscous-bowl-cover.jpg"
summary: "Writing documentation can seem like a chore, or even an afterthought. Yet we know that it’s important so that others can use or maintain our code in future. That’s where Couscous comes in. Couscous is a static website generator for your documentation. It takes your markdown files and then converts them to HTML, allowing you to quickly serve up your documentation in a readable format. You can even deploy directly to GitHub pages."
tweet: "Writing documentation can seem like a chore. Find out why Couscous makes documentation easy"
---

Writing documentation can seem like a chore, or even an afterthought. Yet we know that it's important so that others can use or maintain our code in future.

![This is couscous](/media/posts/why-couscous-is-good/this-is-couscous.png)

That's where [Couscous](http://couscous.io/) comes in. Couscous is a static website generator for your documentation. It takes your markdown files and then converts them to HTML, allowing you to quickly serve up your documentation in a readable format. You can even deploy directly to GitHub pages.

For me the great advantage is that I can write docs in the familiar markdown format, alongside my code, under source control. I am then able to run a single command ```couscous deploy``` and my documents are online.
Or if I choose not to use GitHub pages, I can first build the website using ```couscous generate``` and then deploy the code myself.

## Getting Started

We can install couscous globally using composer to use it easily on any project:
```
composer global require couscous/couscous
```

Then, assuming you have markdown files within you project, you can run ```couscous preview``` from your project directory to immediately see your documentation website. You can then view the result at ```http://localhost:8000```.

![Step 1](/media/posts/why-couscous-is-good/couscous-step-1.png)

## Configuration

Great, we have some documentation, but in order for it to be more useful we have to configure it a little.

Let's say you then want to customise the appearance of the site. We could do so using a template and a ```couscous.yml``` file:
```
template:
    url: https://github.com/sean-ww/Template-ReadTheDocs.git
```
We can set the template to a named directory or an external url (as shown above). Couscous already have a selection of [templates](http://couscous.io/templates.html) that you can choose from, if you don't want to spend time making your own.

Next I like to keep my documentation in a folder named docs, so let's specify that. By adding a specific directory, couscous will only parse the files in the specified location:
```
template:
    url: https://github.com/sean-ww/Template-ReadTheDocs.git
include:
    - docs
```

Next up we'll add a couple more variables. All variables we add in our yaml file will also be available in our template. In which case, both the title and baseUrl variables will be useful:
```
template:
    url: https://github.com/sean-ww/Template-ReadTheDocs.git
include:
    - docs
title: React Redux Datatable
baseUrl: https://sean-ww.github.io/react-redux-datatable
```

Then lastly, I want to add a navigation menu to move between the different documentation pages I create:
```
template:
    url: https://github.com/sean-ww/Template-ReadTheDocs.git
include:
    - docs
title: React Redux Datatable
baseUrl: https://sean-ww.github.io/react-redux-datatable

# The left menu bar
menu:
    sections:
        getStarted:
            text: Get Started
            items:
                getStarted:
                    text: Get Started
                    relativeUrl: get-started/get-started.html
        requestingData:
            text: Requesting Data
            items:
                overview:
                    text: Overview
                    relativeUrl: requesting-data/overview.html
                tableSettings:
                    text: Table Settings
                    relativeUrl: requesting-data/table-settings.html
                tableColumns:
                    text: Table Columns
                    relativeUrl: requesting-data/table-columns.html
        exportingData:
            text: Exporting Data
            items:
                overview:
                    text: Overview
                    relativeUrl: exporting-data/overview.html

```
Please note that different templates will require different variables, so do check the documentation that relates to each template.

Here's what my documentation looks like now with the above configuration:
![Last step](/media/posts/why-couscous-is-good/couscous-last-step.png)

And you'll find the real thing deployed [here](https://sean-ww.github.io/react-redux-datatable/).
