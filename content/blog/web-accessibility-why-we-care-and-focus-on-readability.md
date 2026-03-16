---
title: "Web Accessibility: Why we care and focus on readability"
date: 2019-03-20T18:43:06Z
cover: "/media/posts/web-accessibility-why-we-care-and-focus-on-readability/readability-cover.jpg"
tweet: "Web Accessibility: Why we care and focus on readability"
---

Whether you want to boost your search engine performance and reach the widest possible audience, or just stay ahead of the game when it comes to legal compliance, then accessibility should be important to you. Thankfully, there are already guidelines for this.

The Web Content Accessibility Guidelines (WCAG) are accessibility recommendations developed by The Web Accessibility Initiative (WAI), which is part of The World Wide Web Consortium (W3C). When they’re not too busy creating more acronyms, WCAG aim to provide a single shared standard, ensuring that users with different disabilities are able to access and interact with content as much as possible without restrictions.

The latest guidelines are [WCAG 2.1](https://www.w3.org/TR/WCAG21/).

## Why should we care about accessibility?

* To increase reach and engagement with your content. The more people that can access your content the better.
* Boost search engine optimisation (SEO) results by making it easier for Google to better index your site and provide higher search positions. Improving the structure of your site and the content according to the W3C guidelines will really help with this.
* Meet any legal requirements. Web accessibility may be legally enforceable in future. In some countries it already is (such as Norway and Japan) and with consequences if you do not comply. In The Netherlands all government directed websites need to comply by 2020. Whilst legal requirements for business websites could be introduced in future.

## Focus on Readability

Since the guidelines are so extensive, let’s focus on just one area for now; readability. That means making the content understandable to the user that is reading it, or listening via a screen reader. Let’s dive into a few things you can consider.

### Using language attributes on the html element

Each time you write a html document you may make use of a lang or xml:lang attribute on the html element.

```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "https://www.w3.org/TR/html4/strict.dtd">
<html lang="fr"> 
<head>
  <title>Document français</title>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
</head>  
<body>     
	Document écrit en français.
</body>
</html>
```

Setting this very simple attribute allows assistive technology to identify the default language for the page. Such technology could be helping a user to translate the page, aiding user agents providing dictionary definitions or even assisting pronunciations to a blind or braille provided to a deaf-blind user. There are many uses, both now and in the future.

[See the full guidelines on this technique for more information.](https://www.w3.org/WAI/WCAG21/Techniques/html/H57)

The use of the lang or xml:lang attribute on the html element is required for Level A support according to the guidelines. These levels are split out to Level A, AA and AAA. With AAA giving the highest level of support. At level AA you should go a step further by identifying parts within your text where alternative languages are used and identifying them using a lang attribute on the relevant element. Doing so would for example aid a screen reader in pronouncing the parts of the text correctly. For instance, if we take an English sentence with a French expression: <em>“He had a feeling of <span lang="fr">‘déjà vu’</span>.”</em>, the French part <em>(<span lang="fr">déjà vu</span>)</em> can be placed within an element with the lang attribute.

```
<p lang="en">
  He felt like he'd been there before. He had a feeling of <span lang="fr">‘déjà vu’</span>. Perhaps it was a familiar smell, or something.
</p>
```

For AA, you may also consider the use of the hreflang attribute on link elements. This can indicate to a user when they are following a link to content in a different language, allowing them to decide if they wish to follow the link or not.

### Unusual words, terms, abbreviations and acronyms

Let’s look more closely at the text content within a page. User’s may often come across words or terms that are unfamiliar to them. A popular approach to handle this is to provide a link to definitions as shown within the WCAG guidelines.

![Screenshot of the Level AAA Success Criterion stating that a mechanism must be available for identifying specific definitions of words or phrases used in an unusual or restricted way, including idioms and jargon. The screenshot includes links to the definitions of unusual words.](/media/posts/web-accessibility-why-we-care-and-focus-on-readability/criterion.png)

The corresponding definitions can then be found by the user to explain the term.

![Screenshot of the definition that corresponds to idiom within the success criterion. It explains the meaning of the word, along with a note and some examples.](/media/posts/web-accessibility-why-we-care-and-focus-on-readability/word-and-phrase-explaination.png)

We see the WCAG example for the term idiom. This could be implemented in a variety of ways. However it’s worth noting that this success criteria is for Level AAA. It may not be necessary for you to go as far as this level of support, but it’s good to understand what is required at each level.

### Reading level

For AAA the aim is to provide text that can be understood by people with lower secondary education reading level. This translates to 9 years after starting primary (compulsory) education (about 7-9 years of schooling).

Examples of things that can improve readability:

* Providing summaries of the most important content
* Use the clearest and simplest language appropriate for the content
* Use shorter sentences and more common words
* Break up content with well organised sections and headings (heading levels &lt;h1&gt; to &lt;h6&gt; should be used correctly in hierarchical order, and not based on appearance. Start with &lt;h1&gt;, then &lt;h2&gt; etc. Do not skip levels).
* Provide supplementary illustrations, pictures and symbols to explain where beneficial
* Avoid or minimise professional jargon, slang and idioms
* Listed content (bulleted or numbered) can help simplify text
* Consistent use of tenses

One way of measuring reading level is via the Common European Framework of Reference for Languages: Learning, Teaching, Assessment (CEFR). It evaluates languages on six levels: A1, A2, B1, B2, C1, C2. Where A1 indicates very basic reading skills, and C2 indicates fluency or mastery of the language. The average reading level of the Dutch population is B1, and research has shown that 27.1% of the population cannot read above (International Adult Literacy Survey) IALS level 2, which is more or less equivalent to CEFR level B1 [1](#references). We can then equate level B1 with the reading level we need to satisfy AAA. A text that reads at level B1 or lower (A1, A2) should therefore give assurance that the text can be understood well by the majority of its audience, whereas B2 or higher could cause issue. There are online tools available for testing the CEFR level of text, such as:

* [Leesniveau Tool](https://www.accessibility.nl/kennisbank/tools/leesniveau-tool)
* [Text Analyzer](http://www.roadtogrammar.com/textanalysis/)

In addition to the tool to assess the language level, you could also then make use of something like the [Hemingway Editor](http://www.hemingwayapp.com/) which gives feedback and suggestions upon your entered text in order to help you improve the readability score. Let’s give it a go with an example from the editor.

The following text is considered B2/C1 with Leesniveau Tool and C1 with Text Analyzer:

<blockquote>
    <p><span style="background-color: #F7ECB5">The app highlights lengthy, complex sentences and common errors; if you see a yellow sentence, shorten or split it. </span><span style="background-color: #E4B9B9">If you see a red highlight, your sentence is so dense and complicated that your readers will get lost trying to follow its meandering, splitting logic — try editing this sentence to remove the red.</span></p>
    <p>You can <span style="background-color: #CBB9EF">utilize</span> a shorter word in place of a purple one. Mouse over them for hints.</p>
    <p>Adverbs and weakening phrases are <span style="background-color: #d68de0;"><span style="background-color: #c4e3f3;">utilize</span></span> shown in blue. Get rid of them and pick words with force, <span style="background-color: #c4e3f3;">perhaps</span>.</p>
</blockquote>

Then we simplify the text, remove the errors and make it significantly shorter. It then gets a good Hemingway grade, but is still only B2 via the Leesniveau Tool. Whilst it does achieve B1 according to Text Analyser:

<blockquote><p>The app shows difficult sentences and common errors. If you see a yellow sentence you can make it shorter. If you see red then your sentence is too long or difficult. Readers will get lost trying to follow it.<br></p><p>You can use a shorter word in place of a purple one. Put your mouse over them for hints.<br></p><p>Adverbs and weak phrases are in blue. Get rid of them and pick words with force.</p></blockquote>

This shows just how difficult it can be to truly achieve AAA, and should be a reminder that WCAG is a guideline only. In all cases it is of course important to consider your target audience when utilising such tools. A government website presenting information to everyone is different from a tech blog that is written for a specific audience, using technical terminology.

## Further reading

On top of the tools suggested for readability, there are many other tools and sources of information you may find useful:

* [Section 508 – US Accessibility Guidance](https://www.section508.gov/)
* [a11y Project Resources](https://a11yproject.com/resources)
* [aXe browser extension](https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd)
* [Site Improve](https://siteimprove.com/en-us/)
* [WAVE (Web Accessibility Evaluation Tool) Extensions](https://wave.webaim.org/extension/)
* [eslint jsx a11y plugin](https://github.com/evcohen/eslint-plugin-jsx-a11y)
* [React-axe for testing your React applications](https://github.com/dequelabs/react-axe)
* [Accessible modals for React](http://davidtheclark.github.io/react-aria-modal/demo/)

### WAI

WAI have also developed several other W3C recommendations, such as:

* [Authoring Tool Accessibility Guidelines (ATAG)](https://www.w3.org/WAI/standards-guidelines/atag/)
* [User Agent Accessibility Guidelines (UAAG)](https://www.w3.org/WAI/standards-guidelines/uaag/)
* [Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/standards-guidelines/aria/)

### References

1. Bohnenn, E., Ceulemans, C., Guchte, C, van de., Kurvers, J., Tendeloo, T, van. (2004). Laaggeletterd in de Lage Landen, Hoge prioriteit voor beleid. Den Haag: Nederlandse Taalunie.

This post was also published on [enrise.com](https://enrise.com/2019/03/web-accessibility-why-we-care-and-focus-on-readability/)
