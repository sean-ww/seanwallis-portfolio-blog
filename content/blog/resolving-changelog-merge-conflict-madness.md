---
title: "Resolving Changelog Merge Conflict Madness"
date: 2018-11-05T18:43:06Z
tweet: "Resolving Changelog Merge Conflict Madness"
---

We start with an innocent looking changelog.
```
---
title: Changelog
status: ready # draft, ready
---

All notable changes to this project will be documented in this file.<br>
The format is based on [Keep a Changelog](http://keepachangelog.com)

## [2.0.0] - Unreleased
### Added
- _Component [footer]({{ componentPath '@footer' }})_:
  Added copyright to the footer

### Changed
- _Component [accordion]({{ componentPath '@accordion' }})_:
  Replaced title divs with header elements
- _Component [textarea]({{ componentPath '@textarea' }})_:
  Label font made bold

### Removed
- _Component [sidenav]({{ componentPath '@sidenav' }})_:
  removed class `my-class-1` from `ul` element

## [1.0.0] - 2018-04
### Added
- _Component [carousel]({{ componentPath '@carousel' }})_:
  A header to the carousel component

```

Harmless right? OK, so the above is a simplified version of the real thing, but we get the structure.
It's based upon the [Keep a Changelog](http://keepachangelog.com) format; so for each release we have `Added`, `Changed` and `Removed` headings where applicable.
It's also more than just a changelog. It gets built into a webpage using [Fractal](https://fractal.build/), which in turn resolves the component path links we see above on build.

### So what's the problem?

For every story in the release, we must add something to the changelog.
In fact we need a separate entry for every change, removal or addition to any component.
Which can lead to multiple changelog entries per story.
Then imagine we have many stories in progress at the same time.
As soon as one story gets merged into our development branch, all other stories have merge conflicts to resolve.
Then we must resolve conflicts continually as we work to get anything through. Madness!

### How do we solve this

Fortunately this isn't a new problem. GitLab experienced a very similar [changelog conflict crisis](https://about.gitlab.com/2018/07/03/solving-gitlabs-changelog-conflict-crisis/), which gave us the basis for our solution.
Quite simply, we stop making all of our changes in one file, and instead place our changes within unique files in a `changelogs/unreleased` folder.
For the unreleased change files we use a simple yaml file corresponding to the story you are working on.

So let's say story-5 is to add something to the carousel, whilst removing something from the footer component.

```
# changelogs/unreleased/story-5.yaml
changes:
  - type: added # changed, removed, added
    component: carousel
    description: Added something to the carousel.
  - type: removed
    component: footer
    description: Removed the footer component.
```

In the above file we only need to add the type, component and description for each change.
The rest is taken care of by a script on our pipeline that runs when we create our release.

Problem solved.
